const fs = require('fs');
const readline = require('readline');
const gapi = require('gapi-client');

// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'credentials.json';

let GcalExportApi = (module.exports = function() {});

GcalExportApi.prototype.go = function() {
    // Load client secrets from a local file.
    try {
        const content = fs.readFileSync(__dirname + '/client_secret.json');
        this.authorize(JSON.parse(content), this.addClassScheduleEvent);
    }
    catch (err) {
        return console.log('Error loading client secret file:', err);
    }
};



/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 * @return {function} if error in reading credentials.json asks for a new one.
 */
GcalExportApi.prototype.authorize = function(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    let token = {};
    const oAuth2Client = new gapi.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    try {
        token = fs.readFileSync(TOKEN_PATH);
    }
    catch (err) {
        return this.getAccessToken(oAuth2Client, callback);
    }
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
GcalExportApi.prototype.getAccessToken = function(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return callback(err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            try {
                fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
                console.log('Token stored to', TOKEN_PATH);
            }
            catch (err) {
                console.error(err);
            }
            callback(oAuth2Client);
        });
    });
};

GcalExportApi.prototype.addClassScheduleEvent = function(auth, classScheduleEvent) {
    const calendar = gapi.calendar({ version: 'v3', auth });
    var event = {
        'summary': 'test thing',
        'start': {
            'dateTime': '2015-05-28T09:00:00-07:00',
            'timeZone': 'America/Edmonton'
        },
        'end': {
            'dateTime': '2015-05-28T17:00:00-07:00',
            'timeZone': 'America/Edmonton'
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1'
        ]
    };
    calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        resource: event,
    }, function(err, event) {
        if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return;
        }
        console.log('Event created: %s', event.htmlLink);
    });
};
