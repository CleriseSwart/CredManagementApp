// Dependencies
const mongoose = require('mongoose');

// Credential Repos
let credentialRepoSchema = new mongoose.Schema({
    repoName: {
        type: String,
        required: true
    },
    repoEmail: {
        type: String,
        required: true
    },
    repoUsername: {
        type: String,
        required: true
    },
    repoPassword: {
        type: String,
        required: true
    }
});

// Divisions
let divisionSchema = new mongoose.Schema({
    divisionName: {
        type: String,
        required: true
    },
    divisionUsers: [],
    // Get credentialRepoSchema 
    credentialRepos: [credentialRepoSchema]
});

// Organisational Unit
let organisationalUnitSchema = new mongoose.Schema({
    ouName: {
        type: String,
        required: true
    },
    ouUsers: [],
    // Get divisionSchema
    divisions: [divisionSchema]
});

// Export OU
let OrganisationalUnit = mongoose.model('OrganisationalUnit', organisationalUnitSchema);

module.exports = OrganisationalUnit;