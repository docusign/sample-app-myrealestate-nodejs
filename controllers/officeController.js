require('dotenv').config();
var RoomsNodeSDK = require('docusign-rooms');
var crypto = require('crypto');
var restApi = RoomsNodeSDK.ApiClient.RestApi;
var oAuth = RoomsNodeSDK.ApiClient.OAuth;
var basePath = (process.env.NODE_ENV === 'prod') ?
    restApi.Api.BasePath.PRODUCTION : restApi.BasePath.DEMO;
var oAuthBasePath = (process.env.NODE_ENV === 'prod') ? 
    oAuth.BasePath.PRODUCTION : oAuth.BasePath.DEMO;
var accountId = process.env.USER_ID;

/*
    This method generates a office for the user
    returns:
        status(200): officeId
        status(400):  "Error creating a new office, ran out of tries"
        status(error.status): error.response.body.message; 
        see api doc for all possible errors
*/
exports.get_office = async (req, res) => {
    //set up the apiClient  
    var roomsNodeSDK = new RoomsNodeSDK.ApiClient({
        basePath: basePath,
        oAuthBasePath: oAuthBasePath
    });
    roomsNodeSDK.addDefaultHeader('Authorization', 'Bearer ' + req.session.token); 
    
    //set up the officeApi
    var officeApi = new RoomsNodeSDK.OfficesApi(roomsNodeSDK);

    //Generate an office, it gets 5 tries to do so as office names must be unique
    let newOffice = {};
    let tries = 0;
    let officeId;
    //think about this :)
    while(tries++ < 5) {
        //generate a random office name
        newOffice.name = crypto.randomBytes(20).toString('hex');
        try {
            let response = await officeApi.createOffice(newOffice, process.env.API_ACCOUNT_ID);
            officeId = response.officeId;
            break;
        } catch(error) {
            //continue if it is a name already exists error
            let sameNameErrorMessage = 
                'The office \'' + newOffice.name + '\' already exists. Please choose a different name.';
            if(error.response.body.message !== sameNameErrorMessage) {
                //send the error if you are out of tries
                if(tries === 5) {
                    res.status(error.status).send("Error creating a new office, ran out of tries");
                }
                continue;
            }
            //different error, send it
            console.log(error);
            res.status(error.status).send(error.response.body.message);
        }
    }

    //success, add the office to the session and send the office Id    
    req.session.officeId = officeId;
    res.status(200).json({officeId: officeId});
}

/*
    This method adds an office Id to the user's session
    request body:
        officeId: (number) the id of the office of the requested offices 
    returns:
        status(200): 'Success office added to session'
        status(400):  'officeId required'
*/
exports.add_office_to_session = async (req, res) => {
    if(!req.body.officeId) {
        res.status(400).send("officeId required");
    }
    req.session.officeId = req.body.officeId;
    res.status(200).send('Success office added to session');
}