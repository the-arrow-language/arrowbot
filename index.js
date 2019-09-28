const discord = require('discord.js')
const client = new discord.Client()

client.login(process.env.arrToken)

client.on('ready', () => {
  console.log(client.user.username + ' Ready...')
})

client.on('message', (msg) => {
  if (msg.content.startsWith('node ')) {
    switch (msg.content.split(' ')[1]) {
      case 'arrow' || 'arrow.js':
        const arrowRuntime = require('./src/arrow')
        msg.channel.send('Arrow Runtime v0.1.0 Loaded, Type your arrow code')
        msg.channel.awaitMessages((m) => m.author.id === msg.author.id, { max: 1 }).then((collected) => {
          if (!collected.first()) msg.channel.send('Error: No Message Collected')
          else if (collected.first().content.includes('process')) {
            msg.channel.send('Error: syntax error')
          } else {
            try {
              msg.channel.send('===============')
              arrowRuntime.runtime(collected.first().content, (err, func) => {
                if (err) msg.channel.send('Error: ' + err)
                else if (typeof func !== 'function') {
                  msg.channel.send('Error: syntax error')
                } else {
                  func(collected.first())
                }
              })
            } catch (err) {
              msg.channel.send('Error: ' + err)
            }
          }
          msg.channel.send('===============\nArrow Runtime v0.1.0 UnLoaded')
        })
        break

      case 'arrow-wtf' || 'arrow-wtf.js':
        const arrowWTFRuntime = require('./src/arrow-wtf')
        msg.channel.send('Arrow WTF Runtime v0.1.0 Loaded, Type your arrow code')
        msg.channel.awaitMessages((m) => m.author.id === msg.author.id, { max: 1 }).then((collected) => {
          if (!collected.first()) msg.channel.send('Error: No Message Collected')
          else if (collected.first().content.includes('process')) {
            msg.channel.send('Error: syntax error')
          } else {
            try {
              msg.channel.send('===============')
              arrowWTFRuntime.runtime(collected.first().content, collected.first())
            } catch (err) {
              msg.channel.send('Error: ' + err)
            }
          }
          msg.channel.send('===============\nArrow WTF Runtime v0.1.0 UnLoaded')
        })
    }
  }
})
