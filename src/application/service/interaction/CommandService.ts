import { Telegram } from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';
import { Message } from 'telegraf/typings/telegram-types';
import ICommandService from '../../../domain/interface/application/service/interaction/ICommandService';
import News from '../../../domain/model/News';
import ChatService from '../message/ChatService';
import MessageService from '../message/MessageService';

export default class CommandService implements ICommandService {
  private readonly messageService: MessageService;

  private readonly chatService: ChatService;

  constructor(mailman: Telegram) {
    this.messageService = new MessageService(mailman);
    this.chatService = new ChatService();
  }

  async addUser(ctx: TelegrafContext): Promise<Message> {
    await this.chatService.create(ctx.update.message.chat.id);
    console.log(`New client ${ctx.update.message.chat.id} added`);
    return ctx.reply(`Gotcha ${ctx.update.message.from.first_name}! From now on you will receive news about NFL as soon them are published 👌`);
  }

  async removeUser(ctx: TelegrafContext): Promise<Message> {
    await this.chatService.delete(ctx.update.message.chat.id);
    console.log(`Chat ${ctx.update.message.chat.id} removed from list`);
    return ctx.replyWithMarkdown('Ok then, you will not hear from me anymore 😭\n'
          + 'If you change your mind, just send me `/firstdown` again 😉');
  }

  async sendLatest(ctx: TelegrafContext, news: Map<string, News>): Promise<Message> {
    if (news.size > 0) {
      return this.messageService.send(ctx.update.message.chat.id, news.values().next().value);
    }

    return ctx.reply("Sorry, I don't have news/tweets/fantasy transactions yet 😥");
  }
}
