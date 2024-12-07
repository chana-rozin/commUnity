import mongoose from "mongoose";
import userSchema  from '../services/schemas/user';
import adSchema  from '../services/schemas/ad';
import babysittingSchema  from '../services/schemas/babysitting';
import communitySchema  from '../services/schemas/community';
import eventSchema  from '../services/schemas/event';
import loanSchema  from '../services/schemas/loan';
import minyanSchema  from '../services/schemas/minyan';
import neighborhoodSchema  from '../services/schemas/neighborhood';
import postSchema  from '../services/schemas/post';
import verifyEmailSchema from '../services/schemas/verifyEmail'
import passwordSchema from "./schemas/password";

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