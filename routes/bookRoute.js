import express from 'express'
import {registerBookController,bookControlller,} from '../controllers/bookController.js'


//router object
const router = express.Router()

//routing
//REGISTER METHOD POST
router.post('/register',registerBookController)
router.get('/books',bookControlller)




export default router