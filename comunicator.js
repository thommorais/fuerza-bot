function messenger() {

    'use strict'

    let request       = require('request'),
        token         = require('./token'),
        attachments   = require('./handleAttachments.js'),
        textMessages  = require('./handleTxt.js'),

        attachment  = new attachments(),
        txt         = new textMessages(),
        tokenValue  = new token(),

        messageData   = {
            text: '😛'
        }

    // this receive messagens and kind deal with that
    this.receive = (req, res) => {
        for (let x = 0; x < req.body.entry.length; x++) {

            let messaging_events = req.body.entry[x].messaging

            for (let i = 0; i < messaging_events.length; i++) {

                let event = req.body.entry[0].messaging[i],
                    sender = event.sender.id

                // if user send a message
                if (event.message) {

                    // if it is an attachment (location or media)
                    if (!event.message.is_echo) {
                        // matcher.allUsers(sender)

                        if (event.message.attachments) {
                            attachment.handleAttachments(event.message.attachments[0], sender)
                        } else {
//                            handleMessage(event, sender)
                            txt.handleMessage(event, sender)
                        }

                    }

                    // if is postback
                } else if (event.postback) {

                    switch (event.postback.payload) {

                        case 'GET STARTED':
                            messageData = quickAction.handleAction('professionalOrEnterprise')
                            break

                        default:
                            messageData = {
                                text: 'O que você clicou? Não reconheço essa ação.'
                            }

                    }
                    // send the result
                    sendText(sender, messageData)
                }
            }
        }
        res.sendStatus(200)
    }

    // this send messages to the user
    this.send = (sender, text) =>{

      let options = {
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
      }

      rp(options)
          .then(function (response) {
            userInfo    = response
          }) .catch(function (err) {
            userInfo    = err
          })

          return userInfo



    }

}

module.exports = messenger
