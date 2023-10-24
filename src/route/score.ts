import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated'
import { listByUserId } from '../controller/score'

const scoreRouter = express.Router()
scoreRouter.use(isAuthenticated)

scoreRouter.get('/score/list', listByUserId)

export default scoreRouter
