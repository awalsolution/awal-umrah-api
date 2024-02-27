import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        shopId: 1,
        categoryId: 1,
        product_code: '112233',
        title: 'Product 01',
        slug: 'product-01',
        description: 'this is shop 01 product 01 long description',
        thumbnail: '/uploads/products/product-01.png',
      },
      {
        shopId: 1,
        categoryId: 1,
        product_code: '223344',
        title: 'Product 02',
        slug: 'product-02',
        description: 'this is shop 01 product 02 long description',
        thumbnail: '/uploads/products/product-02.png',
      },
      {
        shopId: 1,
        categoryId: 2,
        product_code: '334455',
        title: 'Product 03',
        slug: 'product-03',
        description: 'this is shop 01 product 03 long description',
        thumbnail: '/uploads/products/product-03.png',
      },
      {
        shopId: 2,
        categoryId: 1,
        product_code: '445566',
        title: 'Product 01',
        slug: 'product-01',
        description: 'this is shop 02 product 01 long description',
        thumbnail: '/uploads/products/product-04.png',
      },
      {
        shopId: 2,
        categoryId: 2,
        product_code: '556677',
        title: 'Product 02',
        slug: 'product-02',
        description: 'this is shop 02 product 02 long description',
        thumbnail: '/uploads/products/product-05.png',
      },
      {
        shopId: 2,
        categoryId: 3,
        product_code: '667788',
        title: 'Product 03',
        slug: 'product-03',
        description: 'this is shop 02 product 03 long description',
        thumbnail: '/uploads/products/product-01.png',
      },
      {
        shopId: 3,
        categoryId: 1,
        product_code: '778899',
        title: 'Product 01',
        slug: 'product-01',
        description: 'this is shop 03 product 01 long description',
        thumbnail: '/uploads/products/product-02.png',
      },
      {
        shopId: 3,
        categoryId: 2,
        product_code: '889900',
        title: 'Product 02',
        slug: 'product-02',
        description: 'this is shop 02 product 02 long description',
        thumbnail: '/uploads/products/product-03.png',
      },
      {
        shopId: 3,
        categoryId: 3,
        product_code: '9900011',
        title: 'Product 03',
        slug: 'product-03',
        description: 'this is shop 02 product 03 long description',
        thumbnail: '/uploads/products/product-04.png',
      },
    ])
  }
}