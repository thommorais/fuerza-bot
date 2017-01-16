function attachments() {
    'use strict'

    let senderFile   = require('./sender'),
        senderMsg    = new senderFile()

    // handle attachments (images, location, ...)
    this.handler = (attachment) => {

        switch (attachment.type) {

          case 'location':
              senderMsg.send(sender, {  text:  '🏡'})
              break

          case 'image':
              senderMsg.send(sender, {  text: 'Bonito' })
              break

          default:
              senderMsg.send(sender, {  text: 'Bonito' })

        }

    }

}

module.exports = attachments
