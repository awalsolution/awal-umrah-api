import { DateTime } from 'luxon'
import { BaseModel, SnakeCaseNamingStrategy, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Hotel from '#models/tenant/hotel'
import Room from '#models/tenant//room'
import Bed from '#models/tenant/bed'

BaseModel.namingStrategy = new SnakeCaseNamingStrategy()

export default class BookingMemberHotelDetail extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare bookingId: number | null

  @column()
  declare bookingMemberDetailId: number | null

  @column()
  declare hotelId: number | null

  @column()
  declare roomId: number | null

  @column()
  declare bedId: number | null

  @column()
  declare city: string | null

  @column()
  declare room_type: string | null

  @column()
  declare package: string | null

  @column()
  declare nights: number | null

  @column()
  declare checkIn_date: DateTime | null

  @column()
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

  @belongsTo(() => Hotel)
  declare hotel: BelongsTo<typeof Hotel>

  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>

  @belongsTo(() => Bed)
  declare bed: BelongsTo<typeof Bed>
}
