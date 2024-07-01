import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'booking_member_details'

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
      table.boolean('family_head').defaultTo(0)
      table.date('dob').nullable()
      table.string('marital_status')
      table.string('passport')
      table.string('passport_type')
      table.date('issue_date')
      table.date('expiry_date')
      table.string('iata').nullable()
      table.string('visa_company').nullable()
      table.string('visa_status').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
