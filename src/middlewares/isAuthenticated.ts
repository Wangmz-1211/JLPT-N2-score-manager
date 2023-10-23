import express from 'express'
import { merge } from 'lodash'
import { authenticateStatus } from '../api/authentication'

export const isAuthenticated = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		let { sessionToken } = req.cookies
		if (!sessionToken) return res.status(403).send("You haven't logged in.")
		const user = await authenticateStatus()
		if (!user) return res.status(403).send("session token doesn't exist")
		merge(req, { identity: user })
		return next()
	} catch (error) {
		console.log(error)
		return res.status(400).send('unknown error occurs')
	}
}

export default isAuthenticated
