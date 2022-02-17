const slackService = ({ slackClient }) => {
  // Only dependency is api client given as parameter for Dependency Injection.
  const getUsers = async () => {
    const users = []
    try {
      const apiResult = await slackClient.users.list({})
      apiResult.members
        .filter((elem) => !elem.is_bot)
        .forEach((elem) => users.push({ id: elem.id, real_name: elem.real_name, username: elem.name }))
    } catch (error) {
      throw new Error(`Error in getUsers: ${error}`)
    }
    return users
  }

  const getChannels = async () => {
    try {
      const result = await slackClient.conversations.list({})
      return result
    } catch (error) {
      throw new Error(`Error in getChannels: ${error}`)
    }
  }

  const getChannelNames = async () => {
    const channels = []
    try {
      const result = await slackClient.conversations.list({})
      result.channels
        .filter((elem) => elem.is_channel)
        .forEach((elem) => channels.push(elem.name))
    } catch (error) {
      throw new Error(`Error in getChannels: ${error}`)
    }
    return channels
  }

  const getChannelIds = async () => {
    const channels = []
    const result = await slackClient.conversations.list({})
    result.channels
      .filter((elem) => elem.is_channel)
      .forEach((elem) => channels.push(elem.id))
    return channels
  }

  const getChannelMessages = async (channelId) => {
    try {
      console.log('CHA ID: ',channelId)
      const apiResult = await slackClient.conversations.history({
        channel: channelId,
      })
      return apiResult.messages
    } catch (error) {
      throw new Error(`Error in getChannelMessages: ${error}`)
    }
  }

  // TODO: not tested
  const getThreadMessages = async (args) => {
    try {
      const apiResult = await slackClient.conversations.replies(args)
      return apiResult.messages
    } catch (error) {
      throw new Error(`Error in getThreadMessages: ${error}`)
    }
  }

  const getAllThreadsMessages = async (channelId, ts_array) => {
    let messages = []
    try {
      for (const ts of ts_array) {
        const apiResult = await slackClient.conversations.replies({
          channel: channelId,
          ts: ts,
        })
        messages = messages.concat(apiResult.messages)
      }
    } catch (error) {
      throw new Error(`Error in getAllThreadsMessages: ${error}`)
    }
    return messages
  }

  const getChannelWithParameters = async (channelId) => {
    let messages = []
    console.log('Not implemented ', channelId)
    return messages
  }

  const findAllByUser = async (id) => {
    let messages = []

    try {
      const result = await slackClient.conversations.list({})

      for (const channel of result.channels) {
        const channelMessages = await getChannelMessages(channel['id'])
        const ts = []
        channelMessages.forEach((msg) => {
          if (msg.thread_ts) ts.push(msg.ts)
          if (msg.user === id) messages.push(msg)
        })
        const threadMessages = await getAllThreadsMessages(channel['id'], ts)
        threadMessages.forEach((msg) => {
          if (msg.user === id) {
            messages.push(msg)
          }
        })
      }
    } catch (error) {
      throw new Error(`Error in findAllByUser: ${error}`)
    }

    return messages
  }

  const sendMessage = async (channelId, text) => {
    const result = await slackClient.chat.postMessage({
      channel: channelId,
      text: text
    })
  
    console.log('sendMessage : ', channelId, text)
    console.log('Result : ', result)
  }

  return Object.freeze({
    getUsers,
    getChannels,
    getChannelNames,
    getChannelIds,
    getChannelMessages,
    getChannelWithParameters,
    getThreadMessages,
    findAllByUser,
    sendMessage
  })
}

module.exports = { slackService }
