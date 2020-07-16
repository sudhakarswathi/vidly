var express=require('express')
const generes=require('../routes1/generes');
const customers=require('../routes1/customers');
const rentals=require('../routes1/rentals');
const movies=require('../routes1/movies');
const users=require('../routes1/users');
const login=require('../routes1/login');
const home=require('../routes1/home');
const returns=require('../routes1/return');
var err=require('../middleware/error')
module.exports=function(app){
    app.use(express.json());
    app.use('/',home)
    app.use('/api/generes',generes)
    app.use('/api/movies',movies);
    app.use('/customers',customers);
    app.use('/api/rentals',rentals);
    app.use('/api/users',users);
    app.use('/api/login',login);
    app.use('/api/returns',returns);
    app.use(err)
    }