import express from 'express'
import {registerBookController,bookControlller,singleBookController} from '../controllers/bookController.js'


//router object
const router = express.Router()

//routing
//REGISTER METHOD POST
router.post('/register',registerBookController)
router.get('/books',bookControlller)
router.get("/single-book/:slug", singleBookController);




export default router