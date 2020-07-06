import Knex = require("knex");

const setting = require('../knexfile');
export const knex: Knex = require('knex')(setting.development);