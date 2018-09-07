import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { FoodItem, allFoodItems } from '../api/v1/models/FoodItem';

const should = chai.should();
chai.use(chaiHttp);

const initialFoodItem = new FoodItem({
  id: 1,
  name: 'Vegetable Salad',
  description: 'A very healthy snack',
  quantity: 200,
  unitPrice: 500,
  updatedAt: '03-09-2018',
  createdAt: '03-09-2018',
});

// Initialize test database for test
beforeEach((done) => {
  chai.request(app)
    .post('/api/v1/foodItems')
    .send(initialFoodItem)
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

afterEach((done) => {
  allFoodItems.length = 0;
  done();
});

describe('Food Items', () => {
  describe('GET /foodItems - Get all food items', () => {
    it('should return a json object', (done) => {
      chai.request(app)
        .get('/api/v1/foodItems')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).to.be.a.json;
          done();
        });
    });
    it('should have all available food items', (done) => {
      chai.request(app)
        .get('/api/v1/foodItems')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.length).to.be.equal(1);
          done();
        });
    });
  });

  describe('GET /:foodItemId - Get foodItem by ID', () => {
    it('should return a json Object', (done) => {
      const foodItemId = 1;
      chai.request(app)
        .get(`/api/v1/foodItems/${foodItemId}`)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).to.be.a.json;
          done();
        });
    });
    it('should return an error if value of foodItemId is invalid', (done) => {
      const foodItemId = null;
      chai.request(app)
        .get(`/api/v1/orders/${foodItemId}`)
        .end((err, res) => {
          res.should.have.status(422);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
  });

  describe('POST /foodItems - Create food item', () => {
    const foodItem2 = {
      id: 2,
      name: 'Hamburger',
      description: 'Very delicious',
      quantity: 1000,
      unitPrice: 600,
      updatedAt: '04-09-2018',
      createdAt: '04-09-2018',
    };

    it('should create a new food item', (done) => {
      chai.request(app)
        .post('/api/v1/foodItems')
        .send(foodItem2)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          expect(res.body.length).equal(2);
          done();
        });
    });

    it('should not create food item with invalid data', (done) => {
      chai.request(app)
        .post('/api/v1/foodItems')
        .send({ a: 1 })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(422);
          done();
        });
    });
  });
});
