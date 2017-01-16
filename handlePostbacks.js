'use strict'

function postback() {

    let senderFile   = require('./sender'),
        getFireFile  = require('./getFromFirebase'),
        senderMsg    = new senderFile(),
        getFire      = new getFireFile()



    this.handler = (event) => {
        console.log(event.postback.payload)
        switch (event.postback.payload) {

          case 'GET STARTED':
            senderMsg.send(sender, {text: 'Olá digite o numero do telefone usado no cadastro'})
            break

          case 'statusOfmaintenance' :
            //messageData = quickAction.handler('maintenanceOrStatus')

            getFire.maintenance(sender).then((response) => {

                if(response){

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
                          image_url: "http://parque-botanico.com/mt-content/uploads/2016/05/maintenance.jpg",
                          buttons: [{
                            type: 'postback',
                            title: 'Ver andamento',
                            payload: response.maintenance[key].id
                          }]
                    })

                  })

                  senderMsg.send(sender, messageData.message)

                }else{
                  senderMsg.send(sender, {text: 'Não há nenhum chamado em aberto.'})
                }

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
