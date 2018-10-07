import Member from '../models/member'

// creates a member and returns new member object, Sets req.session.memberId
exports.createOne = async (data) => {
    try {
        return await Member.create(data)
    } catch (err) {
        return console.error(err.message)
    }
}

// find one member by query and return that member
exports.getOne = async (query) => {
    try {
        return
    } catch (err) {
        return console.error(err.message)
    }
}
