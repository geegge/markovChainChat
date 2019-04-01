# markovChainChat

## Overview

library to provide chat-message-predictions based on [markov-chains](https://en.wikipedia.org/wiki/Markov_chain)

:bangbang: **under development**

## developing

for developing run `npm run dev` to start dev-server and setup dev implementation in `dev/dev.js` or `dev/index.html`

### chat-messages

get messages out of rocket chat(via [RestApi](https://rocket.chat/docs/developer-guides/rest-api/)):

1. get auth token for rest api: `curl -H "Content-type:application/json" http://localhost:3000/api/v1/login -d '{ "user": "<yourusername>", "password": "<yourpassword>" }'`

then you get your authtoken and your id from he api. with it you can now:

2. get a list of rooms: `curl -H "X-Auth-Token: <yourtoken>" -H "X-User-Id: <youruserid>" http://localhost:3000/api/v1/channels.list`

there you can extract the id of the room you want to get the history from.

3. get the history of a room: `curl -H "X-Auth-Token: <yourtoken>" -H "X-User-Id: <youruserid>" http://localhost:3000/api/v1/channels.history?roomId=GENERAL`
