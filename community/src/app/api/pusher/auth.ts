import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const Pusher = require('pusher');

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,

  });


  const { socket_id, channel_name } = req.body;

  const auth = pusher.authenticate(socket_id, channel_name);
  res.send(auth);
}
