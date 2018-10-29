const complaint = require('../schema/complaint.schema')
const {complaintAttributes} = require('../config/general')

exports.post = (body, done) => {
    complaint.create(body).
    then((newComplaint) => {
        done(null, newComplaint)
    }).
    catch((err) => {
        done(err)
    })
}

exports.getAllComplaints = (done) => {
    complaint.findAll({
        attributes: complaintAttributes
    }).
    then((allComplaints) => {
        done(null, allComplaints)
    }).
    catch((err) => {
        done(err)
    })
}

exports.get = (id, done) => {
    complaint.findAll({
        where: {
            user_id: id
        },
        attributes: complaintAttributes
    }).then((complaints) => {
        done(null, complaints)
    }).catch((err) => {
        done(err)
    })
}