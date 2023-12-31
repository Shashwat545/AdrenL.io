import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export default async function isAdminAuthenticated() {
    try {
        const cookie = cookies().get("admin-auth");
        if(!cookie) {
            return false;
        }

        const secretOrPublicKey = process.env.JWT_ADMIN_SECRET;
        if(!secretOrPublicKey) {
            return false;
        }

        try {
            const claims = jwt.verify(cookie.value, secretOrPublicKey);
            if (!claims) {
                return false;
            }
        } catch (error) {
            console.log("Error in isAdminAuthenticated.js: ",error);
            return false;
        }
        return true;

    } catch(error) {
        console.log("Error in isAdminAuthenticated.js: ",error);
        return false;
    }
}