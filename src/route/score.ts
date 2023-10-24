import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated'
import {
	createScoreRecord,
	deleteScoreRecord,
	listByUserId,
} from '../controller/score'
import isOwner from '../middlewares/isOwner'

const scoreRouter = express.Router()
scoreRouter.use(isAuthenticated)

scoreRouter.get('/score/list', listByUserId)
scoreRouter.post('/score/create', createScoreRecord)
scoreRouter.delete('/score/delete', isOwner, deleteScoreRecord)

export default scoreRouter
