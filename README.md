# Mattermost OAuth2 Client Sample Application 

## Overview

Mattermost 3.3 and later includes an **OAuth2 Service Provider**, enabling users with an account on a Mattermost server to sign-in to 3rd party applications. 

This sample application, created in NodeJS, demonstrates how an OAuth2 client can be used with the Mattermost OAuth2 Service Provider.

## Setup Server Environment

1. Start a Mattermost Server cloned from [master](https://github.com/mattermost/platform)
2. Create an account and a team
3. Go To **System Console -> Integrations -> OAuth2 Provider** and enable the service
4. Go back to the team you created and from the **Main Menu** select **Integrations**
5. Add a new OAuth2 App, with `http://localhost:3000/oauth/callback` as the callback URL

## Setup Sample App Dev Environment
1. Clone the Github repository to run the sample
```
  git clone https://github.com/enahum/mattermost-sample-app.git
  cd mattermost-sample-app
```
2. Install the dependencies
 ```
 npm install
 ```
3. Setup the configuration according to your server an OAuth2 App by editing `config/config.json`
    - mattermost_url: this is the url of your mattermost instance (eg. http://localhost:8065)
    - client_id: the client_id of the OAuth2 App that you created
    - client_secret: the client_secret of the OAuth2 App that you created
   
    Note: It's possible to override the settings in the `config.json` file by setting environment variables with the same names

4. Once you have configured the app you can run it by issuing
```
npm start
```

The Sample App will be available under `http://localhost:3000`


## Stop the Sample App

1.  In the terminal window press `CTRL+C` to stop the sample app.
