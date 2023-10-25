import express from 'express'
import { get } from 'lodash'
import {
	createBlankScoreRecord,
	getScoreListByUserEmail,
	getScoreListByUserId,
	getScoreRecordById,
	removeScoreRecord,
	updateScore,
} from '../db/score'
import {
	vocabularyPart,
	grammarPart,
	readingPart,
	listeningPart,
} from '../utils'

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

/**
 * Create a blank score record in the database, then return it.
 * @param req
 * @param res
 * @returns the score record obj
 */
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

/**
 * Delete a user's score record.
 * @isAuthenticated
 * @isOwner
 * @param req
 * @param res
 * @returns status code
 */
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

/**
 * Update the ScoreRecord
 * @isAuthenticated
 * @isOwner
 * @param req
 * @param res
 * @returns
 */
export const updateScoreRecord = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		// get the target information from isOwner middleware
		// This is the information before update
		const targetScoreRecord: Record<string, any> = get(
			req,
			'targetScoreRecord'
		)!
		let { scoreRecord } = req.body
		if (!scoreRecord)
			return res
				.status(400)
				.send(
					'The scoreRecord information must be contained in the request body!'
				)
		if (
			!(targetScoreRecord.user_id === scoreRecord.user_id) ||
			!(targetScoreRecord.user_email === scoreRecord.user_email)
		)
			return res
				.status(400)
				.send("The user information can't be updated.")
		console.log('DEBUG', targetScoreRecord, scoreRecord)
		// !if the schema changes, this statement may throw some error
		const vocabulary_score = vocabularyPart(scoreRecord.vocabulary),
			grammar_score      = grammarPart(scoreRecord.grammar),
			reading_score      = readingPart(scoreRecord.reading),
			listening_score    = listeningPart(scoreRecord.listening),
			total_score        =
				vocabulary_score +
				grammar_score +
				reading_score +
				listening_score
		scoreRecord.vocabulary_score = vocabulary_score
		scoreRecord.grammar_score    = grammar_score
		scoreRecord.reading_score    = reading_score
		scoreRecord.listening_score  = listening_score
		// I don't know why this would return the record before update.
		// May be the findAndUpdate api is run recursively, from outer layer to inner layer.
		// The result would return before the inner object updates.
		// So the return information needs another query.
		await updateScore(scoreRecord._id, scoreRecord)
		const updatedScoreRecord = await getScoreRecordById(scoreRecord._id)
		return res.status(200).send(updatedScoreRecord)
	} catch (error) {
		console.error('[Controller - updateScoreRecord] ', error)
		return res.status(400).send('unknown error')
	}
}
