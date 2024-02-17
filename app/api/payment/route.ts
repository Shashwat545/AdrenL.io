import { NextResponse } from "next/server";
import axios from "axios";
import prisma from  "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getPayload from "@/app/actions/payment/getPayload";

export async function POST (request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) {
            throw new Error('User not logged in');
        }

        const body = await request.json();
        const { reservationId, priceTotal } = body;

        if(!priceTotal) {
            throw new Error('Invalid total price');
        }

        const { data, payloadMain, checksum } = getPayload({ currentUser, priceTotal });

        const responseToSendBack:any = {};

        const options = {
            method: 'POST',
            url: 'https://api.phonepe.com/apis/hermes/pg/v1/pay',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        const paymentResponse = await axios.request(options);
        if (paymentResponse.data.code !== 'PAYMENT_INITIATED') {
            throw new Error('Payment initiation failed. Please try again later');
        } else {
            responseToSendBack.redirectUrl = paymentResponse.data.data.instrumentResponse.redirectInfo.url;
        }

        const reservationAndTransaction = await prisma.reservation.update({
            where: {
                id: reservationId
            },
            data: {
                transaction: {
                    create: {
                        userId: currentUser.id,
                        merchantTransactionId: data.merchantTransactionId,
                        totalPrice: priceTotal,
                        status: "",
                        callback_triggered: false,
                        paymentInstrument: ""
                    }
                }
            }
        });

        const newTransaction = await prisma.transaction.findMany({
            where: {
                merchantTransactionId: data.merchantTransactionId
            }
        });

        responseToSendBack.transactionId = newTransaction[newTransaction.length-1].id;

        return NextResponse.json(responseToSendBack);
    }
    catch (error) {
        console.error('Error in payment API route: ', error);
        return NextResponse.error();
    }
}