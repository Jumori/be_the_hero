const crypto = require('crypto');
const generateUniqueId = require('./../utils/generateUniqueId');
const connection = require('./../database/connection');

// EXPORTS --------------------------------------------------------------------- 
module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json({
      data: ongs
    })
  },

  async create(request, response) {
    const {
      name,
      email,
      phone,
      city,
      uf
    } = request.body.ong;
    const id = generateUniqueId();

    // CONNECT WITH DATABASE AND SENT THE COLUMNS THAT WE WANT
    await connection('ongs').insert({
      id,
      name,
      email,
      phone,
      city,
      uf
    })

    return response.json({
      data: {
        id
      }
    });
  }
}