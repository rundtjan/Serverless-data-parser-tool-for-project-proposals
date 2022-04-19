const nodeCache = require('node-cache')

const slackService = ({ slackClient }) => {
  const slackCache = new nodeCache({ stdTTL: 600 })

  /**
   * Get's all users from the workspace from Slack API and sets them to cache for quicker code.
   * @returns List of Slack user objects in the form of {id, realname, username}
   */
  const getUsers = async () => {
    const users = []
    let apiResult = undefined
    try {
      const cacheResult = await slackCache.get('users')
      if (!cacheResult) {
        const newApiResult = await slackClient.users.list({})
        const setCacheSuccess = slackCache.set('users', newApiResult)
        if (!setCacheSuccess) throw new Error('set Cache error in getUsers')
        
        apiResult = newApiResult
      } else apiResult = cacheResult
      
      apiResult.members
        .filter((elem) => !elem.is_bot)
        .forEach((elem) =>
          users.push({ id: elem.id, real_name: elem.real_name, username: elem.name })
        )
    } catch (error) {
      throw new Error(`Error in getUsers: ${error}`)
    }
    return users
  }

  /**
   * Get's all users from the workspace from Slack API and sets them to cache for quicker code.
   * @returns List of Slack channel objects in form {name, id}.
   */
  const getChannels = async () => {
    let channels = []
    try {
      const cacheResult = await slackCache.get('channels')
      if (!cacheResult) {
        const newApiResult = await slackClient.conversations.list({types: 'public_channel,private_channel'})
        console.log('newApiResult: ', newApiResult)
        newApiResult.channels.filter((elem) => elem.is_channel).forEach((elem) => channels.push({name: elem.name, id: elem.id}))
        const setCacheSuccess = slackCache.set('channels', channels)
        if (!setCacheSuccess) throw new Error('set Cache error in getChannels')
      } else{
        channels = cacheResult
        console.log('cache result: ', channels)
      }
      return channels
    } catch (error) {
      throw new Error(`Error in getChannels: ${error}`)
    }
  }

  /**
   * Get's channel names from Slack API.
   * @returns List of Slack channels names.
   */
  const getChannelNames = async () => {
    const channels = []
    try {
      const result = await slackClient.conversations.list({types: 'public_channel,private_channel'})
      console.log(result)
      result.channels.filter((elem) => elem.is_channel).forEach((elem) => channels.push(elem.name))
    } catch (error) {
      throw new Error(`Error in getChannels: ${error}`)
    }
    return channels
  }

  /**
   * Get's channel Id from Slack API.
   * @returns list of Slack channel id's.
   */
  const getChannelIds = async () => {
    const channels = []
    const result = await slackClient.conversations.list({types: 'public_channel,private_channel'})
    result.channels.filter((elem) => elem.is_channel).forEach((elem) => channels.push(elem.id))
    return channels
  }

  /**
   * Get's all messages from the channel.
   * @param {String} channelId which channels messages are wanted.
   * @returns List of message objects from Slack.
   */
  const getChannelMessages = async (channelId) => {
    try {
      const apiResult = await slackClient.conversations.history({
        channel: channelId,
      })
      return apiResult.messages
    } catch (error) {
      throw new Error(`Error in getChannelMessages: ${error}`)
    }
  }

  /**
   * Gets a Slack message and all of it's replies by channel Id and timestamp.
   * @param {Object} args In the form of {channel: CHANNEL_ID, ts: THREAD_TIMESTAMP}
   * @returns All messages from the desired thread
   */
  const getThreadMessages = async (args) => {
    try {
      const apiResult = await slackClient.conversations.replies(args)
      return apiResult.messages
    } catch (error) {
      throw new Error(`Error in getThreadMessages: ${error}`)
    }
  }

  /**
   * Gets a single Slack message. 
   * @param {String} messageTs Timestamp of a single message.
   * @param {String} channelId Channel id of the channel where the message is from.
   * @returns One message object from Slack.
   */
  const getOneMessageByTs = async (messageTs, channelId) => {
    try {
      const apiResult = await slackClient.conversations.history({
        channel: channelId,
        latest: messageTs,
        inclusive: true,
        limit: 1
      })
      return apiResult.messages[0]
    } catch (error) {
      throw new Error(`Error in getOneMessge: ${error}`)
    }
  } 

  /**
   * Gets all the messages/responses from a thread from the channel.
   * @param {String} channelId Id of the channel where the thread is.
   * @param {Object} ts_array array of timestamps.
   * @returns List of Slack message objects.
   */
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

  /**
   * Not implemented.
   * @param {String} channelId 
   * @returns 
   */
  const getChannelWithParameters = async (channelId) => {
    let messages = []
    console.log('Not implemented ', channelId)
    return messages
  }

  /**
   * Gets every message from a single user including thread responses.
   * @param {String} id Id of the user whos messages are wanted.
   * @returns List of Slack Message objects.
   */
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

  /**
   * Sends a message with text to a Slack channel.
   * @param {String} channelId to which channel the message will be sent.
   * @param {String} text the content of the message.
   */
  const sendMessage = async (channelId, text) => {
    const result = await slackClient.chat.postMessage({
      channel: channelId,
      text: text,
    })

    console.log('sendMessage : ', channelId, text)
    console.log('Result : ', result)
  }

  const sendMessageBlocks = async (channelId, blocks) => {
    const result = await slackClient.chat.postMessage({
      channel: channelId,
      blocks: blocks,
    })
    console.log(result)
  }

  const replyMessage = async (id, ts, text) => {
    try {
      const result = await slackClient.chat.postMessage({
        channel: id,
        thread_ts: ts,
        text: text
      })
      console.log(result)
    }
    catch (error) {
      console.error(error)
    }
  }

  const replyMessageBlocks = async (id, ts, blocks) => {
    try {
      const result = await slackClient.chat.postMessage({
        channel: id,
        thread_ts: ts,
        blocks: blocks
      })
      console.log(result)
    }
    catch (error) {
      console.error(error)
    }
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
    sendMessage,
    getAllThreadsMessages,
    replyMessage,
    sendMessageBlocks,
    replyMessageBlocks,
    getOneMessageByTs
  })
}

module.exports = { slackService }
