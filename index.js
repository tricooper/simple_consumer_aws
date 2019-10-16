// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});

//keep track of odds and evens
let odd = 0;
let even = 0;

// run to see if its odd or even

var isOdd = (num) => {
  return num % 2;
}

// Create the SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});


const receiveMessages = () => {
  var params = {
   AttributeNames: [
      "SentTimestamp"
   ],
   MaxNumberOfMessages: 1,
   MessageAttributeNames: [
      "All"
   ],
   QueueUrl: 'https://sqs.us-east-2.amazonaws.com/729673819913/homework6sqs'	,
   WaitTimeSeconds: 1
  };

  sqs.receiveMessage(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      var message = JSON.parse(data.Messages[0].Body).Message;
      if (isOdd(message) == 1) {
        odd ++;
      } else {
        even ++;
      }
      console.log('EVEN: ' + even);
      console.log('ODD: ' + odd);
    }
  });

}


var messageInterval = setInterval(receiveMessages, 1500);

setTimeout(() => {
  console.log('clear interval');
   clearInterval(messageInterval)
}, 100000);
