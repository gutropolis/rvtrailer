const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');

var User = require('../models/user');
var Admin = require('../models/admin');
var CmsPage = require('../models/cmspage');
var ListTrailer = require('../models/product');
var Favourite = require('../models/favourite');
var Package = require('../models/package');
var Message = require('../models/message');
var NewsLetter = require('../models/newsletter');
var Rental=require('../models/rental_type');
var Feature=require('../models/feature');
var Feedback=require('../models/feedback');
var Contact=require('../models/contact');
var tempmailer = require('pug-mailer');
var m =require('../models/emailsubject');
//var app=express();
//var pug = require('pug');
//app.set('view engine', 'pug');

//var regisrterFunction = pug.compileFile('server/template/register.pug');
//var approvedFunction = pug.compileFile('server/template/approved.pug');

ratingstor:any=[];
var smtpTransport = nodemailer.createTransport({
  //pool: true,
    host: 'smtp.gmail.com', // Gmail as mail client
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'royalrajput9329@gmail.com',
        pass: 'Romanticworld12'
    }
 /* service: 'gmail',
  auth: {
      user: "royalrajput9329@gmail.com",
      pass: "Romanticworld12"
  }*/
});

//static email
router.post('/send',function(req,res){
console.log('in this api '+JSON.stringify(req.body));
var message;

  var mailOptions={
   
      to:req.body.email,
      subject :m.subject_Register,
      html :m.regisrterFunction({firstname:req.body.firstname, lastname:req.body.lastname})
 
}
var AdminmailOptions={  
    to:m.adminEmail,
    subject :m.subject_admin_reg,
    html :m.signupFunction({firstname:req.body.firstname, lastname:req.body.lastname})

}  

  smtpTransport.sendMail(mailOptions, function(error, response){
   if(error){
          console.log(error);
      res.end("error");
   }else{
          console.log("Message sent to: " + req.body.email);
      res.end("sent");
       }
});
smtpTransport.sendMail(AdminmailOptions, function(error, response){
  if(error){
         console.log(error);
     res.end("error");
  }else{
         console.log("Message sent to Admin by : " + req.body.email);
     res.end("sent");
      }
});



});

//for approved
router.post('/approvedbymail',function(req,res){
  console.log('in this api '+JSON.stringify(req.body));

    var mailOptions={
     
      
        to:req.body.email,
        subject :m.subject_approvedby,
        html :m.approvedFunction({})
   
  } 
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Approved account : " + req.body.email);
        res.end("sent");
         }
  });
  });

  //Plan Package Purchage mailing

  router.post('/planpackagemail',function(req,res){
    console.log('in this api '+JSON.stringify(req.body));
  
      var mailOptions={
       
          to:req.body.email,
          subject :m.subsubcription_plan,
          html :m.subscription({})
     
    } 
     var AdminmailOptions={
       
        
          to:m.adminEmail,
          subject :m.admin_msgsubsubcription_plan,
          html :m.subscriptionbyadmin({})
     
    } 
    smtpTransport.sendMail(AdminmailOptions, function(error, response){
      if(error){
             console.log(error);
         res.end("error");
      }else{
             console.log("Email to admin ");
         res.end("sent");
          }
   });

      smtpTransport.sendMail(mailOptions, function(error, response){
       if(error){
              console.log(error);
          res.end("error");
       }else{
              console.log("Package select by  : " + req.body.email);
          res.end("sent");
           }
    });
    });

    //Adding trailer List Mailing

    router.post('/Addlistmail',function(req,res){
      console.log('in this api '+JSON.stringify(req.body));
    
        var mailOptions={
         
            to:req.body.email,
            subject :m.addlist_submsg,
            html :m.addlist({})
       
      } 
      var AdminmailOptions={
         
        from:'ajaythakur9329@outlook.com',
       to: m.adminEmail,
          subject :m.admin_addlist_submsg,
          html :m.addlistadmin({})
     
    } 
    smtpTransport.sendMail(AdminmailOptions, function(error, response){
      if(error){
             console.log(error);
         res.end("error");
      }else{
             console.log("add trailer id  by  : " + req.body.email);
         res.end("sent");
          }
   });

        smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
                console.log(error);
            res.end("error");
         }else{
                console.log("Adding trailer by  : " + req.body.email);
            res.end("sent");
             }
      });
      });


      //Forget password for email
      router.post('/forgetpass',function(req,res){
        console.log('in this api '+JSON.stringify(req.body));
      
          var mailOptions={
           
           
              to:req.body.email,
              subject :m.forgetpass_submsg,
              html :m.forgetpass({})
         
        } 
        var AdminmailOptions={
         
          
         to: m.adminEmail,
            subject :m.admin_forgetpass_submsg,
            html :m.forgetpassbyadmin({})
       
      } 
      smtpTransport.sendMail(AdminmailOptions, function(error, response){
        if(error){
               console.log(error);
           res.end("error");
        }else{
               console.log("Forget Password  by  : " + req.body.email);
           res.end("sent");
            }
     });
          smtpTransport.sendMail(mailOptions, function(error, response){
           if(error){
                  console.log(error);
              res.end("error");
           }else{
                  console.log("Forget password by  : " + req.body.email);
              res.end("sent");
               }
        });
        });

        //Rating System

        router.post('/ratingbyemail',function(req,res){
          console.log('in this api '+JSON.stringify(req.body));
        
            var mailOptions={
             
              
                to:req.body.email,
                subject :m.rating_subject,
                html :m.rating_msg({})
           
          } 
          var AdminmailOptions={
         
          
            to: m.adminEmail,
            subject :m.rating_subject_admin,
            html :m.rating_msg_admin({})
          
         } 
         smtpTransport.sendMail(AdminmailOptions, function(error, response){
           if(error){
                  console.log(error);
              res.end("error");
           }else{
                  console.log("rating msg to admin  : " + m.adminEmail);
              res.end("sent");
               }
        });
             smtpTransport.sendMail(mailOptions, function(error, response){
              if(error){
                     console.log(error);
                 res.end("error");
              }else{
                     console.log("rating to  : " + req.body.email);
                 res.end("sent");
                  }
           });
          });

          //msgsend
          router.post('/msgbyemail',function(req,res){
            console.log('in this api '+JSON.stringify(req.body));
          
              var mailOptions={
               
                
                  to:req.body.email,
                  subject:m.msg_send +req.body.sendername,
                  html :m.msg_byemail({message:req.body.message})
             
            } 
              smtpTransport.sendMail(mailOptions, function(error, response){
               if(error){
                      console.log(error);
                  res.end("error");
               }else{
                      console.log("Msg sent to : " + req.body.email);
                  res.end("sent");
                   }
            });
            });

            //contact us mailing

            router.post('/contactusmail',function(req,res){
              console.log('in this api '+JSON.stringify(req.body));
            
                var mailOptions={
                 
                  
                    to:m.adminEmail,
                    subject :req.body.subject,
                    html :req.body.msg +' : '+ req.body.email
               
              } 
                smtpTransport.sendMail(mailOptions, function(error, response){
                 if(error){
                        console.log(error);
                    res.end("error");
                 }else{
                        console.log("Contact to admin by : " + req.body.email);
                    res.end("sent");
                     }
              });
              });


router.post('/sendmail', (req, res) => {

  var mailOptions={
    from: 'ajaythakur9329@outlook.com', //user sender
    to: 'singla.nikhil4@outlook.com',  //msg reciver adderss
    subject: 'Trailer hailer',
    html: 'You are looking for a trailer for 10 days Nikhil'
    
  }

  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
   if(error){
          console.log(error);
      res.end("error");
   }else{
          console.log("Message sent: " + response.message);
      res.end("sent");
       }
});
});


router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/message', (req, res) => {
  console.log(req.body);
  Message.create(req.body, function (err, post) {
    res.json(post);
  });

  // Send mail details
  var mailOptions = {
    from: 'ajaythakur9329@outlook.com',
    to: req.body.email,
    subject: "Your contact request to trailer owner",
    text: JSON.stringify(req.body.message)
  };

  if(req.body.sendCopy) {
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

});

router.get('/messagebyuserid/:user_id', (req, res) => {
  user_id = req.params.user_id;
  console.log(user_id);
  let listingId = { "listings_user_id": user_id};
  let senderId = { "sender_id": user_id};
  Message.find({"parent_id": "0",  $or: [ listingId, senderId] }).sort([['date','descending']]).exec(function (err, messages) {
    if(err) return err;
      res.json(messages);
  });
})


router.get('/messagebyParentid/:parentId', (req, res) => {
  parentId = req.params.parentId;
  console.log(parentId);
  let query = { "parent_id": parentId};
  Message.find(query).sort([['date','ascending']]).exec(function (err, messages) {
    if(err) return err;
      res.json(messages);
  });
})

router.get('/message/:id', function(req, res, next) {
  Message.findById(req.params.id, function (err, message) {
    if (err) return next(err);
    res.json(message);
  });
});

// router.post('/filterSearch', (req, res) => {

//     console.log(req.body);

//     //let query = { '_id': { $in: req.body } };

//     ListTrailer.find({}, function(err, trailers){

//       res.json(trailers);
//     }).skip(2).limit(2);
//   });


function createRegex(userInput) {
  return new RegExp(
    // Escape all special characters except *
    "^" + userInput.replace(/([.+?^=!:${}()|\[\]\/\\])/g, "\\$1")
      // Allow the use of * as a wildcard like % in SQL.
      .replace(/\*/g, ".*") + "$",
    'i'
  );
}

router.post('/filterSearch', (req, res) => {

  console.log(req.body);
  //location = req.body.location;

  city = req.body.location;
 // province = location[1];
  price = req.body.price;
  fifthwheel = req.body.fifthwheel;
  hybridtrailer = req.body.hybridtrailer;
  numberOfGuest = req.body.numberOfGuest;
  tentrailer = req.body.tentrailer;
  toytrailer = req.body.toytrailer;
  traveltrailer = req.body.traveltrailer;
  vintagetrailer = req.body.vintagetrailer;

  dateFrom = req.body.dateFrom;
  dateTo = req.body.dateTo;
  type_of_rv=req.body.type_of_rv;
  
  
 
   //var query = ListTrailer.find();
 
  //let criteria = {};
  let criteria = [];
  
if (city && city.length > 0) {   criteria.push({ 'location_city': city }); } 

if (dateFrom && dateFrom.length > 0) {  criteria.push({ '$or': [{  'unavailability_from':{$lt: dateFrom}},{  'unavailability_from':{$gt: dateTo}}, {'unavailability_from':null}]}); }
if (dateTo && dateTo.length > 0) {  criteria.push({ '$or': [{  'unavailability_to':{$lt: dateFrom}},{  'unavailability_to':{$gt: dateTo}},{'unavailability_to':null}]}); }

if (numberOfGuest && numberOfGuest.length > 0) {  criteria.push({ '$or': [{  'specification_guest': numberOfGuest }]}); }
console.log(tentrailer);

if (price &&  price > 0) {  criteria.push({  'pricing_high_rate_hour': {$lte: price} }); } 
if (type_of_rv && type_of_rv.length > 0) {  criteria.push({  'type_of_rv':{$in:type_of_rv}}); }

criteria = criteria.length > 0 ? { $and: criteria } : {};

  
   ListTrailer.find(criteria).populate('star_rating').exec(function(err, trailers){
      res.json(trailers);
    });
  });
   



router.get('/fav/:user_id', (req, res) => {
  let user_id = req.params.user_id;
  let query = {'user_id': user_id}

  Favourite.find(query, { trailer_id : 1}, function(err, fav) {
    res.json(fav);
  });

});

router.delete('/deleteAllFav/:user_id', (req, res) => {
  let user_id = req.params.user_id;
  let query = {'user_id': user_id}

  Favourite.findByIdAndRemove(query, { trailer_id : 1}, req.body, function(err, fav) {
    res.json(fav);
  });

});

router.post('/trailersbyids', (req, res) => {
  console.log(req.body);
  let query = { '_id': { $in: req.body } };
  ListTrailer.find(query, function(err, trailers){
    res.json(trailers);
  });
});
router.get('/rvs', async function(req, res) {
  let location = req.query.location;
  let from = req.query.from;
  let to=req.query.to;
  console.log(' this is my api '+location);
});
  

router.get('/search', function(req, res, next) {

  location = req.query.location.split(',');
  from = req.query.from;
  to = req.query.to;

  //console.log(location);
  //var array = myString.split(',');

  city = location[0].trim();
  province = location[1].trim();

  console.log(city);
  console.log(province);
  console.log(from);
  console.log(to);

  // if(from !== undefined && to !== undefined) {
  //   dateRange = {}
  // }

  searchObject = {};
  searchObject.location_city = city;
  searchObject.location_province = province;

  if(from !== undefined && to !== undefined) {
    searchObject.pricing_highest_season_date_range_from = from;
    searchObject.pricing_highest_season_date_range_to = to;
  }


  query = {$and: [searchObject]}
  ListTrailer.find(query, function(err, trailers) {
    if(err) return err;

    res.json(trailers);
  })
});

router.post('/newsLetter', function(req, res, next) {
  NewsLetter.create(req.body, function (err, newsletters) {
    if (err) return next(err);
    res.json(newsletters);
  });
});

router.get('/user', function(req, res, next) {
  User.find({}, function(err, users){
    if (err) return next(err);
    res.json(users);
  });
});

router.get('/users/:listlimit', function(req, res, next) {
  let listlimit = parseInt(req.params.listlimit);
  console.log(listlimit);

  User.find({}, function(err, list){
    if (err) return err;
    res.json(list);

  }).limit(listlimit);
});

router.get('/user/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/userbyemail/:email',function(req, res, next) {
  console.log('I am here');
  console.log(req.params.email);
  User.findOne({email : req.params.email }, function (err, user){
    if (err) return err;

    res.json(user);
  });
  //User.findOne()
})

router.post('/saveuser', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/user/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/user/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/viewPass', (req, res) => {
  User.findOne({_id: req.decoded.userId }).select('email password').exec((err, user) => {
    if(err) {
      res.json({ success: false});
    } else {
      if (!user) {
        res.json({ success: false});
      }else {
        res.json({ success: true, user: user});
      }
    }
  })
});

router.put('/changePass', function(req, res, next) {
  User.findOne(req.id, req.body, function (err, post) {
    console.log(req.id);
    if (err) return next(err);
    res.json(post);
  });
});


router.get('/cmspage', function(req, res, next) {
  CmsPage.find({}, function(err, cmspages){
    if (err) return next(err);
    res.json(cmspages);
  });
});

router.get('/cmspages/:listlimit', function(req, res, next) {
  let listlimit = parseInt(req.params.listlimit);
  console.log(listlimit);

  CmsPage.find({}, function(err, list){
    if (err) return err;
    res.json(list);

  }).limit(listlimit);
});


router.get('/cmspage/:id', function(req, res, next) {
  CmsPage.findById(req.params.id, function (err, cmspages) {
    if (err) return next(err);
    res.json(cmspages);
  });
});

router.put('/cmspage/:id', function(req, res, next) {
  CmsPage.findByIdAndUpdate(req.params.id, req.body, function (err, cmspages) {
    if (err) return next(err);
    res.json(cmspages);
  });
});

router.post('/savecmspage', function(req, res, next) {
  CmsPage.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/cmspage/:id', function(req, res, next) {
  CmsPage.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.get('/trailers', function(req, res, next) {
  ListTrailer.find({}, function(err, ListTrailer){
    if (err) return next(err);
    res.json(ListTrailer);
  });
});

router.get('/trailers/:listlimit', function(req, res, next) {
  let listlimit = parseInt(req.params.listlimit);
  console.log(listlimit);  
  ListTrailer.find({}).populate('star_rating').sort({'created_at':-1}).limit(listlimit).exec(function(err, list){
    if (err) return err;
    res.json(list);

  })
});

router.get('/features/:listlimit', function(req, res, next) {
  let listlimit = parseInt(req.params.listlimit);
  console.log(listlimit);

  Feature.find({}, function(err, list){
    if (err) return err;
    res.json(list);

  }).limit(listlimit);
});

router.get('/rental_type/:listlimit', function(req, res, next) {
  let listlimit = parseInt(req.params.listlimit);
  console.log(listlimit);

  Rental.find({}, function(err, list){
    if (err) return err;
    res.json(list);

  }).limit(listlimit);
});




router.get('/trailersByUserId/:id', function(req, res, next) {
  ListTrailer.find({user_id: req.params.id}, function (err, listtrailers) {
    if (err) return next(err);
    res.json(listtrailers);
  });
});


router.post('/list_trailers', function(req, res, next) {
  ListTrailer.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/list_trailers/:id', function(req, res, next) {

  ListTrailer.findById(req.params.id)
  .populate('star_rating')
  .exec(function (err, listtrailers) {
    if (err) return next(err);
    res.json(listtrailers);
  });
});
   

router.put('/list_trailers/:id', function(req, res, next) {
  ListTrailer.findByIdAndUpdate(req.params.id, req.body, function (err, listtrailers) {
    if (err) return next(err);
    res.json(listtrailers);
  });
});

router.delete('/list_trailers/:id', function(req, res, next) {
  ListTrailer.findByIdAndRemove(req.params.id, req.body, function (err, listtrailers) {
    if (err) return next(err);
    res.json(listtrailers);
  });
});

router.post('/favourite', function(req, res, next) {
  Favourite.create(req.body, function (err, favourite) {
    if (err) return next(err);
    res.json(favourite);
  });
});

router.post('/getfavourite', function(req, res) {
  //console.log(req.body.user_id);
  Favourite.findOne({user_id: req.body.user_id, trailer_id: req.body.trailer_id} , function (err, favourite) {
    if (err) return next(err);
    res.json(favourite);
  });
});

router.delete('/delfavourite/:id', function(req, res) {
  Favourite.findByIdAndRemove(req.params.id, req.body, function (err, favourite) {
    if (err) return err;
    res.json(favourite);
  });
});

router.get('/favouritesByUserId/:id', function(req, res) {
  Favourite.find({user_id: req.params.id}, function (err, favourite) {
    if (err) return err;
    res.json(favourite);
  });
});

router.post('/list_trailersbyUserId/:FavTrailer_id', function(req, res) {
  query = {_id: {$in: req.body } };
  ListTrailer.find(query, function(err, trailers) {
    if (err) return err;
    res.json(trailers);
  });
});
 
router.get('/list_trailer_location/:word',function(req, res, next) {
  console.log('I am here');
  console.log(req.params.word);
  query ={ $or: [ { location_street: req.params.word }, { location_city: req.params.word } , { location_province: req.params.word }, { location_postal: req.params.word }] };
  
 
  ListTrailer.findOne(query, function (err, listLocation){
    if (err) return err;

    res.json(listLocation);
  });
  //User.findOne()
})

router.get('/list_trailer_locs', function(req, res, next) {
 /*
 ListTrailer.find({}, 'location_street location_city location_province location_postal', function (err, docs) {
    if (err) return next(err);
    res.json(docs);
    
    }); 
 */
  ListTrailer.find({},{location_city:true,_id:false}, function (err, docs) {
    if (err) return next(err);
    res.json(docs);
    
    });   
});


router.get('/allPackageDetail', function(req, res, next) {
  Package.find({}, function(err, package){
    if (err) return next(err);
    res.json(package);
  });
});

router.get('/Packages', (req, res) => {
  Package.find({}, (err, package) => {
    if (err) return err;
    res.json(package);
  });
});
router.post('/add-package', function(req, res, next) {
  Package.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
 
});

router.delete('/Packages/:id', function(req, res, next) {
  Package.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.get('/view-package/:id', function(req, res, next) {
  Package.findById(req.params.id, function (err, Package) {
    if (err) return next(err);
    res.json(Package);
  });
});
router.put('/edit-package/:id', function(req, res, next) {
  Package.findByIdAndUpdate(req.params.id, req.body, function (err,Package) {
    if (err) return next(err);
    res.json(Package);
  });
});

router.post('/login', (req, res) => {
      User.findOne({ $and: [ {email: req.body.email}, {password: req.body.password}, {type: 'admin'} ]}, (err, user) => {
        if(err) {
          res.json({success: false, message: err });
        } else {
          if(!user) {
            res.json({ success: false});
            } else {
                const token = jwt.sign({ userId: user._id },'secret', {expiresIn: '24h' });
                res.json({ success: true, token: token, user: { id: user._id } });
                
            }
        }
    });
});

router.post('/clientLogin', (req, res) => {
      User.findOne({ $and: [ {email: req.body.email}, {password: req.body.password},{approved:true} ]}, (err, user) => {
        if(err) {
          res.json({success: false, message: err });
        } else {
          if(!user) {
            res.json({ success: false});
            } else {
              
              console.log('User Type is '+user.type);
                const token = jwt.sign({ userId: user._id,role: user.type,username:user.firstname  },'secret', {expiresIn: '24h' });
                res.json({ success: true, token: token, user: { id: user._id,role:user.type,username:user.firstname } });
                
            }
        }
    });
});

//for rental manage 

router.post('/rental_type', function(req, res, next) {
  Rental.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
 
});

router.get('/rental_type', function(req, res, next) {
  Rental.find({}, function(err, Rental){
    if (err) return next(err);
    res.json(Rental);
  });
});

router.get('/rvtypebyrental/:id', function(req, res, next) {
    query = {'rental_type': {$in: req.params.id } };
	  console.log(query);
	  Rental.find(query, function(err, Rental) {
		if (err) return err;
		res.json(Rental);
		console.log(Rental);
	  });
});


router.get('/show_rental_type/:id', function(req, res, next) {
  Rental.findById(req.params.id, function (err, Rental) {
    if (err) return next(err);
    res.json(Rental);
  });
});

router.get('/edit_rental_type/:id', function(req, res, next) {
  Rental.findById(req.params.id, function (err, Rental) {
    if (err) return next(err);
    res.json(Rental);
  });
});

router.put('/edit_rental_type/:id', function(req, res, next) {
  Rental.findByIdAndUpdate(req.params.id, req.body, function (err, Rental) {
    if (err) return next(err);
    res.json(Rental);
  });
});

router.delete('/view_rental_type/:id', function(req, res, next) {
  Rental.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


//Manage Feature
router.post('/features', function(req, res, next) {
  Feature.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
 
});

router.get('/features', function(req, res, next) {
  Feature.find({}, function(err, Feature){
    if (err) return next(err);
    res.json(Feature);
  });
});

router.get('/view-features/:id', function(req, res, next) {
  Feature.findById(req.params.id, function (err, Feature) {
    if (err) return next(err);
    res.json(Feature);
  });
});
router.get('/edit-features/:id', function(req, res, next) {
  Feature.findById(req.params.id, function (err, Feature) {
    if (err) return next(err);
    res.json(Feature);
  });
});

router.put('/view-features/:id', function(req, res, next) {
  Feature.findByIdAndUpdate(req.params.id, req.body, function (err,Feature) {
    if (err) return next(err);
    res.json(Feature);
  });
});
router.put('/edit-features/:id', function(req, res, next) {
  Feature.findByIdAndUpdate(req.params.id, req.body, function (err,Feature) {
    if (err) return next(err);
    res.json(Feature);
  });
});


router.delete('/view-features/:id', function(req, res, next) {
  Feature.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.post('/feedback', function(req,res, next){
  Feedback.create(req.body, function(err, feedback){
    console.log(feedback)
    if(err) {
      console.log(err);
     
    }
    else {
      ListTrailer.findById(req.body.trailer_id,function(err,objtrailer){
        console.log('check feedback');
        console.log(objtrailer);
        objtrailer.star_rating.push(feedback);
        console.log('pusing');
        console.log(objtrailer.star_rating);
        feedback.trailers = objtrailer._id;
        feedback.save();

        objtrailer.save(function(err) {
          if (err) {
              console.log('Error in saving message');
              console.log(err);
          } else {
            console.log('save successfully');
          }
      });

        
        
      });
    }
  });
});
/*
router.post('/feedback', function(req, res, next) {
  Feedback.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/

router.get('/feedback', function(req, res, next) {
  Feedback.find({}, function(err, Feedback){
    if (err) return next(err);
    res.json(Feedback);
  });
});
router.delete('/view-feedback/:id', function(req, res, next) {
  Feedback.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.get('/view-feedback/:id', function(req, res, next) {
  Feedback.findById(req.params.id, function (err, Feedback) {
    if (err) return next(err);
    res.json(Feedback);
  });
});
router.put('/edit-feedback/:id', function(req, res, next) {
  Feedback.findByIdAndUpdate(req.params.id, req.body, function (err,Feedback) {
    if (err) return next(err);
    res.json(Feedback);
  });
});

router.post('/contact-us', function(req, res, next) {
  Contact.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.get('/contact-us', function(req, res, next) {
  Contact.find({}, function(err, Contact){
    if (err) return next(err);
    res.json(Contact);
  });
});

router.use((req, res, next) => {
  const token = req.headers['authorization'];
  if(!token) {
    res.json({ success: false });
  } else {
    jwt.verify(token, 'secret', (err, decoded) => {
      if(err) {
        res.json({success: false });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
});

module.exports = router;