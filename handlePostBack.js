function textPostback() {
    'use strict'

    let messageData,
        senderFile   = require('./sender'),
        senderMsg    = new senderFile()

    this.handlePostback = (event, sender) => {

        switch (event.postback.payload) {

          case 'GET STARTED':
            //messageData = quickAction.handleAction('maintenanceOrStatus')
            messageData = {text: 'Olá, digite o celular usado no cadastro.'}
            break

          default:
            messageData = {
              text: 'O que você clicou? Não reconheço essa ação.'
            }

        }

        // send the result
        senderMsg.send(sender, messageData)

    }

}

module.exports = textPostback
