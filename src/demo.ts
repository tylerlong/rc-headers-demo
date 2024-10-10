import RingCentral from '@rc-ex/core';
import DebugExtension from '@rc-ex/debug';

const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID!,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET!,
  server: process.env.RINGCENTRAL_SERVER_URL!,
});

const main = async () => {
  await rc.authorize({
    jwt: process.env.RINGCENTRAL_JWT_TOKEN!,
  });
  await rc.installExtension(new DebugExtension());
  await rc
    .restapi()
    .account()
    .extension()
    .messageStore()
    .list({
      messageType: ['Fax'],
      direction: ['Inbound'],
    });
};
main();
