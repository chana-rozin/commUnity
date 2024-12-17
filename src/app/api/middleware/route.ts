// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {

//     return NextResponse.redirect(new URL('/home', request.url))
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/api/((?!login|register).*)'], // Match all API paths except /api/login and /api/register
// };
export async function GET(){
    return new Response("Hello from serverless function!");
}