const AWS = require("aws-sdk");

var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

const cognito = new AWS.CognitoIdentityServiceProvider({region: "us-east-2"})

const deleteUser = async (sub) => {
    return await new Promise((resolve, reject) => {
        const params = {
            UserPoolId: 'us-east-2_mzC4PPHro',
            Username: sub
        }

        cognito.adminDeleteUser(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const deleteUsers = async (subs) => {
    subs.forEach(sub => {
        return deleteUser(sub)
    })
}

module.exports = deleteUsers
