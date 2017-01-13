function quickReplies() {
    'use strict'

    // this function is to add users
    this.handleAction = function(what, user) {

        let text = {}

        switch (what) {

            case 'maintenanceOrtour':
                text = {
                    text: 'Olá, gostaria de solicitar algum reparo ou então acompanhar o adamento de algum já solicitado?',
                    quick_replies: [{
                            content_type: 'text',
                            title: 'Solicitar',
                            payload: 'getMaintenance'
                        },
                        {
                            content_type: 'text',
                            title: 'Acomanhar andamento',
                            payload: 'getStatus'
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
