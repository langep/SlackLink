
import webapi from '@slack/web-api';
import { setToken } from './redisClient';
const { WebClient } = webapi;

// TODO: state should be generated for each user
const state = 'UNIQUE_SECRET';

const oauthUrl = 'https://slack.com/oauth/authorize';
const token = process.env.SLACK_TOKEN;
const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;
const redirectUri = `${process.env.DOMAIN}/oauth`;
const scope = 'chat:write:user';

const oauthHandler = async (req, res) => {
  const { code, error } = req.query;

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

  const { user_id, access_token } = response;
  setToken(user_id, access_token);

  return res.status(200).send('Authenticated. You can close this page.');
};

const getAuthUrl = (teamId = null) => {
  if (teamId) {
    return `${oauthUrl}?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}&team=${teamId}`;
  } else {
    return `${oauthUrl}?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
  }
};

export { oauthHandler, getAuthUrl };
