const express = require('express')
const app = express();
import * as firebase from 'firebase-admin';

const decode = (str) => (str || '').replace(/\\n/g, '\n');
const config = JSON.parse(process.env.FIREBASE_CONFIG)
const admin = firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: config.project_id,
    clientEmail: config.client_email,
    privateKey: decode(config.private_key)
  }),
  storageBucket: process.env.BUCKET_NAME
}, 'image')

app.get("/images/:imageName", (req, res) => {
  const bucket = admin.storage().bucket()
  bucket.file(`/og_images/${req.params.imageName}`).download().then((a) => {
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Cache-Control': 'max-age=1209600, s-maxage=1209600'
    })
    res.end(a[0])
  })
})

module.exports = {
  path: '/api',
  handler: app
}