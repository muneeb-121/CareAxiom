var express = require('express');
var router = express.Router();
var resturantsModel = require('../models/restaurants');

/* GET home page. */
router.get('/', (req,res)=>{
  
  resturantsModel.findAll({attributes: ['id', 'name']}).then(resturants=>{
    let listJSON = [];
    resturants.forEach(element => {
      listJSON.push(element.get({plain:true}));
    });
    //console.log(listJSON)
    res.render('index',{restaurantList:listJSON});
  }).catch(err=>{
    console.log(err);
  })
});

module.exports = router;
