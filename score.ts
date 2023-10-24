const baseURL = 'http://localhost:'
const port = 8082
const SERVER = baseURL + port

/**
 * The authentication was valid by the cookie, that's to say,
 * a user must log in first, then the score list data could be fetched.
 *
 * @returns the score list of the logged in user
 */
export const getScoreListByUserId = async () => {
	try {
		const res = await fetch(SERVER + '/api/score/list', {
			method: 'GET',
			credentials: 'include',
		})
		if (res.status === 200) {
			return await res.json()
		} else {
			const info = await res.text()
			throw new Error(info)
		}
	} catch (error) {
		console.error('[API-score-getScoreListByUserId] ', error)
		return []
	}
}

/**
 * Create a blank score record with the title specified. The user could
 * edit the details later. The sessionToken cookie must be included in
 * the request.
 * @param title the title of score record, cannot update later (too lazy to code this feature)
 * @returns newly created score record
 */
export const createBlankScoreRecord = async (title: string) => {
	try {
		if (!title) throw new Error('The title must be specified.')
		const res = await fetch(SERVER + '/api/score/create', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title }),
		})
		if (res.status === 200) {
			return await res.json()
		} else {
			const info = await res.text()
			throw new Error(info)
		}
	} catch (error) {
		console.error('[API-score-createBlankScoreRecord] ', error)
		return
	}
}

/**
 * Delete the user's own score record with a specified id.
 * The information can never be restored, so this maybe dangerous.
 * For security, the user must first login, and take the sessionToken cookie.
 * A user cannot delete any other's score record because this would be assured
 * by the service.
 * @param id the id of a user's own score record
 * @returns status code 200 | 400
 */
export const deleteScoreRecord = async (id: string) => {
	try {
		if (!id)
			throw new Error(
				'The score record id must be specified for deleting.'
			)
		const res = await fetch(SERVER + '/api/score/delete', {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id }),
		})
		if (res.status === 200) return 200
		else {
			const info = await res.text()
			throw new Error(info)
		}
	} catch (error) {
		console.error('[API-score-deleteScoreRecord] ', error)
		return 400
	}
}

/**
 * Update the information of a score record. Then the total score will be calculated by the server.
 * However, the score of each part will not be stored in the database, so when the page need to show 
 * the score of each part, you need to copy the `src/utils/index.ts` file, which includes several
 * function to analysis the data.
 * @param id _id attribute of the score record
 * @param scoreRecord The data should be get from server, then edit, then send to server.
 * @returns the updated information
 */
export const updateScoreRecord = async (
	id: string,
	scoreRecord: Record<string, any>
) => {
	try {
		if (!id)
			throw new Error(
				'An id attribute must be included in the request body json, refers to the score record _id, for authenticating.'
			)
		if (!scoreRecord) throw new Error('The data is needed.')
		const res = await fetch(SERVER + '/api/score/update', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id,
				scoreRecord,
			}),
		})
		if (res.status === 200) {
			return await res.json()
		} else {
			const info = await res.text()
			throw new Error(info)
		}
	} catch (error) {
		console.error('[API-score-updateScoreRecord] ', error)
		return
	}
}
