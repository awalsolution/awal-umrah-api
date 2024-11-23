import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'booking_members'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('booking_id')
        .unsigned()
        .references('id')
        .inTable('bookings')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('name')
      table.string('gender')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
