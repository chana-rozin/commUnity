import jwt from "jsonwebtoken"

interface DecodedToken extends jwt.JwtPayload {
    role: {
        id: string;
        communitiesIds: string[];
        neighborhoodId: string;
    };
}
export const generateToken = (id: string, communitiesIds: Array<string>, neighborhoodId: string) => {
    if (!process.env.TOKEN_SECRET) {
        throw new Error('Token secret is required')  // No token secret is provided 
    }
    const tokenSecret = process.env.TOKEN_SECRET

    return jwt.sign({
        role: { id: id, communitiesIds: communitiesIds, neighborhoodId: neighborhoodId }
    }, tokenSecret, {
        algorithm: 'HS256',
        expiresIn: '7d',
        issuer: 'commUnity',
        subject: id
    })
}

export const verifyToken = (token: string): DecodedToken => {
    if (!process.env.TOKEN_SECRET) {
        throw new Error("Token secret is required"); // Ensure token secret is set
    }

    const tokenSecret = process.env.TOKEN_SECRET;

    try {
        // Verify the token and return the decoded payload
        const decoded = jwt.verify(token, tokenSecret, {
            algorithms: ["HS256"],
            issuer: "commUnity",
        }) as  DecodedToken ;

        return decoded;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

