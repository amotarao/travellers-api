import * as functions from 'firebase-functions';
import { getCookie } from '../../modules/address/authentication';
import { getHome } from '../../modules/address/home';
import { deleteHome, setHome } from '../../modules/firestore/cachedAddressHomes';
import { getSecret, updateSecret } from '../../modules/firestore/secret/address';
import { defaultRegion } from '../../modules/functions/constants';

const MAX_COUNT = 480;

export const crawlHomes = functions
  .region(defaultRegion)
  .pubsub.schedule('* * * * *')
  .onRun(async (context) => {
    const minutes = new Date(context.timestamp).getMinutes();
    const count = Math.floor(MAX_COUNT / 60);
    const baseId = count * minutes + 1;
    const targetIds = [...new Array(count)].map((_, i) => (baseId + i).toString());

    const secret = await getSecret('amon');
    const cookie =
      secret.cookie ||
      (await getCookie(secret).then(async (cookie) => {
        await updateSecret('amon', { cookie });
        return cookie;
      }));

    await Promise.all(
      targetIds.map(async (id) => {
        const home = await getHome(id, cookie).catch(() => null);
        home ? await setHome(id, home) : await deleteHome(id);
      })
    );
  });