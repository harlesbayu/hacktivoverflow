const CronJob = require('cron').CronJob;
const User = require("../models/user")
const sgMail = require('@sendgrid/mail');
var kue = require('kue')
  , queue = kue.createQueue();

module.exports = function checkContent () {
  new CronJob('* 0 10 * * 5', function() {
    User.find()
      .then((users) => {

        // console.log(users)
        for(let i = 0; i < users.length; i++) {

          var job = queue.create('email', {
            to: `${users[i].email}`, 
            from: 'anggarabayuharles@gmail.com', 
            subject: 'Ingat waktu ingat ibadah',
            text: 'Jangan lupa shalat jumat',
          }).save( function(err){
            // if( !err ) console.log( job.id );
          });
        
          queue.process('email', function(job, done){
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
              to: `${job.data.to}`,
              from: `${job.data.from}`,
              subject: `${job.data.subject}`,
              text: `${job.data.text}`,
              // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            };
            sgMail.send(msg);
            done()
          });
  
        }

        // console.log(questions)
        // console.log(questions.length)
        // for(let i = 0; i < questions.length; i++) {
          // console.log(questions[i].downvote.length)
          // if(questions[i].downvote.length == 3){

            // Question.findByIdAndDelete(questions[i]._id)
            // .then(question => {
            //   Answer.deleteMany({ _id: { $in: question.answers } })
            //     .then(result => {})
            //     .catch(err => {});

            //   res.status(201).json({
            //     question,
            //     message: `delete ${question.title} success`
            //   });
            // })
            // .catch(err => {
            //   res.status(404).json({ err });
            // });

      //     }
      //   }
      })
      .catch((err) => {
        console.log(err)
      })
  }, null, true, 'Asia/Jakarta');
}
