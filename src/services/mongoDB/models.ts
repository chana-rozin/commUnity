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

export const user = mongoose.models.user || mongoose.model('user', userSchema);
export const ad = mongoose.models.ad || mongoose.model('ad', adSchema);
export const babysitting = mongoose.models.babysitting || mongoose.model('babysitting', babysittingSchema);
export const post = mongoose.models.post || mongoose.model('post', postSchema);
export const neighborhood = mongoose.models.neighborhood || mongoose.model('neighborhood', neighborhoodSchema);
export const minyan = mongoose.models.minyan || mongoose.model('minyan', minyanSchema);
export const loan = mongoose.models.loan || mongoose.model('loan', loanSchema);
export const event = mongoose.models.event || mongoose.model('event', eventSchema);
export const community = mongoose.models.community || mongoose.model('community', communitySchema);
export const VerifyEmail = mongoose.models.verify_email || mongoose.model('verify_email', verifyEmailSchema);
export const password = mongoose.models.password || mongoose.model('password', passwordSchema);