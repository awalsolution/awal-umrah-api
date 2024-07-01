import { DateTime } from 'luxon'
import { BaseModel, SnakeCaseNamingStrategy, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import BookingHotelDetail from '#models/tenant/booking_hotel_detail'
import BookingMemberDetail from '#models/tenant/booking_member_detail'
import Agency from '#models/tenant/agency'

BaseModel.namingStrategy = new SnakeCaseNamingStrategy()

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare agencyId: number | null

  @column()
  declare userId: number | null

  @column()
  declare customerName: string | null

  @column()
  declare status: string

  @column()
  declare group_no: number | null

  @column()
  declare group_name: string | null

  @column()
  declare category: string | null

  @column()
  declare arrival_date: DateTime | null

  @column()
  declare expected_departure: DateTime | null

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

  @belongsTo(() => Agency)
  declare agency: BelongsTo<typeof Agency>

  @hasMany(() => BookingMemberDetail)
  declare members: HasMany<typeof BookingMemberDetail>

  @hasMany(() => BookingHotelDetail)
  declare bookingHotelDetails: HasMany<typeof BookingHotelDetail>
}
