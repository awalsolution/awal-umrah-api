import { DateTime } from 'luxon'
import { BaseModel, SnakeCaseNamingStrategy, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import BookingMemberHotelDetail from '#models/tenant/booking_member_hotel_detail'

BaseModel.namingStrategy = new SnakeCaseNamingStrategy()

export default class BookingMemberDetail extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare bookingId: number | null

  @column()
  declare name: string

  @column()
  declare gender: string

  @column()
  declare family_head: boolean

  @column.dateTime({
    serialize: (value) => value?.toISODate(),
  })
  declare dob: DateTime | null

  @column()
  declare marital_status: string | null

  @column()
  declare passport: string | null

  @column()
  declare passport_type: string

  @column.dateTime({
    serialize: (value) => value?.toISODate(),
  })
  declare issue_date: DateTime | null

  @column.dateTime({
    serialize: (value) => value?.toISODate(),
  })
  declare expiry_date: DateTime | null

  @column()
  declare iata: string | null

  @column()
  declare visa_company: string | null

  @column()
  declare visa_status: string | null

  @column.dateTime({
    autoCreate: true,
    serialize: (value) => (value ? value.toISO() : null),
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value) => (value ? value.toISO() : null),
  })
  declare updatedAt: DateTime

  @hasMany(() => BookingMemberHotelDetail)
  declare hotelDetails: HasMany<typeof BookingMemberHotelDetail>
}
