import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

function isArrayIncluded(arr1: any[], arr2: any[]) {
    return arr1.every(element => arr2.includes(element));
}

// Declare the shape of the decoded JWT token (optional for better type safety)
interface DecodedToken extends jwt.JwtPayload {
    role: {
        id: string;
        communitiesIds: string[];
        neighborhoodId: string;
    };
}

export default function middleware(request: NextRequest) {
    console.log(request.nextUrl);

    const token = request.cookies.get('token')?.value; // Access the 'value' property of RequestCookie

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const decodedToken = jwt.decode(token) as DecodedToken | null;
        if (!decodedToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        if (!decodedToken.role) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        if (request.nextUrl.pathname.startsWith('/api/users')) {
            if (!decodedToken.role.id) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
            const userIdFromUrl = request.nextUrl.pathname.split('/')[3];
            if (decodedToken.role.id !== userIdFromUrl) {
                return NextResponse.redirect(new URL('/api/no-access', request.url));
            }
            return NextResponse.next();
        }
        // Handle other routes (e.g., `/api/posts`, `/api/events`)
        const communitiesParam = request.nextUrl.searchParams.get('communities');
        if (!communitiesParam) {
            const newUrl = new URL(request.url);
            newUrl.searchParams.set('communities', decodedToken.role.neighborhoodId);
            return NextResponse.redirect(newUrl);
        } else {
            const communityIdFromUrl = communitiesParam.split(',');
            if (!isArrayIncluded(communityIdFromUrl, decodedToken.role.communitiesIds)) {
                let communities = communityIdFromUrl.filter(
                    (c) => c !== decodedToken.role.neighborhoodId
                );
                if (communities.length > 0) {
                    if (!isArrayIncluded(communities, decodedToken.role.communitiesIds)) {
                        return NextResponse.redirect(new URL('/api/no-access', request.url));
                    }
                    return NextResponse.next();
                } else {
                    return NextResponse.next();
                }
            } else {
                return NextResponse.next();
            }
        }
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return NextResponse.redirect(new URL('/api/login', request.url));
    }
}

export const config = {
    matcher: [
        '/api/posts',
        '/api/events',
        '/api/babysittings',
        '/api/minyans',
        '/api/ads',
        '/api/loans',
        '/api/users/:path*'
    ],
};
