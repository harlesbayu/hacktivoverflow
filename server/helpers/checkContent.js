const CronJob = require('cron').CronJob;
const Question = require("../models/questions")

module.exports = function checkContent () {
  new CronJob('* * * * * *', function() {
    Question.find()
      .then((questions) => {
        // console.log(questions)
        // console.log(questions.length)
        for(let i = 0; i < questions.length; i++) {
          // console.log(questions[i].downvote.length)
          if(questions[i].downvote.length == 3){

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

          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, null, true, 'Asia/Jakarta');
}
