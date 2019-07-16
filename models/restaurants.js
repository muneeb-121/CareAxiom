const Sequelize = require('sequelize')
const db = require('../config/db')

const restaurantModel = db.define('restaurants',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING
    }
}) 
module.exports = restaurantModel;