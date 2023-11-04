// Dependencies
const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const app = express();
let dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

// Store .env
const connection = dotenv.parsed.CONNECTION;
const port = process.env.PORT || 3001;

// Controllers
const OrganisationalUnitController = require('./controllers/organisationalUnit.controller');
const UserController = require('./controllers/user.controller');

// MongoDB connection
let mongoose = require('mongoose');
const uri = connection;
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect(uri);

mongoose.connection.on('error', function () {
    console.log('Connection to Mongo established.');
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function () {
    console.log("Successfully connected to the database.");
})

// Users Collection 
// Login (POST): check credentials and log user in
app.post('/login', UserController.loginUser);

// Register (POST): check credentials and register new user
app.post('/register', UserController.registerNewUser);

// Get All Users (GET): gets usernames and roles 
app.get('/users', UserController.getUsers);

// Change User Role (PUT): updates user role in Users collection
app.put('/change-user-role', UserController.changeUserRole);


// Organisational Units 
// Get OUs (GET): gets all OUs that the user has access to
app.get('/organisational-units', OrganisationalUnitController.getOUs);

// Add Credential Repo (POST): adds a new credential repo 
app.post('/add-credential-repo', OrganisationalUnitController.addCredentialRepo);

//  Update Credential Repo (PUT): updates a credential repo 
app.put('/update-credential-repo', OrganisationalUnitController.updateCredentialRepo);

// Unassign User From OU (PUT): removes a user from the OU
app.put('/unassign-from-ou', OrganisationalUnitController.unassignOuUser);

// Unassign User From Division (PUT): removes a user from a specified division 
app.put('/unassign-from-division', OrganisationalUnitController.unassignDivisionUser);

// Assign User To OU And Division  (PUT): assigns a selected user to a new OU
app.put('/assign-user', OrganisationalUnitController.assignToNewOU);

// Populate all the OU and Divisions (POST): assigns Divisions to OUs
app.post('/populate-ous', OrganisationalUnitController.populate);


// Listen on port 3001 (or default) 
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})
