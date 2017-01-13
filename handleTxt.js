function textMessages() {
    'use strict'

    let senderFile   = require('./sender'),
        senderMsg    = new senderFile()


    // handle attachments (images, location, ...)
    this.handleMessage = (event, sender) => {

      let messageData = {},
          msg = event.message

          console.log('👉', msg)

      if (msg.quick_reply) {

        if (msg.quick_reply.payload) {

            switch (msg.quick_reply.payload) {

            case 'getMaintenance':
                messageData = {
                    text: 'Solicitar Manutenção'
                }
                break

            case 'getStatus':
                messageData = {
                    text: 'Acompanhar Manutenção'
                }
                break

            default:
                messageData = {
                    text: '😊'
                }
            }
        }

      } else {

        switch (msg.text) {

          case 'Olá':
              messageData = { text: 'Olá'}
              break

          case 'Oi':
              messageData = {text: 'Oi'}
              break

          default:
              messageData = {
                  text: 'Um texto qualquer '
              }

        }

      }

      // send the result
      senderMsg.send(sender, messageData)

    }
}

module.exports = textMessages
