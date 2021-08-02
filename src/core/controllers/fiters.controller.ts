import { Context } from 'telegraf';
import { FilterI } from '../../../src/core/interfaces';
import { db } from '../../database';
import { lang } from '../../database';
import { errorHandler } from '../libs/messages';

export async function setFilter(ctx: Context, newFilter: FilterI) {
  const _ = await lang(ctx);
  try {
    let data = db(ctx.chat).get('filters').find({ id: newFilter.id }).value();
    if (data == undefined) {
      db(ctx.chat).get('filters').push(newFilter).write();
      ctx.replyWithMarkdown(_.filterModule.filterSaved(newFilter.id));
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'setFilter()', l });
  }
}
export async function stopFilter(ctx: Context, filter: string) {
  const _ = await lang(ctx);
  try {
    let data = db(ctx.chat).get('filters').find({ id: filter }).value();
    if (data == undefined) {
      return ctx.replyWithMarkdown(_.filterModule.noFoundFilter(filter));
    } else {
      db(ctx.chat).get('filters').remove({ id: filter }).write();
      ctx.replyWithMarkdown(_.filterModule.removedFilter(filter));
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'stopFilter()', l });
  }
}
export async function getFilters(ctx: Context) {
  const _ = await lang(ctx);
  try {
    let filters = db(ctx.chat).get('filters').value();
    let { title }: any = await ctx.getChat();
    if (filters.length !== 0) {
      let text = _.filterModule.title(title);
      filters.forEach((a, i) => {
        text += `${i}  \`${a.id}\`\n`;
      });
      ctx.replyWithMarkdown(text);
    } else {
      ctx.replyWithMarkdown(_.filterModule.noFiltersFound);
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'getFilters()', l });
  }
}
export async function getFilter(ctx: Context, filter: string) {
  const _ = await lang(ctx);
  try {
    let filters: FilterI[] = db(ctx.chat).get('filters').value();
    let search: FilterI | undefined = filters.find(
      (a) => a.id.toLowerCase() === filter.toLowerCase()
    );
    if (search == undefined) {
      return ctx.replyWithMarkdown(`El *filtro* \`${filter}\` no existe en mi base de datos`);
    } else {
      let text = _.filterModule.filterDesc(filter);
      text += _.filterModule.type(search.type);
      if (search.strings) {
        text += _.filterModule.resp;
        search.strings.map((a, i) => {
          text += `${i + 1} - ${a}`;
        });
      } else {
        text += `*Id:*  \`${search.content}\``;
      }
      return ctx.replyWithMarkdown(text);
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'getFilter()', l });
  }
}
export async function handleFilter(ctx: Context) {
  try {
    console.log('works');
    const _ = await lang(ctx);
    if (ctx.chat.type == 'private') {
      return;
    }

    if ('message' in ctx.update) {
      console.log('works MESSAGE');
      let { text }: string | any = ctx.message;
      console.log(text);

      let filters = db(ctx.chat).get('filters').value();
      console.log('works GETFILTERS');
      if (filters.length == 0) {
        return;
      }
      filters.map(async (f) => {
        console.log('works MAP');
        if (text.toUpperCase().includes(f.id.toLocaleLowerCase())) {
          console.log('works RESULT');
          if (f.strings) {
            console.log('message');

            ctx.reply(f.strings[Math.floor(Math.random() * f.strings.length)]);
          } else {
            console.log('other format');

            // await sendMessage(ctx, f);
          }
        }
      });
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'filterHandler()', l });
  }
}
