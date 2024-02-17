import crypto from "crypto";

interface IgetRefundPayload {
    merchantUserId: string;
    originalMerchantTransactionId: string;
    amount: number;
}

export default function getRefundPayload ({ merchantUserId, originalMerchantTransactionId, amount }: IgetRefundPayload) {
    try {
        const MERCHANT_ID = process.env.PG_MERCHANT_ID;
        const SALT_KEY = process.env.PG_SALT_KEY;
        const keyIndex = 1;

        const refundTransactionId = ((originalMerchantTransactionId).slice(5,15).concat(crypto.randomBytes(4).toString('hex')));

        const payload = {
            merchantId: MERCHANT_ID,
            merchantUserId: merchantUserId,
            originalTransactionId: originalMerchantTransactionId,
            merchantTransactionId: refundTransactionId,
            amount: 1000, //amount*100
            callbackUrl: `http://localhost:3000/api/payment/refund_callback`
        };
        
        const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
        const dataToSign = `${base64Payload}/pg/v1/refund${SALT_KEY}`;
        const hash = crypto.createHash('sha256').update(dataToSign).digest('hex');
        const xVerify = `${hash}###${keyIndex}`;
        
        return {
            payload, xVerify, base64Payload
        };

    } catch (error: any) {
        throw new Error(error);
    }
};