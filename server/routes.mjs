import express from 'express';
import { log } from '../utils/';
import webapi from '@slack/web-api';

const { WebClient } = webapi;

const oauthUrl = 'https://slack.com/oauth/authorize';

const token = process.env.SLACK_TOKEN;
const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;

const redirectUri = 'https://sordeo.serveo.net/oauth';
const scope = 'chat:write:user';
// TODO: state should be generated for each user
const state = 'UNIQUE_SECRET';

const router = new express.Router();

// TODO: this should probably be in a database
const tokens = {};

router.get('/oauth', async (req, res) => {
  let code = req.query.code;
  let error = req.query.error;

  if (error) {
    return res.status(200).send('You denied required permissions and won\'t be able to use the app.');
  }

  if (req.query.state !== state) {
    return res.status(200).send('');
  }

  const web = new WebClient(token);
  let response = await web.oauth.access({
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    redirect_uri: redirectUri
  });

  tokens[response.user_id] = response.access_token;

  return res.status(200).send('Authenticated. You can close this page.');
});

router.post('/', async (req, res) => {
  log.info(req.body);

  if (tokens[req.body.user_id]) {
    const web = new WebClient(tokens[req.body.user_id]);
    await web.chat.postMessage({
      channel: req.body.channel_id,
      text: '',
      blocks: [
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            'text': req.body.text
          }
        }
      ]
    });
    return res.status(200).send('');
  } else {
    const teamId = req.body.team_id;
    const url = `${oauthUrl}?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}&team=${teamId}`;
    return res.status(200).send(`You need to <${url}|authenticate> the app.`);
  }
});

export default router;
