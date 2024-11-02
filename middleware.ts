import authConfig from "@/auth.config"
import NextAuth from "next-auth"
const { auth } = NextAuth(authConfig)
import { apiAuthprefix, DEFAULT_LOGIN_PATH, authRoutes, publicRoutes } from "@/routes"

export default auth((req ) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log(nextUrl, "asdasdasdasdasdasd");

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthprefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_PATH, nextUrl))
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(" /auth/login", nextUrl))
  }

  return null

})


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
