import { clerkMiddleware } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// 1. Initialize the next-intl middleware
const intlMiddleware = createMiddleware(routing);

// 2. Wrap the next-intl middleware inside Clerk
export default clerkMiddleware((auth, req) => {
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Clerk's default matcher is perfect here. It catches all standard 
    // page routes (which next-intl needs) while ignoring static files.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};