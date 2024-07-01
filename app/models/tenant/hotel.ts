import { DateTime } from 'luxon'
import { BaseModel, SnakeCaseNamingStrategy, column } from '@adonisjs/lucid/orm'

BaseModel.namingStrategy = new SnakeCaseNamingStrategy()

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare agencyId: number | null

  @column()
  declare name: string

  @column()
  declare phone_number: string

  @column()
  declare owner: string | null

  @column()
  declare owner_phone: string | null

  @column()
  declare status: boolean

  @column()
  declare address: string | null

  @column()
  declare city: string | null

  @column()
  declare state: string | null

  @column()
  declare country: string | null

  @column.dateTime({
    autoCreate: true,
    serialize: (value) => value?.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY),
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value) => value?.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY),
  })
  declare updatedAt: DateTime

  // relation
}
