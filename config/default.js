module.exports = {
  exchange: 'night',
  queue: {
    connection: process.env.AMP_URL || 'amqp://admin:admin123@dev-yedian.chinacloudapp.cn:5672',
    channel: 'ZOO_QUEUE',
    consumerAdapters: [{
      queueName: 'task'
    }, {
      queueName: 'new'
    }]
  }
}
