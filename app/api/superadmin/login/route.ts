import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST (request: Request, response: Response) {
    try {
        const password =process.env.SUPERADMIN_PASS || "";
        const body = await request.json();

        if (!body.role || body.role !== "admin") {
            return NextResponse.json({ message: "Invalid role or password" }, { status: 403 });
        }

        const isPasswordValid = (body.password == password);

        if (!body.password || !isPasswordValid) {
            return NextResponse.json({ message: "Invalid role or password" }, { status: 403 });
        }

        if (!process.env.JWT_ADMIN_SECRET) {
            return NextResponse.json({ message: "Invalid secret key" }, { status: 500 });
        }

        const token = jwt.sign({ role: body.role }, process.env.JWT_ADMIN_SECRET);

        const response = NextResponse.json({ message: "success" }, { status: 200 });
        response.cookies.set('admin-auth', token, {
            httpOnly: true,
            maxAge: 30 * 60 * 1000, // 30 min
        });

        return response;
    } catch (error) {
        return NextResponse.json(JSON.stringify({ message: "error" }), { status: 500 });
    }
};

export async function GET (request: NextRequest) {
    try {
        const cookie = request.cookies.get("admin-auth");
        if(!cookie) {
            return NextResponse.json({ message: "Please login!" }, { status: 200 });
        }

        const secretOrPublicKey = process.env.JWT_ADMIN_SECRET;
        if (!secretOrPublicKey) {
            return NextResponse.json({ message: "Invalid secret key" }, { status: 500 });
        }

        try {
            const claims = jwt.verify(cookie.value, secretOrPublicKey);
            if (!claims) {
                return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
            }
        } catch (error) {
            console.log("Error in SuperAdmin Login Route: ",error);
            return NextResponse.json({ message: "Invalid token" }, { status: 500 });
        }
        return NextResponse.json({ message:"ok" }, { status:200 });

    } catch (error) {
        console.log("Error in SuperAdmin Login Route: ",error);
        return NextResponse.json({ message:error }, { status:500 });
    }
};