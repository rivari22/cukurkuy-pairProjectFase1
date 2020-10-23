'use strict';

let hairstylists = require('../data/hairstylists.json')
hairstylists.forEach(e => {
  e.createdAt = new Date()
  e.updatedAt = new Date()
})
console.log(hairstylists)
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

   return queryInterface.bulkInsert("Hairstylists", hairstylists)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Hairstylists", null)
  }
};
