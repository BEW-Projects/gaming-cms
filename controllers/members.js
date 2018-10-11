import Member from '../models/member'

// creates a member and returns new member object, Sets req.session.memberId
exports.create = (req, res) => {
    Member.register(req.body).then((member) => {
        if(member.reasons) {
            res.status(200).send({
                reasons: member.reasons
            })
        } else {
            req.session.member = {}
            req.session.member.memberId = member._id
            req.session.member.role = member.role
            req.session.member.screenName = member.screenName
            exports.setStatus(member._id, 'Available').then((status) => {
                req.session.member.status = status
            })
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

// logout member by destroying session
exports.logout = (req, res) => {
    req.session.destroy()
    res.status(200).send()
}

// log member in and set session
exports.login = (req, res) => {
    Member.authenticate(req.body.email, req.body.password).then((member) => {
        if(member.reason) {
            res.status(200).send({
                reason: member.reason
            })
        } else {
            req.session.member = {}
            req.session.member.memberId = member._id
            req.session.member.role = member.role
            req.session.member.screenName = member.screenName
            exports.setStatus(member._id, 'Available').then((status) => {
                req.session.member.status = status
            })
            res.status(200).send()
        }
    })
}

// Sets member status and current datetime
exports.setStatus = async function(id, status) {
    try {
        await Member.updateOne({ _id: id }, {
            status: status,
            lastStatus: new Date()
        })
        return status
    } catch (err) {
        return console.error(err.message)
    }
}
