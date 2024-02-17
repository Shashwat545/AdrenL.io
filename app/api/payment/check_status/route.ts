import { NextResponse } from "next/server";
import prisma from  "@/app/libs/prismadb";
import axios from "axios";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getCheckStatusPayload from "@/app/actions/payment/getCheckStatusPayload";

export async function POST (request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) {
            throw new Error('User not logged in');
        }

        const body = await request.json();
        const { merchantTransactionId } = body;

        const { xVerify, MERCHANT_ID, basePath } = getCheckStatusPayload(merchantTransactionId);

        const response = await axios.get(`https://api-preprod.phonepe.com/apis/pg-sandbox${basePath}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': xVerify,
                'X-MERCHANT-ID': MERCHANT_ID,
            },
        });

        const transaction = await prisma.transaction.update({
            where: {
                merchantTransactionId: merchantTransactionId
            },
            data: {
                status: response.data.code,
                paymentInstrument: JSON.stringify(response.data.data.paymentInstrument)
            }
        });
        
        return NextResponse.json(transaction);
    }
    catch (error) {
        console.error('Error in PhonePe Check Status route: ', error);
        return NextResponse.error();
    }
}