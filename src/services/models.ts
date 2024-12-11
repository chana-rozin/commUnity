import mongoose from "mongoose";
import userSchema  from '../schemas/user';
import adSchema  from '../schemas/ad';
import babysittingSchema  from '../schemas/babysitting';
import communitySchema  from '../schemas/community';
import eventSchema  from '../schemas/event';
import loanSchema  from '../schemas/loan';
import minyanSchema  from '../schemas/minyan';
import neighborhoodSchema  from '../schemas/neighborhood';
import postSchema  from '../schemas/post';
import verifyEmailSchema from '../schemas/verifyEmail'
import passwordSchema from "../schemas/password";

export const User = mongoose.model('user', userSchema);
export const Ad = mongoose.model('ad', adSchema);
export const Babysitting = mongoose.model('babysitting', babysittingSchema);
export const Post = mongoose.model('post', postSchema);
export const Neighborhood = mongoose.model('neighborhood', neighborhoodSchema);
export const Minyan = mongoose.model('minyan', minyanSchema);
export const Loan = mongoose.model('loan', loanSchema);
export const Event = mongoose.model('event', eventSchema);
export const Community = mongoose.model('community', communitySchema);
export const VerifyEmail = mongoose.model('verify-email', verifyEmailSchema);
export const Password = mongoose.model('password', passwordSchema);