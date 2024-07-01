import { DateTime } from 'luxon'
import { BaseModel, SnakeCaseNamingStrategy, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Booking from '#models/tenant/booking'

BaseModel.namingStrategy = new SnakeCaseNamingStrategy()

export default class BookingHotelDetail extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare bookingId: number | null

  @column()
  declare name: string | null

  @column()
  declare city: string | null

  @column()
  declare roomType: string | null

  @column()
  declare nights: number | null

  @column.dateTime({
    serialize: (value) => value?.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY),
  })
  declare checkIn_date: DateTime | null

  @column.dateTime({
    serialize: (value) => value?.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY),
  })
  declare checkOut_date: DateTime | null

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

  @belongsTo(() => Booking)
  declare booking: BelongsTo<typeof Booking>
}
