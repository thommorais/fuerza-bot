function attachments() {
    'use strict'

    let messageData

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



    }

}

module.exports = attachments
