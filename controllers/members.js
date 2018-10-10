import Member from '../models/member'

// creates a member and returns new member object, Sets req.session.memberId
exports.create = (req, res) => {
    Member.register(req.body).then((member) => {
        if(member.reasons) {
            res.status(200).send({
                reasons: member.reasons
            })
        } else {
            req.session.memberId = member._id
            res.status(200).send()
        }
    }).catch((err) => {
        console.error(err.message)
    })
}

// renders new member form
exports.new = (req, res) => {
    res.render('modules/members/members-new', { ip: req.ip })
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.status(200).send()
}

// find one member by query and return that member
exports.getOne = async (query) => {
    try {
        return
    } catch (err) {
        return console.error(err.message)
    }
}

// Export our model to be used by the router if needed
exports.Member = Member
