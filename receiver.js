function messenger() {

    'use strict'

    let
        attachments   = require('./handleAttachments'),
        textMessages  = require('./handleTxt'),
        buttons       = require('./handleActions'),
        firebase      = require('./addToFirebase'),
        senderFile    = require('./sender'),

        attachment  = new attachments(),
        txt         = new textMessages(),
        quickAction = new buttons(),
        database    = new firebase(),
        senderMsg   = new senderFile(),

        messageData = {text: '😛'}


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

                        if (event.message.attachments)
                            attachment.handleAttachments(event.message.attachments[0], sender)
                         else
                            txt.handleMessage(event, sender)

                    }

                    // if is postback
                } else if (event.postback) {

                    switch (event.postback.payload) {

                        case 'GET STARTED':
                            messageData = quickAction.handleAction('maintenanceOrtour')
                            database.userAdd(sender)
                            break

                        default:
                            messageData = {
                              text: 'O que você clicou? Não reconheço essa ação.'
                            }

                    }

                    senderMsg.send(sender, messageData)


                }
            }
        }
        res.sendStatus(200)
    }

}

module.exports = messenger
