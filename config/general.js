const nodeMailer = require('nodemailer');

exports.jwtConfig = {
    secret : 'schoolManagement'
}

exports.notesAttributes = [
    'id',
    'title',
    'teacher_id',
    'description',
    'updatedAt',
    'createdAt'
]

exports.userAttributes = [
    'id',
    'first_name',
    'last_name',
    'email',
    'is_active',
    'user_type',
    'parent_id',
]

exports.complaintAttributes = [
    'id',
    'user_id',
    'complaint',
    'is_active'
]

exports.transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shivani.devtest12@gmail.com',
        pass: 'lanetteam1'
    }
});

exports.userEmailInfo = {
    emailInfo: 'shivani.devtest12@gmail.com'
}