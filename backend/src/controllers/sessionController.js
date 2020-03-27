const connection = require('./../database/connection');

// EXPORTS ---------------------------------------------------------------------
module.exports = {
  async create(request, response) {
    const { id } = request.body.login;

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();

    if (!ong) {
      return response.status(400).json({
        error: 'No ONG with this ID'
      })
    }

    return response.json({
      data: ong
    })
  }
}