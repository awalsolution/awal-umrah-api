import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'booking_hotel_details'

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

      table.string('name').nullable()
      table.string('city').nullable()
      table.string('room_type').nullable()
      table.integer('nights').nullable()
      table.dateTime('check_in_date').nullable()
      table.dateTime('check_out_date').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
