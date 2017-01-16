function quickReplies() {
    'use strict'

    // this function is to add users
    this.handler = function(what, user) {

        let text = {}

        switch (what) {

            case 'tour':
                text = {
                    text: 'Gostaria de fazer um tour?',
                    quick_replies: [{
                            content_type: 'text',
                            title: 'Sim',
                            payload: 'getTour'
                        },
                        {
                            content_type: 'text',
                            title: 'Não',
                            payload: 'getStarted'
                        }
                    ]
                }
                break

            case 'sendMaintenanceRequest':
                text = {
                    text: 'Gostaria de alterar alguma coisa?',

                    quick_replies: [{
                            content_type: 'text',
                            title: 'Não, quero enviar!',
                            payload: 'sendMaintenanance'
                        },
                        {
                            content_type: 'text',
                            title: 'Sim, vou alterar!',
                            payload: 'editMaintenanance'
                        }
                    ]
                }
                break

            default:
                text = {
                    text: 'Algo deu errado?',
                    quick_replies: [{
                        content_type: 'text',
                        title: 'Algo deu errado',
                        payload: 'pick_algoDeuErrado'
                    }]
                }

        }

        return text
    }

}

module.exports = quickReplies
