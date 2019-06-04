import webapi from '@slack/web-api';
import { getAuthUrl } from './auth';
import { getToken } from './redisClient';
const { WebClient } = webapi;

const mdlHandler = async (req, res) => {
  const { user_id, channel_id, text, team_id } = req.body;

  let token = null;
  try {
    token = await getToken(user_id);
  } catch {

  }

  if (token) {
    const web = new WebClient(token);
    await web.chat.postMessage({
      channel: channel_id,
      text: '',
      blocks: [
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            'text': text
          }
        }
      ]
    });
    return res.status(200).send('');
  } else {
    const url = getAuthUrl(team_id);
    return res.status(200).send(`You need to <${url}|authenticate> the app.`);
  }
};

export default mdlHandler;
