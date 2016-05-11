var photoCtrl = require('./photo.server.ctrl')

app.post('/api/newimage', photoCtrl.postImage);
