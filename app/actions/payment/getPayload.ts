import crypto from "crypto";
import { User } from "@prisma/client";

interface IgetPayload {
    currentUser: User;
    priceTotal: number;
}

export default function getPayload ({ currentUser, priceTotal }: IgetPayload) {
    try {
        const MERCHANT_ID = process.env.PG_MERCHANT_ID;
        const SALT_KEY = process.env.PG_SALT_KEY;

        const data = {
            merchantId: MERCHANT_ID,
            merchantTransactionId: ((currentUser.id).slice(5,15).concat(crypto.randomBytes(4).toString('hex'))),
            merchantUserId: currentUser.id,
            amount: 1000, //priceTotal*100
            redirectUrl: `http://localhost:3000/trips`,
            redirectMode: 'REDIRECT',
            callbackUrl: `http://localhost:3000/api/payment/callback`,
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