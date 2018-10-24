// var kue = require('kue')
//   , queue = kue.createQueue();

// // for (let i = 0; i < 10; i++) {
//   var job = queue.create('email', {
//     title: 'welcome email for tj'
//   , to: 'tj@learnboost.com'
//   , template: 'welcome-email'
// }).save( function(err){
//    if( !err ) console.log( job.id );
// });
// // }

// queue.process('email', function(job, done){
//   console.log(job.id)
//   done()
// });

// kue.app.listen(3001)