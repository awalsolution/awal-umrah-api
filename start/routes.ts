/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')
const UploadController = () => import('#controllers/upload_controller')

const AgencyController = () => import('#controllers/tenant/agency_controller')
const VisaCompanyController = () => import('#controllers/tenant/visa_company_controller')
const AirLineController = () => import('#controllers/tenant/air_line_controller')
const BookingController = () => import('#controllers/tenant/booking_controller')
const HotelController = () => import('#controllers/tenant/hotel_controller')
const RoomController = () => import('#controllers/tenant/room_controller')
const BedController = () => import('#controllers/tenant/bed_controller')

router.get('/', async ({ response }) => {
  response.ok({
    code: 200,
    data: "Awal HR Management System REST API's is Started.",
  })
})

router.post('/api/v1/tenant-register', [AuthController, 'tenantRegister'])
router.post('/api/v1/upload', [UploadController, 'imageUploader'])
router.get('/api/v1/verify-domain/:name', [AuthController, 'verifyDomainName'])

router.group(() => {
  // booking routes
  router
    .group(() => {
      router.get('/', [BookingController, 'index'])
      router.post('/', [BookingController, 'create'])
      router.get('/:id', [BookingController, 'show'])
      router.put('/:id', [BookingController, 'update'])
      router.delete('/:id', [BookingController, 'destroy'])
    })
    .use(middleware.auth({ guards: ['api'] }))
    .prefix('/booking')
  // hotel routes
  router
    .group(() => {
      router.get('/', [HotelController, 'index'])
      router.post('/', [HotelController, 'create'])
      router.get('/:id', [HotelController, 'show'])
      router.put('/:id', [HotelController, 'update'])
      router.delete('/:id', [HotelController, 'destroy'])
    })
    .use(middleware.auth({ guards: ['api'] }))
    .prefix('/hotel')
  // room routes
  router
    .group(() => {
      router.get('/', [RoomController, 'index'])
      router.post('/', [RoomController, 'create'])
      router.get('/:id', [RoomController, 'show'])
      router.put('/:id', [RoomController, 'update'])
      router.delete('/:id', [RoomController, 'destroy'])
    })
    .use(middleware.auth({ guards: ['api'] }))
    .prefix('/room')
  // bed routes
  router
    .group(() => {
      router.get('/', [BedController, 'index'])
    })
    .use(middleware.auth({ guards: ['api'] }))
    .prefix('/bed')
  // agencies routes
  router
    .group(() => {
      router.get('/', [AgencyController, 'index'])
      router.post('/', [AgencyController, 'create'])
      router.get('/:id', [AgencyController, 'show'])
      router.put('/:id', [AgencyController, 'update'])
      router.delete('/:id', [AgencyController, 'destroy'])
    })
    .use(middleware.auth({ guards: ['api'] }))
    .prefix('/agencies')
  // visa company routes
  router
    .group(() => {
      router.get('/', [VisaCompanyController, 'index'])
      router.post('/', [VisaCompanyController, 'create'])
      router.get('/:id', [VisaCompanyController, 'show'])
      router.put('/:id', [VisaCompanyController, 'update'])
      router.delete('/:id', [VisaCompanyController, 'destroy'])
    })
    .use(middleware.auth({ guards: ['api'] }))
    .prefix('/visa-company')
  // air line routes
  router
    .group(() => {
      router.get('/', [AirLineController, 'index'])
      router.post('/', [AirLineController, 'create'])
      router.get('/:id', [AirLineController, 'show'])
      router.put('/:id', [AirLineController, 'update'])
      router.delete('/:id', [AirLineController, 'destroy'])
    })
    .use(middleware.auth({ guards: ['api'] }))
    .prefix('/air-line')
})

import '#start/routes/menu'
import '#start/routes/auth'
import '#start/routes/user'
import '#start/routes/plan'
import '#start/routes/role'
import '#start/routes/permission'
import '#start/routes/tenant'
