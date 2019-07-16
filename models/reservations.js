const Sequelize = require('sequelize')
const db = require('../config/db')

const reservationModel = db.define('reservations',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    restaurantName:{
        type:Sequelize.STRING
    },
    numberOfPersons:{
        type:Sequelize.INTEGER
    },
    dateAndTime:{
        type:Sequelize.DATE
    },
    userid:{
        type:Sequelize.INTEGER
    },
    status:{
        type:Sequelize.STRING,
        defaultValue:'reserved'
    }
}) 
module.exports = reservationModel;