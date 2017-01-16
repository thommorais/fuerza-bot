'use strict'

function postback() {

    let senderFile   = require('./sender'),
        getFireFile  = require('./getFromFirebase'),
        senderMsg    = new senderFile(),
        getFire      = new getFireFile()



    this.handler = (event) => {

        switch (event.postback.payload) {

          case 'GET STARTED':
            //messageData = quickAction.handleAction('maintenanceOrStatus')
            senderMsg.send(sender, {text: 'Olá digite o numero do telefone usado no cadastro'})
            break

          case 'statusOfmaintenance' :
            //messageData = quickAction.handleAction('maintenanceOrStatus')

            getFire.maintenance(sender).then((response) => {

              let messageData = {
                    message: {
                        attachment: {
                          type: "template",
                          payload: {
                            template_type: "generic",
                            elements: []
                          }
                        }
                    }
                  }

              Object.keys(response.maintenance).forEach((key) => {

                messageData.message.attachment.payload.elements.push({
                      title: response.maintenance[key].title,
                      subtitle: response.maintenance[key].description,
                      // item_url: "https://www.oculus.com/en-us/rift/",
                      // image_url: "http://messengerdemo.parseapp.com/img/rift.png",
                      buttons: [{
                        type: 'postback',
                        title: 'Ver andamento',
                        payload: response.maintenance[key].id
                      }]
                })

              })

              senderMsg.send(sender, messageData.message)

            })

            break

          case 'maintenance' :
            senderMsg.send(sender, {text: 'No que você gostaria de realizar a manutenção? (Ex: porta, janela, torneira, etc.)'})
            maintenanceMode = true
            break

          default:
            getFire.maintenanceStatus(event.postback.payload).then((response) => {
              senderMsg.send(sender, response.message)
            })
            break

        }

    }

}

module.exports = postback
