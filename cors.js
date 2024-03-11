var express = require('express'),
    cors = require('cors'),
    port = 4000,
    app = express();

app.use(express.static(__dirname + '/dist'));


  app.listen(port);
