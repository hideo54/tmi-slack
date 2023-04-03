import type { App, ExpressReceiver } from '@slack/bolt';

const func = ({ slackApp, receiver, channel }: {
    slackApp: App;
    receiver: ExpressReceiver,
    channel: string;
}) => {
    // Channel Notifier
    slackApp.event('channel_created', async ({ event, client }) => {
        const { id, creator } = event.channel;
        client.chat.postMessage({
            channel,
            icon_emoji: ':mega:',
            username: 'チャンネルお知らせ',
            text: `<@${creator}>が新しいチャンネル <#${id}> を作成しました :+1:`,
        });
    });
    slackApp.event('channel_unarchive', async ({ event, client }) => {
        const { channel, user } = event;
        client.chat.postMessage({
            channel,
            icon_emoji: ':mega:',
            username: 'チャンネルお知らせ',
            text: `<@${user}>がチャンネル <#${channel}> を復元しました :+1:`,
        });
    });

    // Emoji Notifier
    slackApp.event('emoji_changed', async ({ event, client }) => {
        let text = '';
        if (event.subtype === 'add') {
            text = `絵文字 :${event.name}: \`:${event.name}:\` が追加されました :+1:`;
        }
        if (event.subtype === 'remove') {
            text = `絵文字 ${event.names?.map(name =>
                '`:' + name + ':`'
            ).join(', ')} が削除されました :wave:`;
        }
        if (event.subtype === 'rename') {
            text = `絵文字 :${event.new_name}: の名前が \`:${event.old_name}:\` から :${event.new_name}: に変更されました :+1:`;
        }
        client.chat.postMessage({
            channel,
            icon_emoji: ':mega:',
            username: '絵文字お知らせ',
            text,
        });
    });
    return receiver.app;
};

export default func;
