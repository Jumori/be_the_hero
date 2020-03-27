const crypto = require('crypto');
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
    const id = crypto.randomBytes(4).toString('HEX');

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