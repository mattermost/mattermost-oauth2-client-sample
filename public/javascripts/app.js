/**
 * Created by enahum on 6/13/16.
 */

window.addEventListener('message', receiveMessage, false);

window.addEventListener('DOMContentLoaded', ready, false);

function receiveMessage(event) {
    var entry = document.querySelector('#entry');
    if (entry && event.data && event.data.type === 'origin') {
        var mm_url = event.origin;
        var request = new XMLHttpRequest();

        request.open('POST', '/client', true);

        request.onreadystatechange = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                document.querySelector('#parent').innerText = mm_url;
                document.querySelector('#embedded').style.display = 'block';
            }
        };

        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify({url: mm_url}));
    }
}

function ready() {
    var error = document.querySelector('#error');
    var user = document.querySelector('#user');

    if (error) {
        localStorage.setItem('error', error.innerText);
    }

    if (user) {
        localStorage.removeItem('error');
        localStorage.setItem('user', true);
    }

    if (window.location.href.indexOf('callback') >= 0) {
        setTimeout(function () {
            console.log('is this running');
            window.close();
        }, 1000);
    }

    if (!localStorage.getItem('ispopup')) {
        handleOAuth();
    }
}

function handleOAuth() {
    var error = localStorage.getItem('error');
    var user = localStorage.getItem('user');

    if (error) {
        localStorage.removeItem('error');
        document.querySelector('.oauth-error').innerText = error;
    }
    
    if (user) {
        localStorage.removeItem('user');
        window.location.href = '/user';
    }
}

function makeAuth(e) {
    e.preventDefault();
    document.querySelector('.oauth-error').innerText = '';
    localStorage.setItem('ispopup', true);

    var w = 600;
    var h = 420;
    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;

    this.opener = window.open("/login", 'Mattermost Authentication', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        opener.focus();
    }

    var self = this;
    this._oauthInterval = window.setInterval(function() {
        if(self.opener.closed) {
            window.clearInterval(self._oauthInterval);
            localStorage.removeItem('ispopup');
            handleOAuth();
        }
    }, 1000);
}