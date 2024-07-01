import { DateTime } from 'luxon'
import { BaseModel, SnakeCaseNamingStrategy, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Hotel from '#models/tenant/hotel'
import Bed from '#models/tenant/bed'

BaseModel.namingStrategy = new SnakeCaseNamingStrategy()

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare hotelId: number | null

  @column()
  declare status: boolean

  @column()
  declare room_type: string | null

  @column()
  declare room_no: string

  @column()
  declare floor_no: string | null

  @column()
  declare price_type: string | null

  @column()
  declare purchase_price: string | null

  @column()
  declare sale_price: string | null

  @column()
  declare no_of_bed: number | null

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
  @belongsTo(() => Hotel)
  declare hotels: BelongsTo<typeof Hotel>

  @hasMany(() => Bed)
  declare beds: HasMany<typeof Bed>
}
