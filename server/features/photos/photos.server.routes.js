var s3Ctrl = require('../s3/s3.server.ctrl')

app.post('/api/v1/photos', s3.saveImage);
