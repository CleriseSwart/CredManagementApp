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

// Export OrganisationalUnit 
let NewCredentialRepo = mongoose.model('NewCredentialRepo', credentialRepoSchema);

module.exports = NewCredentialRepo;