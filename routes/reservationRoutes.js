const express = require('express');
const router = express.Router();
const reservationModel = require('../models/reservations')

router.get('/',(req,res)=>{
    reservationModel.findAll({ where: { status: 'reserved' }}).then(reservations=>{
        
        let listJSON = [];
        reservations.forEach(element => {
          listJSON.push(element.get({plain:true}));
        });
        //console.log(listJSON);
        res.render('viewAll',{reservations:listJSON});
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/makereservation',(req,res)=>{
    const data = {
        restaurantName:req.body.restaurantName,
        numberOfPersons:req.body.numberOfPersons,
        dateAndTime:req.body.dateAndTime,
        userid:req.body.userid
    }

    let {restaurantName,numberOfPersons,dateAndTime,userid} = data;
    reservationModel.create({
        restaurantName,
        numberOfPersons,
        dateAndTime,
        userid
    }).then((x)=>{
        res.send(x);
            
            }).catch(err=>{
        console.log(err);
    })
})

router.get('/cancelreservation/:id',(req,res)=>{

    reservationModel.update(
        { status: 'cancelled' }, /* set attributes' value */
        { where: { id: req.params.id }} /* where criteria */
    ).then(res.send(true)).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;
