function attachments() {
    'use strict'

    let messageData,
        senderFile   = require('./sender'),
        senderMsg    = new senderFile()

    // handle attachments (images, location, ...)
    this.handleAttachments = (attachment, sender) => {

        switch (attachment.type) {

            case 'location':
                messageData = { text: '🏡'}
                break

            case 'image':
                messageData = {  text: 'Bonito' }
                break

            default:
                messageData = quickAction.handleAction('cityAndRegion', sender)
        }

        // send the result
        senderMsg.send(sender, messageData)

    }

}

module.exports = attachments
