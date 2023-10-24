import express from 'express'
import { get } from 'lodash'
import {
	createBlankScoreRecord,
	getScoreListByUserEmail,
	getScoreListByUserId,
	removeScoreRecord,
} from '../db/score'

/*
    The identity schema from isAuthenticated middleware:

    {
        "_id": "6536374fd776f08404ec54ae",
        "email": "foo@code.com",
        "username": "foo",
        "__v": 0,
        "avatar": "foo"
    }

*/

/**
 * Get the user's score list.
 * @param req
 * @param res
 * @returns the user's score list
 */
export const listByUserId = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		// the user information was injected to request by [middleware-isAuthenticated]
		const user: Record<string, string> = get(req, 'identity')!
		const scoreList = await getScoreListByUserId(user._id)
		return res.status(200).send(scoreList)
	} catch (error) {
		console.error('[Controller - listByUserId] ' + error)
		return res.status(400).send('unknown error')
	}
}
/**
 * Get the user's score list.
 * @param req
 * @param res
 * @returns the user's score list
 */
export const listByUserEmail = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		// the user information was injected to request by [middleware-isAuthenticated]
		const user: Record<string, string> = get(req, 'identity')!
		const scoreList = await getScoreListByUserEmail(user.email)
		return res.status(200).send(scoreList)
	} catch (error) {
		console.error('[Controller - listByUserEmail] ' + error)
		return res.status(400).send('unknown error')
	}
}

export const createScoreRecord = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		// authentication information from server
		const user: Record<string, string> = get(req, 'identity')!
		let { title } = req.body
		if (!title)
			return res
				.status(400)
				.send('the title should be specified, as Nx-YYYY-MM')
		const rec = await createBlankScoreRecord(user._id, user.email, title)
		console.log(rec)
		return res.send(rec)
	} catch (error) {
		console.error('[Controller - createScoreRecord] ', error)
		return res.status(400).send('unknown error')
	}
}

export const deleteScoreRecord = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		// get the target information from isOwner middleware
		const targetScoreRecord: Record<string, any> = get(
			req,
			'targetScoreRecord'
		)!
		await removeScoreRecord(targetScoreRecord._id)
		return res.sendStatus(200)
	} catch (error) {
		console.error('[Controller - deleteScoreRecord] ', error)
		return res.status(400).send('unknown error')
	}
}
