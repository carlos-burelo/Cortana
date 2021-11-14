import { readdirSync } from 'fs';
import { localesDir } from '@config';

export async function getLocales() {
  const locales = readdirSync(localesDir).map((file) => file.replace('.ts', ''));
  return await Promise.all(
    locales.map(async (i) => {
      const {
        LANG: { id, flag },
      } = await import(`${localesDir}/${i}.ts`);
      return {
        flag,
        id,
        code: i,
      };
    })
  );
}
