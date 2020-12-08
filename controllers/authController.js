
'use strict';
require('dotenv').config();  //get access to environment variables
const moment = require('moment'); //libarary used to set and determine a tokens expiration date
const fs = require('fs');  //library used to parse the RSA key
const RoomsNodeSDK = require('docusign-rooms'); //Rooms API SDK
const oAuth = RoomsNodeSDK.ApiClient.OAuth;
const restApi = RoomsNodeSDK.ApiClient.RestApi;

// for production environment update to "www.docusign.net/restapi"
const basePath = restApi.BasePath.DEMO;
const oAuthBasePath = oAuth.BasePath.DEMO;

/**
 * Middlewear to check that the access token is still valid.
 * It should be used before any route that makes an API call to DocuSign.
 * It checks that the existing access accessToken can be used.
 * If the existing accessToken is expired, then
 * a new accessToken will be obtained from DocuSign.
 */
module.exports.updateToken = async (req) => {
    let rsaKey = null;
    if(process.env.NODE_ENV === 'production') {
        console.log("We are in production");
        rsaKey = process.env.RSA_KEY;
    } else {
        console.log("Getting RSA key, we are not in production");
        rsaKey = fs.readFileSync(process.env.PRIVATE_KEY_LOCATION);
    }
    const jwtLifeSec = 60 * 60; // requested lifetime for the JWT is 60 min
    //declare the scopes 
    const scopes = [
        oAuth.Scope.IMPERSONATION,
        oAuth.Scope.SIGNATURE,
        oAuth.Scope.COMPANY_WRITE,
        oAuth.Scope.COMPANY_READ,
        oAuth.Scope.ROOMS_WRITE,
        oAuth.Scope.ROOMS_READ
    ];
    //get an api client and set it's base path
    //remember to switch between DEV and PROD deployments
    var roomsNodeSDK = new RoomsNodeSDK.ApiClient({
        basePath: basePath,
        oAuthBasePath: oAuthBasePath
        });
    let results;

    //get the token
    try {
        results = await roomsNodeSDK.requestJWTUserToken(process.env.INTEGRATION_KEY, process.env.USER_ID, scopes, rsaKey, jwtLifeSec);
        //add the token and its expiration to the session
        const expiresAt = moment().add(results.body.expires_in, 's');
        req.session.token = results.body.access_token;
        req.session.tokenExpirationTimestamp = expiresAt;
    } catch(error) {
        console.log("error updating token");
        console.log(error);
    }
}

/**
 * Function that gets a JWT from docusign and stores it along
 * with it's expiration in the req.session
 */
const getToken = async (req) => {
    let rsaKey = null;
    if(process.env.NODE_ENV === 'production') {
        rsaKey = process.env.RSA_KEY;
    } else {
        rsaKey = fs.readFileSync(process.env.PRIVATE_KEY_LOCATION);
    }
    const jwtLifeSec = 60 * 60; // requested lifetime for the JWT is 60 min
    //declare the scopes 
    const scopes = [
        oAuth.Scope.IMPERSONATION,
        oAuth.Scope.SIGNATURE,
        oAuth.Scope.COMPANY_WRITE,
        oAuth.Scope.COMPANY_READ,
        oAuth.Scope.ROOMS_WRITE,
        oAuth.Scope.ROOMS_READ
    ];
    //get an api client and set it's base path
    //remember to switch between DEV and PROD deployments
    var roomsNodeSDK = new RoomsNodeSDK.ApiClient({
        basePath: basePath,
        oAuthBasePath: oAuthBasePath
      });
    let results;
    //get the token
    try {
        results = await roomsNodeSDK.requestJWTUserToken(process.env.INTEGRATION_KEY,
            process.env.USER_ID, scopes, rsaKey, jwtLifeSec);
    } catch(error) {
        //Need to add redirect return here, but need to deal with cors error first
        if (error.response.body.error && error.response.body.error === 'consent_required') {
            throw new Error("Consent required");
       } else {
            throw error;
       }
    }
    //add the token and its expiration to the session
    const expiresAt = moment().add(results.body.expires_in, 's');
    req.session.token = results.body.access_token;
    req.session.tokenExpirationTimestamp = expiresAt;
}

/*
    Helper method that retrieves the accountId, accountName, and/or basePath
    of the user
*/
const getUserInfo = async (req) => {
    const roomsNodeSDK = new RoomsNodeSDK.ApiClient()
        , targetAccountId = process.env.targetAccountId
        , baseUriSuffix = '/restapi';

    roomsNodeSDK.setOAuthBasePath(oAuthBasePath); // it have to be domain name

    const results = await roomsNodeSDK.getUserInfo(req.session.token);

    let accountInfo;
    if (!Boolean(targetAccountId)) {
        // find the default account
        accountInfo = results.accounts.find(account =>
            account.isDefault === "true");
    } else {
        // find the matching account
        accountInfo = results.accounts.find(account => account.accountId == targetAccountId);
    }
    if (typeof accountInfo === 'undefined') {
        throw new Error (`Target account ${targetAccountId} not found!`);
    }
    //add userInfo to the session
    req.session.accountId = accountInfo.accountId;
}



/**
 *  Login user
 *  request body:
 *      none
 *  response:
 *      status(200): 'Success'
 *      status(error.status): error.message 
 *      //see rooms api docs for detailed description of
 *      error messages
 */
module.exports.login = async (req, res, next) => {
    try {
        //get the token and add it to the session
        await getToken(req);
        //get the user info and add it to the session
        await getUserInfo(req);
    } catch (error) {
        //if consent is required, send the redirect URL to the user;
        if(error.message === 'Consent required') {
            let consent_scopes = "impersonation%20signature%20dtr.company.write%20dtr.company.read%20dtr.rooms.write%20dtr.rooms.read",
            consent_url = `${process.env.DS_OAUTH_SERVER}/oauth/auth?response_type=code&` +
                `scope=${consent_scopes}&client_id=${process.env.INTEGRATION_KEY}&` +
                `redirect_uri=${process.env.BACKEND_APP_URL}`;
            res.status(210).send(consent_url);
        }
        //send other error statys codes and messages
        console.log(error);
        res.status(error.status).send(error.message);
    }
    //success
    res.status(200).send('Success');
}

/**
 * Clears the DocuSign JWT token and session info
 * sets
 * @function
 */
module.exports.logout = (req, res) => {
   req.session = null;
   res.status(200).send("Success: you have logged out");
}

