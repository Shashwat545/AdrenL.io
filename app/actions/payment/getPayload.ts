import crypto from "crypto";
import { User } from "@prisma/client";

interface IgetPayload {
    currentUser: User | null;
}

export default function getPayload ({ currentUser }: IgetPayload) {
    try {
        const MERCHANT_ID = process.env.PG_MERCHANT_ID;
        const SALT_KEY = process.env.PG_SALT_KEY;

        const data = {
            merchantId: MERCHANT_ID,
            merchantTransactionId: "MTID123",
            merchantUserId: currentUser?.id || "NOT_LOGGED_IN",
            amount: 10000,
            redirectUrl: `http://localhost:3000/trips`,
            redirectMode: 'REDIRECT',
            callbackUrl: `http://localhost:3000/api/paymentstatus/MUID123`,
            mobileNumber: "1234567899",
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;
    
        return {
            data, payloadMain, checksum
        };
    } catch (error: any) {
        throw new Error(error);
    }
};