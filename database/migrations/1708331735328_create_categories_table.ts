import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('shop_id')
        .unsigned()
        .references('id')
        .inTable('shops')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('parent_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('slug').nullable()
      table.string('thumbnail').nullable()
      table.boolean('status').notNullable().defaultTo(true)

      table.unique(['shop_id', 'name'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}