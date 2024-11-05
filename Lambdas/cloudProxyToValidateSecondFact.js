/**
 * Title: Proxy call to cloud to second factor authentication
 * Author: Sri Ramya Basam
 * Date: 2022/11/09
 * Availability: https://axios-http.com/docs/intro
 */
const axios = require('axios');

exports.handler = async (event) => {
    // TODO implement
    console.log(event);
    
    var payload = JSON.parse(event.body);
    console.log(payload);
    console.log(payload.body);
    const response = await axios.post('https://us-central1-csci5410-sriramya.cloudfunctions.net/validateSecondFactor', payload.body, {timeout:20000000});
    return response.data;
};


