// greetings
function greet(sender, text) {
  'use strict'

  let request = require('request'),
      token       = require('./token'),
      tokenValue  = new token(),
      greet = "Olá!"
      
  this.greetings = function(sender, text){

    request({
        url: 'https://graph.facebook.com/v2.6/me/thread_settings',
        qs: {
            access_token: token
        },
        method: 'POST',
        json: {
            recipient: {
                id: sender
            },
            setting_type: 'greeting',
            greeting:{
              text: greet
            }
        }

    }, function(error, response, body) {
        if (error) {
          console.log('Error:', error)
        } else if (response.body.error) {
          console.log('Error:', response.body.error)
        }
    })

  }

}

module.exports = greet
