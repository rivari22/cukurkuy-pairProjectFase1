'use strict';

let userServices = require('../data/userServices.json')
userServices.forEach(e => {
  e.createdAt = new Date()
  e.updatedAt = new Date()
})
console.log(userServices)
module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

   return queryInterface.bulkInsert("UserServices", userServices)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("UserServices", null)
  }
};
