function showMenu() {
  'use strict'

  let request     = require('request'),
      token       = require('./token'),
      tokenValue  = new token()

  this.menu = function() {

    request({
        url: 'https://graph.facebook.com/v2.6/me/thread_settings',
        qs: {
            access_token: tokenValue.tokenVar()
        },
        method: 'POST',
        json:{
            setting_type : 'call_to_actions',
            thread_state : 'existing_thread',
            call_to_actions:[
                {
                  "type":"postback",
                   "title":"Solicitar Manutenção",
                   "payload":"maintenance"
                },
                {
                  "type":"postback",
                   "title":"Andamento de manutenção",
                   "payload":"statusOfmaintenance"
                }
              ]
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

module.exports = showMenu
