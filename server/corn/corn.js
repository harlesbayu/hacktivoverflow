const CronJob = require('cron').CronJob;
const Question = require("../models/questions")
const mongoose = require("mongoose");
// require("dotenv").config();

mongoose.connect("mongodb://localhost/z_w4_harlesoverflow", { useNewUrlParser : false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongo connected");
});


new CronJob('* * * * * *', function() {
  
  Question.find()
  .then((questions) => {
    console.log(questions);
    
  })



  //   console.log(questions)
   
    // for(let i = 0; i < questions.length; i++) {
      
    //   if(questions[i].downvote.length == 3){

    //     Question.findByIdAndDelete(questions[i]._id)
    //     .then(question => {
    //       Answer.deleteMany({ _id: { $in: question.answers } })
    //         .then(result => {})
    //         .catch(err => {});

    //       res.status(201).json({
    //         question,
    //         message: `delete ${question.title} success`
    //       });
    //     })
    //     .catch(err => {
    //       res.status(404).json({ err });
    //     });

    //   }
    // }
  // })
  // .catch((err) => {
  //   console.log(err)
  // })
}, null, true, 'America/Los_Angeles');