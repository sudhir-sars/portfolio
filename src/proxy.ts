import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)", "/links(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Redirect root → /cv
  if (req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/cv";
    return NextResponse.redirect(url);
  }

  // Protect routes
  if (isProtectedRoute(req)) {
    const { sessionClaims } = await auth.protect();

    const role = sessionClaims?.metadata?.role;

    if (role !== "admin") {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
