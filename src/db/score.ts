import mongoose from 'mongoose'

const ScoreSchema = new mongoose.Schema({
	vocabulary: {
		v1: { type: Number },
		v2: { type: Number },
		v3: { type: Number },
		v4: { type: Number },
		v5: { type: Number },
		v6: { type: Number },
	},
	grammar: {
		g7: { type: Number },
		g8: { type: Number },
		g9: { type: Number },
	},
	reading: {
		r10: { type: Number },
		r11_1: { type: Number },
		r11_2: { type: Number },
		r12: { type: Number },
		r13: { type: Number },
		r14: { type: Number },
	},
	listening: {
		l1: { type: Number },
		l2: { type: Number },
		l3: { type: Number },
		l4: { type: Number },
		l5: { type: Number },
	},
})

export const ScoreModel = mongoose.model('Score', ScoreSchema)
