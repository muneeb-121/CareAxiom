var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var reservationModel = require('../models/reservations')

chai.use(chaiHttp);

function deleteUtility(){
    reservationModel.destroy({
        where: {},
        truncate: true
      })
}
function createUtility(){
    reservationModel.create({
        restaurantName:"Test Resturant",
        numberOfPersons:"1",
        dateAndTime:"07/16/2019 6:37 PM",
        userid:"1"
    });
}


it('Should list all Reservations on /reservations GET', function(done) {

    deleteUtility(); //Start with empty database
    createUtility();

    chai.request(server)
      .get('/reservations')
      .end((err, res)=>{
        res.should.have.status(200);
        done(); //End with same state as it was at the start
      });
    });





  it('Should make an insertion in DB for Reservations on /reservations/makereservation POST', function(done) {
    
    deleteUtility(); //Start with empty database

    chai.request(server)
      .post('/reservations/makereservation')
      .send({
        restaurantName:"Test Resturant",
        numberOfPersons:1,
        dateAndTime:"07/16/2019 6:37 PM",
        userid:1
    })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        console.log(res);
        res.body.should.be.a('object');
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('numberOfPersons')
        res.body.numberOfPersons.should.equal(1);
        res.body.restaurantName.should.equal('Test Resturant');
        done(); 
      });
      
  });

  it('Cancel a reservation on /reservations/cancelreservation/1 GET', function(done) {
    deleteUtility(); //Start with empty database
    createUtility();

    chai.request(server)
      .get('/reservations/cancelreservation/1')
      .end((err, res)=>{
        res.should.have.status(200);
        deleteUtility()
        done();
      });
  });

//   INSERT INTO `restaurants` (`id`, `name`) VALUES (NULL, 'Haveli Restaurant');
// INSERT INTO `restaurants` (`id`, `name`) VALUES (NULL, 'Café Aylanto');
// INSERT INTO `restaurants` (`id`, `name`) VALUES (NULL, 'The Lakhanvi');
// INSERT INTO `restaurants` (`id`, `name`) VALUES (NULL, 'Qabail');
// INSERT INTO `restaurants` (`id`, `name`) VALUES (NULL, 'Monal');
// INSERT INTO `restaurants` (`id`, `name`) VALUES (NULL, 'Coocos Den');
// INSERT INTO `restaurants` (`id`, `name`) VALUES (NULL, 'Butt Karahi Tikka');
// INSERT INTO `restaurants` (`id`, `name`) VALUES (NULL, 'Covo Restaurant');
// INSERT INTO `restaurants` (`id`, `name`) VALUES (NULL, 'TABAQ Restaurant');
// INSERT INTO `restaurants` (`id`, `name`) VALUES (NULL, 'Daar cheeni');

