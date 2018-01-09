var express = require('express'),
    path=require('path'),
    app=express(),
    rootPath = path.normalize(__dirname + ' /../' ),
    bodyParser=require('body-parser');

var port = process.env.PORT || 9000;

const init = () => {
    app.use(express.static(rootPath + '/dist'));
    
    app.get('*', function(req, res) {
        res.sendFile(rootPath + '/app/index.html')
    });
    
    app.listen(port);
    
    console.log(' server running on port'  + port);
    
  };

module.exports = init;