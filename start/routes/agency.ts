import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AgencyController = () => import('#controllers/tenant/agency_controller')

router
  .group(() => {
    router.get('/', [AgencyController, 'index'])
    router.post('/', [AgencyController, 'create'])
    router.get('/:id', [AgencyController, 'show'])
    router.put('/:id', [AgencyController, 'update'])
    router.delete('/:id', [AgencyController, 'destroy'])
  })
  .use([middleware.auth({ guards: ['api'] }), middleware.tenant()])
  .prefix('/api/v1/agencies')
