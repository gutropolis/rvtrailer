const express = require('express');

const app=express();
const pug = require('pug');
app.set('view engine', 'pug');

const regisrterFunction = pug.compileFile('server/template/register.pug');
const approvedFunction = pug.compileFile('server/template/approved.pug');
const signupFunction = pug.compileFile('server/template/signup.pug');
const addlist = pug.compileFile('server/template/addlist.pug');
const addlistadmin = pug.compileFile('server/template/addlistbyadmin.pug');
const forgetpass = pug.compileFile('server/template/forgetpass.pug');
const forgetpassbyadmin = pug.compileFile('server/template/forgetpassbyadmin.pug');
const subscription = pug.compileFile('server/template/subscription.pug');
const subscriptionbyadmin = pug.compileFile('server/template/subscriptionbyadmn.pug');
const rating_msg = pug.compileFile('server/template/ratingrenter.pug');
const rating_msg_admin = pug.compileFile('server/template/ratingadmin.pug');
const msg_byemail = pug.compileFile('server/template/message.pug');

//Host account account details


var adminEmail = 'abhimanyudeveloper@outlook.com';
var subject_Register = 'Welcome to Trailer Hailer';

var subject_admin_reg = 'Sign up account';
var subject_approvedby = 'Approved Your Account ';
var subsubcription_plan = 'Subscribe plan  ';
var admin_msgsubsubcription_plan = 'Subscribe plan by user  ';
var addlist_submsg = 'Trailer Add Successfully  ';
var admin_addlist_submsg = 'Trailer Add Successfully by user  ';
var forgetpass_submsg = 'Forget Password  ';
var admin_forgetpass_submsg = 'Forget password by user  ';
var msg_send = 'message sent by ';
var rating_subject = 'rating for your trailer';
var rating_subject_admin = 'rating for trailer ';





exports.adminEmail=adminEmail;
exports.subject_admin_reg=subject_admin_reg;
exports.subject_Register=subject_Register;
exports.approvedFunction = approvedFunction;
exports.regisrterFunction = regisrterFunction;
exports.signupFunction = signupFunction;
exports.subject_approvedby = subject_approvedby;
exports.subsubcription_plan = subsubcription_plan;
exports.admin_msgsubsubcription_plan = admin_msgsubsubcription_plan;
exports.addlist_submsg = addlist_submsg;
exports.admin_addlist_submsg = admin_addlist_submsg;
exports.forgetpass_submsg = forgetpass_submsg;
exports.admin_forgetpass_submsg = admin_forgetpass_submsg;
exports.addlist = addlist;
exports.addlistadmin = addlistadmin;
exports.forgetpass =forgetpass;
exports.forgetpassbyadmin =forgetpassbyadmin;
exports.subscription =subscription;
exports.subscriptionbyadmin = subscriptionbyadmin;
exports.msg_send = msg_send;
exports.rating_subject = rating_subject;
exports.rating_subject_admin = rating_subject_admin;
exports.rating_msg = rating_msg;
exports.rating_msg_admin = rating_msg_admin;
exports.msg_byemail = msg_byemail;



