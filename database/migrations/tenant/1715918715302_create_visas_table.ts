import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'visas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name').notNullable().index()
      table.string('last_name').nullable()
      table.string('passport_no').nullable()
      table.date('dob').nullable()
      table.string('id_card').nullable()
      table.string('gender').nullable()
      table.date('issue_date').nullable()
      table.date('expiry_date').nullable()
      table.string('purchase_price').nullable()
      table.string('sale_price').nullable()
      table.string('offer_price').nullable()
      table.boolean('status').notNullable().defaultTo(true)
      table.string('created_by').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
