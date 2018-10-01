// Initialize the Amazon Cognito credentials provider
AWS.config.region = '<AWS_Region>'; // Provide Your Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: '<Cognito Identity Pool ID>', //Provide the Identity Pool ID
});

var lambda = new AWS.Lambda({region: '<AWS_REGION>', apiVersion: '2015-03-31'}); //Provide Your Region

function returnServerList() {
  document.getElementById('submitButton').disabled = true;
  lambda.invoke({
    FunctionName: 'helloworld'
  }, function(err, data) {
    var result = document.getElementById('result');
    if (err) {
      console.log(err, err.stack);
      result.innerHTML =
        '<div class="alert alert-danger">' + err + '</div>';
    } else {
      pullResults = JSON.parse(data.Payload); // Value will be in pull results variable
      var len = Object.keys(pullResults).length;

      document.write(pullResults);
    
    }
  });
}

var form = document.getElementById('greetingsForm');
form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  returnServerList();
});