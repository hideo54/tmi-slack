import type { App, ExpressReceiver } from '@slack/bolt';

const func = ({ slackApp, receiver, channel }: {
    slackApp: App;
    receiver: ExpressReceiver,
    channel: string;
}) => {
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
    return receiver.app;
};

export default func;
