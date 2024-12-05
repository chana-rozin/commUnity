import Pusher from 'pusher-js';

Pusher.logToConsole = true;

export const pusherClient =new Pusher('f2a4c88c3f3a6582f035', {
    cluster: 'ap2'
}); 
  /*new Pusher(process.env.PUSHER_KEY || '', {
  cluster: process.env.PUSHER_CLUSTER || '',
});*/