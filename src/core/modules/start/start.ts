import { Cortana } from '../../../context';
import { log } from '../../libs/messages';

export async function startCmd(ctx: Cortana) {
	try {
	} catch (error) {
		const [l] = error.stack.match(/(d+):(d+)/);
		log({ ctx, error, __filename, l, f: 'startCmd()' });
	}
}

export const startHelp = `Help for *start* command`;