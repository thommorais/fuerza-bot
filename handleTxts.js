function textMessages() {
    'use strict'

    let senderFile  = require('./sender'),
        getFireFile = require('./getFromFirebase'),
        addFireFile = require('./addToFirebase'),
        validator   = require('./validate'),
        buttons     = require('./handleActions'),
        menus       = require('./menu'),
        maintenanceMethod = require('./maintenanceMethod'),

        senderMsg   = new senderFile(),
        getFire     = new getFireFile(),
        addFire     = new addFireFile(),
        validate    = new validator(),
        show        = new menus(),
        quickAction = new buttons(),
        maintenance = new maintenanceMethod()

    let switcher = (msg, sender) => {

        if (msg.quick_reply && msg.quick_reply.payload) {

            switch (msg.quick_reply.payload) {

                case 'getMaintenance':
                      senderMsg.send(sender, {text: 'No que você gostaria de realizar a manutenção? (Ex: porta, janela, torneira, etc.)'})
                      maintenanceMode = true
                    break

                case 'getStatus':
                      getFire.maintenance(sender).then((response) =>{

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
                                item_url: 'http://images.locanto.ae/1162282060/Home-and-Building-Maintenance-Service-and-we-take-yearly-contrac_3.jpg',
                                image_url: 'http://images.locanto.ae/1162282060/Home-and-Building-Maintenance-Service-and-we-take-yearly-contrac_3.jpg',
                                buttons: [{
                                  type: 'postback',
                                  title: 'Ver andamento',
                                  payload: response.maintenance[key].stamp,
                                }]
                          })

                        })

                        senderMsg.send(sender, messageData.message)

                      })
                    break

                default:
                    senderMsg.send(sender, {text: 'Ver Status'})
                    break

            }

        }

        if (msg.text) {

          if(maintenanceMode){
            maintenance.request(msg.text)
          }

          else{
              switch (msg.text.toLowerCase()) {

              case 'menu':
                show.menu()
                break;

              case 'manutenção' :
                senderMsg.send(sender, {text: 'No que você gostaria de realizar a manutenção? (Ex: porta, janela, torneira, etc.)'})
                maintenanceMode = true
                break

              case 'status' :
                senderMsg.send(sender, {text: msg.text})
                break

              case 'andamento' :
                senderMsg.send(sender, {text: msg.text})
                break

              case 'soparateste' :
                senderMsg.send(sender, {text: 'Digite um numero'})
                testing = true
                break

              default:
                senderMsg.send(sender, {text: 'Ooops, não entendi isso, tente o menu ;)'})
                break

            }

            if(testing){
              senderMsg.send(sender, {text: msg.text})
              addFire.justForTest(msg.text)
              testing = false
            }

          }


        }

    }

    // validate user
    this.handler = (event, sender) => {

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
                    // senderMsg.send(sender, {text: 'Olá Gostaria'})
                    senderMsg.send(sender, quickAction.handler('maintenanceOrStatus'))

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
