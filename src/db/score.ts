import mongoose from 'mongoose'

const ScoreSchema = new mongoose.Schema({
	// _id attribute of the owner user
	user_id: { type: String, required: true },
	// email attribute of the owner user
	user_email: { type: String, required: true },
	// the title of the exam, like N2-YYYY-MM
	title: { type: String, required: true },
	// the current total score of the exam, avoid duplicated calculation
	total_score: { type: Number, default: 0 },
	vocabulary: {
		v1: { type: Number, default: 0 },
		v2: { type: Number, default: 0 },
		v3: { type: Number, default: 0 },
		v4: { type: Number, default: 0 },
		v5: { type: Number, default: 0 },
		v6: { type: Number, default: 0 },
	},
	grammar: {
		g7: { type: Number, default: 0 },
		g8: { type: Number, default: 0 },
		g9: { type: Number, default: 0 },
	},
	reading: {
		r10: { type: Number, default: 0 },
		r11_1: { type: Number, default: 0 },
		r11_2: { type: Number, default: 0 },
		r12: { type: Number, default: 0 },
		r13: { type: Number, default: 0 },
		r14: { type: Number, default: 0 },
	},
	listening: {
		l1: { type: Number, default: 0 },
		l2: { type: Number, default: 0 },
		l3: { type: Number, default: 0 },
		l4: { type: Number, default: 0 },
		l5: { type: Number, default: 0 },
	},
})

export const ScoreModel = mongoose.model('Score', ScoreSchema)

export const getScoreListByUserId = (id: String) =>
	ScoreModel.find({ user_id: id })
export const getScoreListByUserEmail = (email: String) =>
	ScoreModel.find({ user_email: email })
export const createBlankScoreRecord = (
	user_id: string,
	user_email: string,
	title: string
) =>
	new ScoreModel({
		user_id,
		user_email,
		title,
	}).save()

export const deleteScoreRecord = (id: string) =>
	ScoreModel.findOneAndRemove({ _id: id })
