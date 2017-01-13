
function getStartedButton() {
  'use strict'

  let request     = require('request'),
      token       = require('./token'),
      tokenValue  = new token()

  this.getStarted = function(sender, text){

    request({
        url: 'https://graph.facebook.com/v2.6/me/thread_settings?access_token='+ tokenValue.tokenVar(),
        method: 'POST',
        json: {
          "setting_type":"call_to_actions",
          "thread_state":"new_thread",
          "call_to_actions":[
            {
              'payload':'GET STARTED'
            }
          ]
        }
    },function (error, response, body){

          // if (!error && response.statusCode == 200){
          //   console.log('deu certo')
          // }
        }
    )


  }

}

module.exports = getStartedButton
