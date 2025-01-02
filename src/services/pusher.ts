import Pusher from 'pusher-js';

class PusherSingleton {
  private static instance: Pusher;

  private constructor() {}

  public static getInstance(): Pusher {
    if (!PusherSingleton.instance) {
      // Initialize the Pusher client
      PusherSingleton.instance = new Pusher('f2a4c88c3f3a6582f035', {
        cluster: 'ap2',
      });

      // Pusher.logToConsole = true;
    }

    return PusherSingleton.instance;
  }

}

export default PusherSingleton.getInstance();




