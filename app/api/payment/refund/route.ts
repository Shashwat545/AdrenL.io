import { NextResponse } from "next/server";
import prisma from  "@/app/libs/prismadb";
import axios from "axios";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getRefundPayload from "@/app/actions/payment/getRefundPayload";

export async function POST (request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) {
            throw new Error('User not logged in');
        }

        const body = await request.json();
        const { merchantUserId ,merchantTransactionId, amount } = body;

        const { payload, xVerify, base64Payload } = getRefundPayload({merchantUserId, originalMerchantTransactionId: merchantTransactionId, amount});

        const response = await axios.post("https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/refund", { request: base64Payload }, {
            headers: {
              'Content-Type': 'application/json',
              'X-VERIFY': xVerify,
            },
        });

        const refundTransaction = await prisma.transaction.update({
            where: {
                merchantTransactionId: merchantTransactionId
            },
            data: {
                refundInitiated: true,
                refund: {
                    create: {
                        userId: merchantUserId,
                        merchantTransactionId:  payload.merchantTransactionId,
                        totalPrice: amount,
                        status: response.data.code,
                        callback_triggered: false
                    }
                }
            }
        });
        
        return NextResponse.json(refundTransaction);
    }
    catch (error) {
        console.error('Error in PhonePe Check Status route: ', error);
        return NextResponse.error();
    }
}