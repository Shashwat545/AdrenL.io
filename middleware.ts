export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/trips",
        "/favorites",
        "/reservations",
        "/adventures",
        "/account-settings",
        "/hosting",
        "/hosting/:path*",
        "/inbox",
        "/inbox/:path*"

    ]
}