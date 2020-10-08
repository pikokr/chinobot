import {Router} from "express";

const router = Router()

router.use('/status', require('./status').default)

export default router
