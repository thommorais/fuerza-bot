function sender() {
  'use strict'

  let request       = require('request'),
      token         = require('./token'),
      tokenValue    = new token()

  // this send messages to the user
  this.send = (sender, text) => {

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: tokenValue.tokenVar()
        },
        method: 'POST',
        json: {
            recipient: {
                id: sender
            },
            message: text
        }

    }, function(error, response, body) {
        if (error) {
            // console.log('Error: sendText', error + "<-")
        } else if (response.body.error) {
            //  console.log('Error:  sendText', response.body.error)
        }
    })
  }

}

module.exports = sender
