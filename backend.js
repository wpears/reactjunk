var fs = require('fs');
var http = require('http');
var path = require('path');

var server = http.createServer(function(request, response) {
  var url = request.url;
  if(url =='/comments.json'){
    fs.readFile('comments.json',function(err,file){
      if(request.method == 'GET'){
        console.log("Getting json");
        return response.end(file);
      }

      parsePost(request,cb);

      function cb(formData){
        var json = JSON.parse(file); 

        formData = formData.replace('+', ' ');
        var pairs = formData.split('&')
        var data = {};
        
        pairs.forEach(function(v){
          var arr = v.split('=');
          console.log(arr);
          data[arr[0]] = arr[1];
        });

        json.push(data);

        fs.writeFile('comments.json', json, function(err){
          console.log("Updated comments to ",json);
          response.writeHead(201);
          response.end('Got it');
        });
      }
    }) 
  }else{
    if(url == '/') url = '/index.html';
    url = path.join(__dirname, url); 
    console.log('returning %s', url);
    fs.createReadStream(url).pipe(response);  
  }
});
server.listen(8080, 'localhost');

function parsePost(req, callback) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    callback(data);
  });
}
