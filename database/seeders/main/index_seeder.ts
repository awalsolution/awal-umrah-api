import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }
  async run() {
    await this.runSeeder(await import('#database/seeders/menu_seeder'))
    await this.runSeeder(await import('#database/seeders/shop_seeder'))
    await this.runSeeder(await import('#database/seeders/user_seeder'))
    await this.runSeeder(await import('#database/seeders/user_profile_seeder'))
    await this.runSeeder(await import('#database/seeders/role_seeder'))
    await this.runSeeder(await import('#database/seeders/permission_seeder'))
    await this.runSeeder(await import('#database/seeders/role_has_permission_seeder'))
    await this.runSeeder(await import('#database/seeders/user_has_permission_seeder'))
    await this.runSeeder(await import('#database/seeders/user_has_role_seeder'))
    await this.runSeeder(await import('#database/seeders/category_seeder'))
    await this.runSeeder(await import('#database/seeders/attribute_seeder'))
    await this.runSeeder(await import('#database/seeders/product_seeder'))
    await this.runSeeder(await import('#database/seeders/variant_seeder'))
    await this.runSeeder(await import('#database/seeders/variant_images_seeder'))
  }
}