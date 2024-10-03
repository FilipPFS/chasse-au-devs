export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/my-account", "/question", "/jobs/:path*/apply"],
};
