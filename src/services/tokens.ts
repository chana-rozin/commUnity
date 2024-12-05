import jwt from "jsonwebtoken"

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



