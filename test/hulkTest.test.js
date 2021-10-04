let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const mockProduct = require('./mockProduct');
const dotenv = require("dotenv");
dotenv.config();
chai.use(chaiHttp);
const baseUrl = 'https://hulk-store-api.herokuapp.com/api';

describe('Productos', () => {
  it('Get all products', (done) => {
      chai.request(baseUrl)
          .get('/products')
          .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a('array');
              expect(res.body.length).to.be.above(0);
              done();
          });
  });
  it('Create a one product', (done) => {
    chai.request(baseUrl)
    .post('/products')
    .send(mockProduct)
    .set({ "Authorization": process.env.TOKEN })
    .end( function(err,res){
    console.log(res.body)
    expect(res).to.have.status(200);
    done();
    });
    });
});