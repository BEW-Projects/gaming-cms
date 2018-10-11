import Chat from '../models/chat'

exports.getAll = (req, res) => {
    Chat.find().limit(100).then((chats) => {
        res.status(200).send(chats)
    }).catch((err) => { console.error(err.message) })
}

// Export our model to be used by the router if needed
exports.Chat = Chat
