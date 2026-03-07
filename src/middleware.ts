export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders/:path*",
    "/products/:path*",
    "/documents/:path*",
    "/finance/:path*",
    "/offers/:path*",
    "/analytics/:path*",
    "/ai/:path*",
    "/notifications/:path*",
    "/settings/:path*",
  ],
};
