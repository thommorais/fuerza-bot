var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    workMessages  = require('./receiver'),
    getStarted    = require('./getStartedButton'),
    admin         = require('firebase-admin'),

    getStartedBtn = new getStarted(),
    messenger     = new workMessages()

    // Conect to firebase
    fire = admin.initializeApp({
        credential: admin.credential.cert('./firebase-cert.json'),
        databaseURL: "https://fuerza-lab.firebaseio.com/"
    })

app.use(bodyParser.json())

// index page
app.get('/', function(req, res) {
  res.send('Hello World!')
})

// terms
app.get('/terms', function(req, res) {
  res.send('This app is beta version')
})

// for validation
app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === 'localhost') {
      res.send(req.query['hub.challenge'])
  } else {
      console.error("Failed validation. Make sure the validation tokens match.");
      res.sendStatus(403);
  }
})

// showing get started button
getStartedBtn.getStarted()

// send messenges
app.post('/webhook', function(req, res) {
    messenger.receive(req, res)
})

// listening
app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})
