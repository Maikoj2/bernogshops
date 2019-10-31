const MongoLib = require('../lib/mongo');

class productsService {
  constructor() {
    this.collection = 'db_shop';
    this.mongoDB = new MongoLib();
  }
  async getproducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const product = await this.mongoDB.getAll(this.collection, query);
    return product || [];
  }

  async getproduct({ productId }) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createproduct({ product }) {
    const createproductId = await this.mongoDB.create(this.collection, product)
    return createproductId || {};
  }

  async updateproduct({ productId, product } = {}) {
    const updateproduct = await this.mongoDB.updated(this.collection, productId, product);
    return updateproduct;
  }

  async deletedproduct({ productId }) {
    const deletedproductId = await this.mongoproductlete(this.collection, productId);
    return deletedproductId;
  }


}

module.exports = productsService;


