import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated'
import {
	createScoreRecord,
	deleteScoreRecord,
	listByUserId,
	updateScoreRecord,
} from '../controller/score'
import isOwner from '../middlewares/isOwner'

const scoreRouter = express.Router()
scoreRouter.use(isAuthenticated)

scoreRouter.get('/score/list', listByUserId)
scoreRouter.post('/score/create', createScoreRecord)
scoreRouter.post('/score/update', isOwner, updateScoreRecord)
scoreRouter.delete('/score/delete', isOwner, deleteScoreRecord)

export default scoreRouter
