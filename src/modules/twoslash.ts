import { command, listener, Module } from 'cookiecord';
import { Message, TextChannel } from 'discord.js';
import { twoslasher, TwoSlashReturn } from '@typescript/twoslash';
import { findCodeblockFromChannel } from '../util/findCodeblockFromChannel';

export default class TwoslashModule extends Module {
	@command({ single: true })
	async ts(msg: Message, symbol: string) {
		const code = await findCodeblockFromChannel(msg.channel as TextChannel);

		if (!code)
			return msg.channel.send(
				`:warning: could not find any TypeScript codeblocks in the past 10 messages`,
			);

		const ret = twoslasher(code, 'ts');

		const CODEBLOCK = '```';

		return msg.channel.send(
			`${CODEBLOCK}typescript\n${
				ret.staticQuickInfos.find(i => i.targetString === symbol)?.text
			}${CODEBLOCK}`,
		);
	}
}
