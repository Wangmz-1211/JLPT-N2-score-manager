import express from 'express'
import { get, merge } from 'lodash'
import { getScoreRecordById } from '../db/score'

/**
 * The isOwner middleware must be invoked after [middleware-isAuthenticated],
 * because the dependence information is expected to be injected by that.
 *
 * The request apply this middleware must have an `id` in the request body, refers to
 * the `_id` attribute of the the score record.
 *
 * The target score information would be merged into the `req` by lodash with an attribute name
 * of `targetScoreRecord`. So it can be and should be resolved from the req
 * without sending another query request to the database.
 * @param req
 * @param res
 * @param next
 */
const isOwner = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		//  get identity from [middleware-isAuthenticated]
		const user: Record<string, any> = get(req, 'identity')!
		if (!user)
			throw new Error(
				'The isOwner middleware **must** be invoked after [middleware-isAuthenticated]'
			)
		let { id } = req.body
		if (!id)
			throw new Error(
				'An `id` attribute **must** be contained in the request body, refers to the score record id'
			)
		const targetScoreRecord = await getScoreRecordById(id)
		if (!targetScoreRecord)
			throw new Error(
				"The score record can't be found in the database. Maybe it has already been deleted or the id is fake."
			)
		if (targetScoreRecord.user_id !== user._id)
			throw new Error(
				'You do not have the privilege for doing such operation.'
			)
		merge(req, { targetScoreRecord })
		return next()
	} catch (error) {
		console.error('[middleware-isOwner]', error)
		return res.status(400).send(error)
	}
}

export default isOwner
