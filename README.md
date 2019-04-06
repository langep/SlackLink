# MarkdownLink

I created this app because it was not possible to post markdown style links like this [Link to Google](https://www.google.com) in Slack.
If you host this app and configure it for your workspace you will be able to use the following format `<https://www.google.com|Link to Google>`
in messages prefixed with the `/mdl` slash command. You can customize this command when creating the SlackApp but I am using it from here on out for simplicity.

- [MarkdownLink](#markdownlink)

## Gotchas

Slash commands like `/mdl` currently don't work in threads. A potential alternative would have been to use Slack Events to read all messages and rewriting them in case a link was detected. However, I don't think that this is an elegant solution
and very much prefer this limitation.

## Installation

### Create a Slack App for your Workspace

TBD - Information about creating the Slack App and the info we need for the heroku setup.

### Host this code on Heroku

TBD - Information about deploying to heroku incl. redis addon and environment vars

## Usage

### Formatting links

You can send a message with formatted links as such

```slack
/mdl @channel, checkout my message with a cool <https://www.google.com|link to Google>.
```

which will show up similar to this:

*@channel* checkout my message with a cool [link to Google](https://www.google.com).


### Authentication

The first time you are using `/mdl` or the command you configured, it will ask you to authenticate with the app. This is necessary so that we can post a message back to the app as your user.

## Development

TBD - Information about using --experimental-modules and nodemon or heroku local web