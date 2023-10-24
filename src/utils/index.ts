const vocabularyPart = (vocabulary: Record<string, number>) => {
	let ans = 0
	ans += vocabulary.v1
	ans += vocabulary.v2
	ans += vocabulary.v3
	ans += vocabulary.v4
	ans += vocabulary.v5
	ans += vocabulary.v6 * 2
	ans += 60 / 59
	return ans
}

const grammarPart = (grammar: Record<string, number>) => {
	let ans = 0
	ans += grammar.g7
	ans += grammar.g8
	ans += grammar.g9
	ans *= 60 / 59
	return ans
}

const readingPart = (reading: Record<string, number>) => {
	let ans = 0
	ans += reading.r10 * 2
	ans += reading.r11_1 * 2
	ans += reading.r11_2 * 3
	ans += reading.r12 * 3
	ans += reading.r13 * 4
	ans += reading.r14 * 3
	ans += 60 / 55
	return ans
}

const listeningPart = (listening: Record<string, number>) => {
	let ans = 0
	ans += listening.l1 * 2
	ans += listening.l2 * 2
	ans += listening.l3 * 2
	ans += listening.l4 * 1
	ans += listening.l5 * 3
	ans *= 60 / 56
	return ans
}

export const totalScoreCalculator = (scoreRecord: Record<string, any>) => {
	let { vocabulary, grammar, reading, listening } = scoreRecord
	const vocabularyScore = vocabularyPart(vocabulary),
		grammarScore = grammarPart(grammar),
		readingScore = readingPart(reading),
		listeningScore = listeningPart(listening),
		totalScore =
			vocabularyScore + grammarScore + readingScore + listeningScore
	return totalScore
}
