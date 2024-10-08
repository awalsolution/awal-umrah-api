import db from '@adonisjs/lucid/services/db'
import env from '#start/env'

export const tenantConnectionPatch = async (db_name: string) => {
  db.manager.patch('tenant', {
    client: 'mysql2',
    connection: {
      host: env.get('DB_HOST'),
      port: env.get('DB_PORT'),
      user: env.get('DB_USER'),
      password: env.get('DB_PASSWORD'),
      database: db_name,
    },
    migrations: {
      naturalSort: true,
      paths: ['database/migrations/tenant'],
    },
  })
}
