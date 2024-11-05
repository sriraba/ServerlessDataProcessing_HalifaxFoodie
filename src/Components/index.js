const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


exports.createProfile = functions.auth.user().onCreate((user) => {

  var userObject = {
     displayName : 'hbnm',
     email : 'sdfghj',
  };

  return admin.firestore().doc('usersSecondFactorLookup/'+'12345').set(userObject);
 // or admin.firestore().doc('users').add(userObject); for auto generated ID 

});