import mongoose from 'mongoose'

const ScoreSchema = new mongoose.Schema({
	// _id attribute of the owner user
	user_id: { type: String, required: true },
	// email attribute of the owner user
	user_email: { type: String, required: true },
	// the title of the exam, like N2-YYYY-MM
	title: { type: String, required: true },
	// the current total score of the exam, avoid duplicated calculation
	total_score: { type: Number, default: 0, required: true },
	vocabulary_score: { type: Number, default: 0, required: true },
	grammar_score: { type: Number, default: 0, required: true },
	reading_score: { type: Number, default: 0, required: true },
	listening_score: { type: Number, default: 0, required: true },
	vocabulary: {
		v1: { type: Number, default: 0, required: true },
		v2: { type: Number, default: 0, required: true },
		v3: { type: Number, default: 0, required: true },
		v4: { type: Number, default: 0, required: true },
		v5: { type: Number, default: 0, required: true },
		v6: { type: Number, default: 0, required: true },
	},
	grammar: {
		g7: { type: Number, default: 0, required: true },
		g8: { type: Number, default: 0, required: true },
		g9: { type: Number, default: 0, required: true },
	},
	reading: {
		r10: { type: Number, default: 0, required: true },
		r11_1: { type: Number, default: 0, required: true },
		r11_2: { type: Number, default: 0, required: true },
		r12: { type: Number, default: 0, required: true },
		r13: { type: Number, default: 0, required: true },
		r14: { type: Number, default: 0, required: true },
	},
	listening: {
		l1: { type: Number, default: 0, required: true },
		l2: { type: Number, default: 0, required: true },
		l3: { type: Number, default: 0, required: true },
		l4: { type: Number, default: 0, required: true },
		l5: { type: Number, default: 0, required: true },
	},
})

export const ScoreModel = mongoose.model('Score', ScoreSchema)

export const getScoreListByUserId = (id: String) =>
	ScoreModel.find({ user_id: id })
export const getScoreListByUserEmail = (email: String) =>
	ScoreModel.find({ user_email: email })
export const getScoreRecordById = (id: string) =>
	ScoreModel.findOne({ _id: id })
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

export const removeScoreRecord = (id: string) =>
	ScoreModel.findOneAndRemove({ _id: id })

export const updateScore = (id: string, record: Record<string, any>) =>
	ScoreModel.findOneAndUpdate({ _id: id }, record).then()
