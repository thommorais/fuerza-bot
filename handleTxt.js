function textMessages() {
    'use strict'

    // handle attachments (images, location, ...)
    this.handleMessage = (event, sender) => {
      let messageData
      let msg = event.message

          // console.log('👉', value)

          if (msg.quick_reply) {

              if (msg.quick_reply.payload) {
                  switch (msg.quick_reply.payload) {

                  case 'pick_profissional':
                      messageData = quickAction.handleAction('interestArea', sender)
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

    }
}

module.exports = textMessages
