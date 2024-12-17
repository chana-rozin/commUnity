import mongoose from "mongoose";
import userSchema  from '../../schemas/user';
import adSchema  from '../../schemas/ad';
import babysittingSchema  from '../../schemas/babysitting';
import communitySchema  from '../../schemas/community';
import eventSchema  from '../../schemas/event';
import loanSchema  from '../../schemas/loan';
import minyanSchema  from '../../schemas/minyan';
import neighborhoodSchema  from '../../schemas/neighborhood';
import postSchema  from '../../schemas/post';
import verifyEmailSchema from '../../schemas/verifyEmail'
import passwordSchema from "../../schemas/password";

export const user = mongoose.model('user', userSchema);
export const ad = mongoose.model('ad', adSchema);
export const babysitting = mongoose.model('babysitting', babysittingSchema);
export const post = mongoose.model('post', postSchema);
export const neighborhood = mongoose.model('neighborhood', neighborhoodSchema);
export const minyan = mongoose.model('minyan', minyanSchema);
export const loan = mongoose.model('loan', loanSchema);
export const event = mongoose.model('event', eventSchema);
export const community = mongoose.model('community', communitySchema);
export const VerifyEmail = mongoose.model('verify-email', verifyEmailSchema);
export const password = mongoose.model('password', passwordSchema);