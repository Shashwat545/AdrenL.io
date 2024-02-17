import crypto from "crypto";

interface IgetCheckStatusPayload {
    merchantTransactionId: string;
}

export default function getCheckStatusPayload ({ merchantTransactionId }: IgetCheckStatusPayload) {
    try {
        const MERCHANT_ID = process.env.PG_MERCHANT_ID;
        const SALT_KEY = process.env.PG_SALT_KEY;
        const keyIndex = 1;
        const basePath = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;

        const signatureString = `${basePath}${SALT_KEY}`;
        const hash = crypto.createHash('sha256').update(signatureString).digest('hex');
        const xVerify =  `${hash}###${keyIndex}`;
    
        return {
            xVerify, MERCHANT_ID, basePath
        };
    } catch (error: any) {
        throw new Error(error);
    }
};