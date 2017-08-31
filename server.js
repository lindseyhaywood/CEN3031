var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;


var listingData;


var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  if(parsedUrl.pathname == '/listings'){

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(listingData));
    response.end();
  }

  else{

    response.writeHead(404);
    response.end('Bad gateway error');
  }

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 
    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
};

fs.readFile('listings.json', 'utf8', function(err, data) {

  if(err) throw err;
  listingData = JSON.parse(data);
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
});

var server = http.createServer(requestHandler);


server.listen(port, function() {
    //once the server is listening, this callback function is executed
    console.log('Server listening on: http://127.0.0.1:' + port);
  });
  //console.log('Is the server started?');