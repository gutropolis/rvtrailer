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

/*var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ajaythakurniit93@gmail.com',
    pass: 'Romanticworld12'
  }
});
*/
var smtpTransport = nodemailer.createTransport({
  service: "outlook",
  host: "smtp.outlook.com",
  auth: {
      user: "ajaythakur9329@outlook.com",
      pass: ""
  }
});

/*var mailOptions={
  from: 'ajaythakur9329@outlook.com', //user sender
  to: 'ajaythakurniit93@gmail.com',  //msg reciver adderss
  subject: '5th time test',
  text: 'its my testing'
  
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

*/
//static email
router.post('/send',function(req,res){
console.log('in this api '+req.body);

  
  var mailOptions={
    from: 'ajaythakur9329@outlook.com',
    to: req.body.email,
      subject : 'sign up successfully',
      text : 'Hello text'
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


/*router.post('/sendmail', (req, res) => {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ajaythakurniit93@gmail.com',
      pass: 'Romanticworld12'
    }
  });
  
  




  var mailOptions = {
    from: 'singla.nikhil4@gmail.com',
    to: req.body.to,
    subject: req.body.subject,
    text: "Hello text"
  };

  console.log(mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


});
*/

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
    from: 'ajaythakurniit93@gmail.com',
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
  Message.find(query).sort([['date','descending']]).exec(function (err, messages) {
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
  console.log(type_of_rv);
  /*
   //var query = ListTrailer.find();
 
  //let criteria = {};
  let criteria = [];
  
if (city && city.length > 0) {   criteria.push({ 'location_city': city }); } 
//if (province && province.length > 0) {  criteria.push({  'location_province': province }); } 
if (dateFrom && dateFrom.length > 0) {  criteria.push({  'unavailability_from': dateFrom }); }
if (dateTo && dateTo.length > 0) {  criteria.push({  'unavailability_to': dateTo }); }
if (fifthwheel && fifthwheel.length > 0) {  criteria.push({  'fifthwheel': fifthwheel }); }
if (hybridtrailer && hybridtrailer.length > 0) {  criteria.push({  'hybrid': hybridtrailer }); }
if (numberOfGuest && numberOfGuest.length > 0) {  criteria.push({  'specification_guest': numberOfGuest }); }
console.log(tentrailer);
if (tentrailer) {  criteria.push({  'tenttrailer': tentrailer });
  console.log('I am in tentrailer');
}
if (toytrailer) {  criteria.push({  'toyhauler': toytrailer }); }
if (vintagetrailer) {  criteria.push({  'vintage': vintagetrailer }); }
if (traveltrailer) {  criteria.push({  'traveltrailer': traveltrailer }); }
if (price && price.length > 0) {  criteria.push({  'pricing_high_rate_hour': {$gte: 0, $lte: price} }); } 

criteria = criteria.length > 0 ? { $and: criteria } : {};
/*
 let query = { 
				 $and:[ 
						{ 
						
						
							$or: [       
								   {'location_city':city}, 
								   {'location_province':province}
								  ]
						},
						
						{'fifthwheel':fifthwheel}, 
						{'hybrid':hybridtrailer}, 
						{'specification_guest':numberOfGuest}, 
						{'tenttrailer':tentrailer}, 
						{'toyhauler':toytrailer}, 
						{'traveltrailer':traveltrailer}, 
						{'vintage':vintagetrailer}, 
						{'pricing_high_rate_hour': {$gte: 0, $lte: price} }, 
						{
							$and:[{'pricing_highest_season_date_range_from': {$gte: dateFrom, $lte: dateTo}}, {'pricing_highest_season_date_range_to': {$lte: dateTo}}]
						}
					]
 
			}
*/
  //let query = { $or:[ {'location_city':city}, {'location_province':province}, {'fifthwheel':fifthwheel}, {'hybrid':hybridtrailer}, {'specification_guest':numberOfGuest}, {'tenttrailer':tentrailer}, {'toyhauler':toytrailer}, {'traveltrailer':traveltrailer}, {'vintage':vintagetrailer}, {'pricing_high_rate_hour': {$gte: 0, $lte: price} }, {$and:[{'pricing_highest_season_date_range_from': {$gte: dateFrom, $lte: dateTo}}, {'pricing_highest_season_date_range_to': {$lte: dateTo}}]}]}
  // let query = {$and:[{'pricing_high_rate_hour': {$gte: 0, $lte: price} }]}
  // let query = {$and:[{'pricing_highest_season_date_range_from': {$gte: dateFrom, $lte: dateTo}}, {'pricing_highest_season_date_range_to': {$lte: dateTo}}]}

 /*   ListTrailer.find(criteria, function(err, trailers){
      res.json(trailers);
    });
    */
    console.log('date after click search '+dateFrom);

    if (dateFrom != undefined && dateTo !=undefined) 
    {
       let query = {
      $and : 
      [
        {$or: [
           
            {"location_city":city ||{$exists:true}}
          ]},
        {$and: [
           
          {'fifthwheel':fifthwheel ||{$exists:true}}, {'hybrid':hybridtrailer ||{$exists:true}}, {'specification_guest':numberOfGuest ||{$exists:true}}, {'tenttrailer':tentrailer ||{$exists:true}}, {'toyhauler':toytrailer ||{$exists:true}}, {'traveltrailer':traveltrailer ||{$exists:true} }, {'vintage':vintagetrailer ||{$exists:true}},{$and:[
            {$or:
                [
                {'unavailability_from':{"$lt":dateFrom}},
                {'unavailability_from':{"$gt":dateTo}},
                {'unavailability_from':null}    
                ]
                  },
                  
                  {$or:
                [
                {'unavailability_to':{"$lt":dateFrom}},
                {'unavailability_to':{"$gt":dateTo}},
                {'unavailability_to':null}    
                ]
                  }
                  ]
              }
      ]
    }
  ]
  }
    
  
    // let query = {$and:[{'pricing_high_rate_hour': {$gte: 0, $lte: price} }]}
    // let query = {$and:[{'pricing_highest_season_date_range_from': {$gte: dateFrom, $lte: dateTo}}, {'pricing_highest_season_date_range_to': {$lte: dateTo}}]}
  
      ListTrailer.find(query, function(err, trailers){
  
        res.json(trailers);
      });

     
      
    }

else{
    let query = {
      $and : 
      [
        {$or: [
           
            {"location_city":city ||{$exists:true}}
          ]},
        {$and: [
           
          {'fifthwheel':fifthwheel ||{$exists:true}}, {'hybrid':hybridtrailer ||{$exists:true}}, {'specification_guest':numberOfGuest ||{$exists:true}}, {'tenttrailer':tentrailer ||{$exists:true}}, {'toyhauler':toytrailer ||{$exists:true}}, {'traveltrailer':traveltrailer ||{$exists:true} }, {'pricing_high_rate_hour':{$lte:price} },{'type_of_rv':[type_of_rv] }
      ]
    }
  ]
  }
    
  
    // let query = {$and:[{'pricing_high_rate_hour': {$gte: 0, $lte: price} }]}
    // let query = {$and:[{'pricing_highest_season_date_range_from': {$gte: dateFrom, $lte: dateTo}}, {'pricing_highest_season_date_range_to': {$lte: dateTo}}]}
  
      ListTrailer.find(query, function(err, trailers){
  
        res.json(trailers);
      });
    
    }
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
  

  ListTrailer.find({}).sort({'created_at':-1}).limit(listlimit).exec(function(err, list){
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
  ListTrailer.findById(req.params.id, function (err, listtrailers) {
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
// router.get('/allPackageDetail', function (req, res) {

//   Package.find({}, function(err, package) {
//     if (err) return err;
//     res.json(package);
//   });

//   });

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