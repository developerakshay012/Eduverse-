
import express from 'express'
import { contactUsController } from '../controllers/ContactUs.js';

const conRouter = express.Router()
conRouter.post("/contactUs", contactUsController);

export default conRouter;