export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/my-account/:path*",
    "/applications/:path*",
    "/question",
    "/jobs/:path*/apply",
  ],
};
