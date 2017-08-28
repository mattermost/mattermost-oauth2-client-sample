/**
 * Created by enahum on 6/13/16.
 */

import config from './config';
import {Client4 as mattermost} from 'mattermost-redux/client';
import passport from 'passport';
import {Strategy as OAuth2Strategy} from 'passport-oauth2';

var auth = {
    url: null,
    setUrl(mattermostUrl) {
        this.url = mattermostUrl;

        const oauth2Strategy = new OAuth2Strategy({
            authorizationURL: `${mattermostUrl}/oauth/authorize`,
            tokenURL: `${mattermostUrl}/oauth/access_token`,
            clientID: config.get("client_id"),
            clientSecret: config.get("client_secret"),
            callbackURL: `${config.get("client_url")}/oauth/callback`
        }, (accessToken, refreshToken, profile, cb) => {
            profile.accessToken = accessToken;
            profile.refreshToken = refreshToken;
            return cb(null, profile);
        });

        oauth2Strategy.userProfile = (accessToken, done) => {
            mattermost.setUrl(auth.url);
            mattermost.setToken(accessToken);
            mattermost.getMe().then((data) => {
                done(null, data);
            }). catch((err) => {
                done(err);
            });
        };

        passport.use(oauth2Strategy);
    }
};

passport.serializeUser((user, done) => {
   done(null, user);
});

passport.deserializeUser((user, done) => {
   done(null, user);
});

module.exports = auth; 
