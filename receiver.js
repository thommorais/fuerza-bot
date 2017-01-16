function messenger() {

    'use strict'

    let attachments = require('./handleAttachments'),
        postbacks   = require('./handlePostback'),
        textMessage = require('./handleTxt'),
        buttons     = require('./handleActions'),
        senderFile  = require('./sender'),

        attachment  = new attachments(),
        postbacker  = new postbacks(),
        txt         = new textMessage(),
        quickAction = new buttons(),
        senderMsg   = new senderFile(),

        messageData = {text: '😛'}


    // this receive messagens and kind deal with that
    this.receive = (req, res) => {

        for (let x = 0; x < req.body.entry.length; x++) {

            let messaging_events = req.body.entry[x].messaging

            for (let i = 0; i < messaging_events.length; i++) {

                let event = req.body.entry[0].messaging[i]
                    sender = event.sender.id
                    stamp = event.timestamp

                // if user send a message
                if (event.message) {
                    // if it is an attachment (location or media)
                    if (!event.message.is_echo) {

                      if (event.message.attachments)
                          attachment.handler(event.message.attachments[0], sender)
                      else
                          txt.handler(event, sender)

                    }

                    // if is postback
                } else if (event.postback) {
                  postbacker.handler(event)
                }
            }
        }
        res.sendStatus(200)
    }

}

module.exports = messenger
