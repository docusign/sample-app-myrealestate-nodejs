
const faker = require('faker');
const Lead = require('../models/lead');



/**
    This controller is used to store, retrieve, delete, and 
    generate random leads from a mongoDb database. 
 */


exports.add_lead = async (req, res) => {
    //check if the lead is already in the database
    //let user = await Lead.find({'email': req.body.email});c
    const newLead = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    };
    try {
        const ret = await Lead.create(newLead);
    }
    catch(error) {
        console.log(error);
    };
    res.status(200).send('Nice added a lead');

    //check if this lead is already in the database

}

//get leads
exports.get_leads = async (req, res) => {
    let leads;
    try {
        if(!req.body.num || !req.body.page){
            leads = await Lead.find().limit(10);
        } else{
            leads = await Lead.find()
                .skip(req.body.page * req.body.num).limit(req.body.num);
        }
    } catch(error) {
        res.send(error);
    }  
    res.json(leads);
}

exports.delete_leads = async (req, res) => {
    console.log('Deleting leads');
    try {
        const response = await Lead.deleteMany();
        res.status(200).send("Success: all leads deleted");
    } catch(error) {
        res.send(error);
    }
    
}

//generate 10 fake leads
exports.generate_random_leads = async (req, res) => {
    console.log("Generating random leads");
    try {
        for(let i = 0; i < 10; i++) {
            const newLead = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                phoneNumber: faker.phone.phoneNumberFormat().split('-').join("")
            }
            await Lead.create(newLead);
        }
        res.status(200).send("Success: 10 random leads added");
    } catch (error) {
        res.json(error);

    }
};

