/**
 * Title: Confirm Users At Pre-Signup
 * Author: Sri Ramya Basam
 * Date: 2022/11/09
 * Availability: https://docs.aws.amazon.com/cognito/latest/developerguide/signing-up-users-in-your-app.html
 */
exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};

exports.handler = (event, context, callback) => {

    // Confirm the user
        event.response.autoConfirmUser = true;
    // Set the email as verified if it is in the request
    if (event.request.userAttributes.hasOwnProperty("email")) {
        event.response.autoVerifyEmail = true;
    }
    // Set the phone number as verified if it is in the request
    if (event.request.userAttributes.hasOwnProperty("phone_number")) {
        event.response.autoVerifyPhone = true;
    }
    callback(null, event);
};

const callback = (err, resp) => {
  if (err) {
    process.stdout.write(`${err}\n`);
  } else {

    const userPoolId = resp.UserPool.Id;

    // the lambdas must have a permission attached that allows them to interact
    // directly with cognito
    const generateLambdaPersmission = (userPoolName, lambdaName) => {
      return {
        Action: 'lambda:InvokeFunction',
        Principal: 'cognito-idp.amazonaws.com',
        SourceArn: `arn:aws:cognito-idp:${awsConfig.REGION}:${awsConfig.AWS_ACCOUNT_ID}:userpool/${userPoolId}`,
        FunctionName: getArn(lambdaName),
        StatementId: `${stage}1`
      };
    };

    lambda.addPermission(generateLambdaPersmission(userPoolId, 'preSignUp'), (err, resp) => {
      if (err) {
        process.stdout.write(`error attaching permission to lambda: ${err}`);
      }
    });

    lambda.addPermission(generateLambdaPersmission(userPoolId, 'postConfirmation'), (err, resp) => {
      if (err) {
        process.stdout.write(`error attaching permission to lambda: ${err}`);
      }
    });

    process.stdout.write(userPoolId);
  }
};