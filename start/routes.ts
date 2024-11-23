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

router.get('/', async ({ response }) => {
  response.ok({
    code: 200,
    data: "Awal Umrah Management System REST API's is Started.",
  })
})

router.post('/api/v1/tenant-register', [AuthController, 'tenantRegister'])
router.post('/api/v1/upload', [UploadController, 'imageUploader'])
router.get('/api/v1/verify-domain/:name', [AuthController, 'verifyDomainName'])

import '#start/routes/agency'
import '#start/routes/booking'
import '#start/routes/menu'
import '#start/routes/auth'
import '#start/routes/user'
import '#start/routes/plan'
import '#start/routes/role'
import '#start/routes/permission'
import '#start/routes/tenant'
