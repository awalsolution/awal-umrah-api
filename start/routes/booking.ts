import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const BookingController = () => import('#controllers/tenant/booking_controller')

router
  .group(() => {
    router.get('/', [BookingController, 'index'])
    router.post('/', [BookingController, 'create'])
    router.get('/:id', [BookingController, 'show'])
    router.put('/:id', [BookingController, 'update'])
    router.delete('/:id', [BookingController, 'destroy'])
  })
  .use([middleware.auth({ guards: ['api'] }), middleware.tenant()])
  .prefix('/api/v1/bookings')
