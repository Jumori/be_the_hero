const request = require('supertest');
const app = require('./../../src/app');
const connection = require('./../../src/database/connection');

describe('ONG', () => {
  // RUN DB MIGRATIONS BEFORE EACH TEST
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  // DESTROY CONNECTION AFTER ALL THE TESTS ARE FINISHED
  afterAll(async () => {
    await connection.destroy();
  });

  // CREATE OUR SCENARIOS HERE
  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        ong: {
          name: "JEST TEST",
          email: "contact@test.com",
          phone: "11999999999",
          city: "São Paulo",
          uf: "SP"
        }
    });

    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.id).toHaveLength(8);
  });
});