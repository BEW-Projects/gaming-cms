import Chat from '../models/chat'

// get all chats with a limit of 100
exports.get = (req, res) => {
    Chat.find().limit(100).then((chats) => {
        res.status(200).send(chats)
    }).catch((error) => {
        res.status(400).send(error.message)
        console.error(error.message)
    })
}
