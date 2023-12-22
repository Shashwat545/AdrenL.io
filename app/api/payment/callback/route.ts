import { NextResponse } from "next/server";
import prisma from  "@/app/libs/prismadb";

export async function POST (request: Request) {
    try {
        const body = await request.json();
        const { response } = body;
        const decodedPayload = Buffer.from(response, 'base64').toString('utf-8');
        const parsedPayload = JSON.parse(decodedPayload);
        if(parsedPayload.success) {
            if(parsedPayload.code == "PAYMENT_SUCCESS") {
                const transaction = await prisma.transaction.update({
                    where: {
                        merchantTransactionId: parsedPayload.data.merchantTransactionId
                    },
                    data: {
                        callback_triggered: true,
                        status: "Payment Successful",
                        paymentInstrument: JSON.stringify(parsedPayload.data.paymentInstrument)
                    }
                });
            } else {
                const transaction = await prisma.transaction.update({
                    where: {
                        merchantTransactionId: parsedPayload.data.merchantTransactionId
                    },
                    data: {
                        callback_triggered: true,
                        status: parsedPayload.code,
                        paymentInstrument: JSON.stringify(parsedPayload.data.paymentInstrument)
                    }
                });
            }
        } else {
            const transaction = await prisma.transaction.update({
                where: {
                    merchantTransactionId: parsedPayload.data.merchantTransactionId
                },
                data: {
                    callback_triggered: true,
                    status: parsedPayload.code,
                    paymentInstrument: JSON.stringify(parsedPayload.data.paymentInstrument)
                }
            });
        }
        
        return NextResponse.json("Ok");
    }
    catch (error) {
        console.error('Error in PhonePe callback route: ', error);
        return NextResponse.error();
    }
}