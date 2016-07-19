/**
 * Created by enahum on 6/13/16.
 */

import config from './config';
import Mattermost from 'mattermost';
import passport from 'passport';
import {Strategy as OAuth2Strategy} from 'passport-oauth2';

const mattermost = new Mattermost();

var auth = {
    url: null,
    setUrl(mattermostUrl) {
        this.url = mattermostUrl;

        const oauth2Strategy = new OAuth2Strategy({
            authorizationURL: `${mattermostUrl}/api/v3/oauth/authorize`,
            tokenURL: `${mattermostUrl}/api/v3/oauth/access_token`,
            clientID: config.get("client_id"),
            clientSecret: config.get("client_secret"),
            callbackURL: "/oauth/callback"
        }, (accessToken, refreshToken, profile, cb) => {
            profile.accessToken = accessToken;
            profile.refreshToken = refreshToken;
            return cb(null, profile);
        });

        oauth2Strategy.userProfile = (accessToken, done) => {
            mattermost.setUrl(auth.url);
            mattermost.setOAuthToken(accessToken);
            mattermost.getMe(
                (data) => {
                    done(null, data);
                },
                (err) => {
                    done(err);
                }
            );
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