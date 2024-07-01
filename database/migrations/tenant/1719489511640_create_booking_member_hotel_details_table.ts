import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'booking_member_hotel_details'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('booking_member_detail_id')
        .unsigned()
        .references('id')
        .inTable('booking_member_details')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('hotel_id')
        .unsigned()
        .references('id')
        .inTable('hotels')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('room_id')
        .unsigned()
        .references('id')
        .inTable('rooms')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('bed_id')
        .unsigned()
        .references('id')
        .inTable('beds')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.string('city').nullable()
      table.string('room_type').nullable()
      table.string('package').nullable()
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
