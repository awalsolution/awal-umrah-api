import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Permission from '#models/permission'

export default class extends BaseSeeder {
  async run() {
    await Permission.createMany([
      {
        name: 'dashboard menu',
        type: 'public',
      },
      {
        name: 'tenant menu',
        type: 'private',
      },
      {
        name: 'tenant create',
        type: 'private',
      },
      {
        name: 'tenant update',
        type: 'private',
      },
      {
        name: 'tenant delete',
        type: 'private',
      },
      {
        name: 'plan menu',
        type: 'private',
      },
      {
        name: 'plan create',
        type: 'private',
      },
      {
        name: 'plan update',
        type: 'private',
      },
      {
        name: 'plan delete',
        type: 'private',
      },
      {
        name: 'permission menu',
        type: 'public',
      },
      {
        name: 'permission create',
        type: 'private',
      },
      {
        name: 'permission update',
        type: 'private',
      },
      {
        name: 'permission delete',
        type: 'private',
      },
      {
        name: 'assign permission menu',
        type: 'public',
      },
      {
        name: 'user menu',
        type: 'public',
      },
      {
        name: 'user create',
        type: 'public',
      },
      {
        name: 'user update',
        type: 'public',
      },
      {
        name: 'user delete',
        type: 'public',
      },
      {
        name: 'user profile',
        type: 'public',
      },
      {
        name: 'user assign permission',
        type: 'public',
      },
      {
        name: 'role menu',
        type: 'public',
      },
      {
        name: 'role create',
        type: 'public',
      },
      {
        name: 'role update',
        type: 'public',
      },
      {
        name: 'role delete',
        type: 'public',
      },
      {
        name: 'role assign permission',
        type: 'public',
      },
      {
        name: 'agency menu',
        type: 'public',
      },
      {
        name: 'agency create',
        type: 'public',
      },
      {
        name: 'agency update',
        type: 'public',
      },
      {
        name: 'agency delete',
        type: 'public',
      },
      {
        name: 'booking menu',
        type: 'public',
      },
      {
        name: 'booking create',
        type: 'public',
      },
      {
        name: 'booking update',
        type: 'public',
      },
      {
        name: 'booking delete',
        type: 'public',
      },
      {
        name: 'booking edit member',
        type: 'public',
      },
      {
        name: 'booking assign hotel',
        type: 'public',
      },
      {
        name: 'booking print',
        type: 'public',
      },
      {
        name: 'hotel menu',
        type: 'public',
      },
      {
        name: 'hotel create',
        type: 'public',
      },
      {
        name: 'hotel update',
        type: 'public',
      },
      {
        name: 'hotel delete',
        type: 'public',
      },
      {
        name: 'room menu',
        type: 'public',
      },
      {
        name: 'room create',
        type: 'public',
      },
      {
        name: 'room update',
        type: 'public',
      },
      {
        name: 'room delete',
        type: 'public',
      },
      {
        name: 'bed menu',
        type: 'public',
      },
      {
        name: 'bed create',
        type: 'public',
      },
      {
        name: 'bed update',
        type: 'public',
      },
      {
        name: 'bed delete',
        type: 'public',
      },
      {
        name: 'visa menu',
        type: 'public',
      },
      {
        name: 'visa create',
        type: 'public',
      },
      {
        name: 'visa update',
        type: 'public',
      },
      {
        name: 'visa delete',
        type: 'public',
      },
      {
        name: 'visa companies menu',
        type: 'public',
      },
      {
        name: 'visa companies create',
        type: 'public',
      },
      {
        name: 'visa companies update',
        type: 'public',
      },
      {
        name: 'visa companies delete',
        type: 'public',
      },
      {
        name: 'air line menu',
        type: 'public',
      },
      {
        name: 'air line create',
        type: 'public',
      },
      {
        name: 'air line update',
        type: 'public',
      },
      {
        name: 'air line delete',
        type: 'public',
      },
    ])
  }
}
