import {Router} from "express";

const router = Router()

router.get('/', (req, res) => res.json({hello:'world'}))

router.use('/status', require('./status').default)

export default router
