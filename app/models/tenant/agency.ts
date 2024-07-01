import { DateTime } from 'luxon'
import { BaseModel, SnakeCaseNamingStrategy, column } from '@adonisjs/lucid/orm'

BaseModel.namingStrategy = new SnakeCaseNamingStrategy()

export default class Agency extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare agency_name: string

  @column()
  declare phone: string | null

  @column()
  declare status: string

  @column()
  declare address: string

  @column()
  declare city: string

  @column()
  declare state: string

  @column()
  declare country: string

  @column()
  declare logo: string

  @column()
  declare created_by: string | null

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
}
