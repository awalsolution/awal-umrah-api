import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('hotel_id')
        .unsigned()
        .references('id')
        .inTable('hotels')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('status').notNullable().defaultTo('active')
      table.string('room_type').notNullable()
      table.string('room_no').notNullable()
      table.string('floor_no').notNullable()
      table.string('price_type').notNullable()
      table.string('purchase_price').notNullable()
      table.string('sale_price').notNullable()
      table.integer('no_of_bed').notNullable()

      table.unique(['hotel_id', 'room_no'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
