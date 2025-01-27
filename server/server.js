var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jysonmuchiri@gmail.com',
    pass: 'cahg adep gjkg zgft'
  }
});

var mailOptions = {
  from: 'jysonmuchiri@gmail.com',
  to: 'zhaviawamuyu@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});