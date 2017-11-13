import request from 'request'

const Store = () => {
    return {
        send({ models, collections, sender, recipient, api, template }) {
            const data = {
                api_key: api.key,
                attributes: Object.keys(models) // Netcore require the payload to be an array
                    .reduce((a, b) => {
                        a[b] = [models[b]]
                        return a
                    }, {}),
                email_details: {
                    content: '',
                    from: sender.email,
                    fromname: sender.name,
                    subject: sender.subject
                },
                trigdata: collections,
                recipients: [recipient.email],
                settings: {
                    template: template.id
                },
                tags: api.tags,
                // 'X-APIHEADER': ['ID1', 'ID2'],
                // 'X-APIHEADER_CC': ['A', 'B']
            }

            const options = {
                method: 'POST',
                uri: api.url,
                headers: {
                    'cache-control': 'no-cache',
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8;',
                    'accept-charset': 'utf-8'
                },
                json: true,
                form: {
                    data: JSON.stringify(data)
                }
            }

            return new Promise((resolve, reject) => {
                request(options, (error, response, body) => {
                    console.log('error:', error)
                    console.log('body:', body)
                    console.log('response:', response.statusCode)
                    error ? reject(error) : resolve(body)
                })
            })
        }
    }
}

export default Store