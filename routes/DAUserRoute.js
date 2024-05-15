import express from 'express'
import { registerDAUserController, singleDAUserController, DAUserControlller } from '../controllers/DAUsersController.js'
//router object
const router = express.Router()

//routing
//REGISTER METHOD POST
router.post('/register',registerDAUserController)
router.get('/user',DAUserControlller)
router.get('/singleuser/:slug', singleDAUserController);


export default router