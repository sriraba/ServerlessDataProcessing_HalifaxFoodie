/**
 * Title: Save User Details To Dynamo
 * Author: Sri Ramya Basam
 * Date: 2022/11/09
 * Availability: https://sumantmishra.medium.com/connecting-and-using-aws-dynamodb-remotely-with-nodejs-13e199784dd3 
 */
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();



async function createItem(params){
  try {
    await docClient.put(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async (event, context, callback) => {
    
    console.info("saveUserToDynamoDB called", event);
    
    if (event.body !== null && event.body !== undefined) {
        let data = JSON.parse(event.body);
        console.info("logging json ", data);
        let usernamed = data.body.username;
        let passwordd = data.body.password;
        let emaild = data.body.email;
        let usertyped = data.body.usertype;
        const params = {
            TableName : 'halifaxFoodieUserLookup',
            Item: {
                username: usernamed,
                // password: passwordd,
                email: emaild,
                usertype: usertyped
            }
        };
        
        try {
            await createItem(params);
            console.info("Successfully created item!", event);
            return sendRes(200, '{ "error": false, "message": "user data stored successfully" }');
        } catch (err) {
        console.info("Error creating item!", err);
        return sendRes(404, '{ error: true, message: "error storing user data" }');
        }
    }    
    
    return sendRes(404, '{ error: true, message: "Hello World!." }');
};
const sendRes = (status, body) => {
    var response = {
        statusCode: status,
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "OPTIONS,POST",
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
        },
        body: body
    };
    return response;
};