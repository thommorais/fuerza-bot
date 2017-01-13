function quickReplies() {
    'use strict'

    // this function is to add users
    this.handleAction = function(what, user) {

        let text = {}

        switch (what) {

            case 'professionalOrEnterprise':
                text = {
                    text: 'Olá, você é um profissional ou uma empresa? ',
                    quick_replies: [{
                            content_type: 'text',
                            title: 'Profissional',
                            payload: 'pick_profissional'
                        },
                        {
                            content_type: 'text',
                            title: 'Empresa',
                            payload: 'pick_empresa'
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
