import { Cortana } from '@context';
import { log } from '@libs/messages';
import puppeteer from 'puppeteer';

export async function highlightCmd(ctx: Cortana) {
  try {
    let lang: string = 'auto',
      code: string = "console.log('Hello World')";
    const url = `https://carbon.now.sh/?l=${lang}&t=one-dark&code=${code}`;
    const browser = await puppeteer.launch();
    console.log('launch');
    const page = await browser.newPage();
    await page.goto(url);
    const link = await page.$('.jsx-3261531754.bg');
    await link.screenshot({ path: 'helo.webp', quality: 100 });
    console.log(link);
    await browser.close();
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'highlightCmd()' });
  }
}

// https://carbon.now.sh/?bg=rgba%280%2C148%2C255%2C1%29&t=one-dark&wt=none&l=application%2Ftypescript&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=19px&ph=18px&ln=true&fl=1&fm=Hack&fs=18px&lh=168%25&si=false&es=2x&wm=false&code=const%2520hello%2520%253D%2520%2522hello%2522
