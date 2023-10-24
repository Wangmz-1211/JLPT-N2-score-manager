import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated'
import { createScoreRecord, listByUserId } from '../controller/score'

const scoreRouter = express.Router()
scoreRouter.use(isAuthenticated)

scoreRouter.get('/score/list', listByUserId)
scoreRouter.post('/score/create', createScoreRecord)

export default scoreRouter
