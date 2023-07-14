import { DateTime } from 'luxon';
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm';
import { STANDARD_DATE_TIME_FORMAT } from 'App/Helpers/utils';

export default class Variation extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public productId: number | undefined;

  @column()
  public attributeId: number | undefined;

  @column()
  public attribute_value: string;

  @column()
  public price: number;

  @column()
  public regular_price: number;

  @column()
  public sale_price: number | null;

  @column()
  public date_on_sale_from: DateTime | null;

  @column()
  public date_on_sale_to: DateTime | null;

  @column()
  public on_sale: Boolean;

  @column()
  public total_sales: number | null;

  @column()
  public stock_status: string;

  @column()
  public rating: string | null;

  @column()
  public product_images: string | null;

  @column.dateTime({
    autoCreate: true,
    serialize(value: DateTime) {
      return value ? value.toFormat(STANDARD_DATE_TIME_FORMAT) : '';
    },
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize(value: DateTime) {
      return value ? value.toFormat(STANDARD_DATE_TIME_FORMAT) : '';
    },
  })
  public updatedAt: DateTime;
}