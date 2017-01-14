function textMessages() {
    'use strict'

    let senderFile  = require('./sender'),
        getFireFile = require('./getFromFirebase'),
        addFireFile = require('./addToFirebase'),
        validator   = require('./validate'),
        buttons     = require('./handleActions'),

        senderMsg   = new senderFile(),
        getFire     = new getFireFile(),
        addFire     = new addFireFile(),
        validate    = new validator(),
        quickAction = new buttons()



    let switcher = (msg, sender) => {

        if (msg.quick_reply && msg.quick_reply.payload) {

            switch (msg.quick_reply.payload) {

                case 'getMaintenance':
                    messageData = {
                        text: 'Procurar apartamento vinculado ao usuário por telefone'
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
                    break

            }

        }

        if (msg.text) {
            senderMsg.send(sender, {
                text: '💪'
            })
        }

    }

    // validate user
    this.handleMessage = (event, sender) => {

        let messageData = {},
            msg = event.message

        getFire.userExist(sender, 'indexes').then((user) => {

            if (user) {
                switcher(msg, sender)

            } else if(msg.text && !isNaN(msg.text) ){

              validate.phonePromise(msg.text).then((response) => {

                getFire.userExist(msg.text, 'users').then((userExist) => {

                  if (userExist) {

                    addFire.newSender(msg.text, sender)
                    addFire.sender(msg.text, sender)
                    addFire.active(msg.text)
                    senderMsg.send(sender, {text: '👍'})
                    senderMsg.send(sender, quickAction.handleAction('maintenanceOrStatus'))

                  }else{

                    senderMsg.send(sender, {text: 'Não consegui encontrar esse telefone no nosso banco de dados'})

                  }

                })

              }, (err) =>{
                  senderMsg.send(sender, {text: err})
              })

          }else{

            senderMsg.send(sender, {text: 'Isto não é um número'})

          }

        })

    }
}

module.exports = textMessages
