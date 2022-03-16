let chai = require("chai");
let chaiHttp = require("chai-http");
const axios = require("axios");
const expect = require("chai").expect;
const mockProduct = require("./mockProduct");
const dotenv = require("dotenv");
const sinon = require("sinon");
const { productService } = require("../utils/productService");
const {
  createProduct,
  getAllProducts,
} = require("../controllers/productsController");
const MockExpressRequest = require("mock-express-request");
const MockExpressResponse = require("mock-express-response");
dotenv.config();
chai.use(chaiHttp);
let sandbox = sinon.createSandbox();
const mockRes = new MockExpressResponse();
const mockReq = new MockExpressRequest();

describe("Productos", () => {
  it("Get all products", async () => {
    sandbox
      .stub(productService, "find")
      .onFirstCall()
      .resolves({
        products: [
          {
            name: "Muñeco Hulk",
            image:
              "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6101047623101?fmt=jpeg&qlt=90&wid=652&hei=652",
            price: 1250,
            stock: 50,
            description: 'Hulk colección  marvel\nDiseño exclusivo de MARVEL"',
            _id: "6230d1a14fa83a975a588193",
            createdAt: "2022-03-15T17:49:21.186Z",
            updatedAt: "2022-03-15T17:49:21.186Z",
          },
        ],
      });

    try {
      const dataRes = await getAllProducts(mockReq, mockRes);
      expect(dataRes.statusCode).to.be.equal(200);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  it("Create a one product", async () => {
    mockReq.body = mockProduct;
    sandbox.stub(productService, "save").onFirstCall().resolves({ Ok: true });
    try {
      const dataResponse = await createProduct(mockReq, mockRes);
      expect(dataResponse.statusCode).to.be.equal(200);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
});
