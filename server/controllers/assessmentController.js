import Assessment from '../models/Assessment.js'
import Question from '../models/Question.js'

export const listAssessments = async (req, res) => {
    const { entry, sort } = req.query

    const query = {}
    if (entry) query['candidate.entry'] = entry

    let q = Assessment.find(query).select('candidate scores createdAt')

    q = sort === 'compatibility'
        ? q.sort({ 'scores.compatibility': -1 })
        : q.sort({ createdAt: -1 })

    res.json(await q)
}

export const getAssessmentReport = async (req, res) => {
    const assessment = await Assessment.findById(req.params.id)
    if (!assessment) return res.sendStatus(404)

    const questions = await Question.find()

    const aptitude = questions
        .filter(q => q.section === 'A')
        .map(q => {
            const chosen = assessment.responses.aptitude.get(String(q.qId))
            return {
                qId: q.qId,
                text: q.text,
                correct: q.correctOption,
                chosen,
                isCorrect: chosen === q.correctOption
            }
        })

    const olq = questions
        .filter(q => q.section === 'B')
        .map(q => ({
            qId: q.qId,
            name: q.olqName,
            factor: q.factor,
            score: assessment.responses.olq.get(String(q.qId))
        }))

    res.json({
        candidate: assessment.candidate,
        scores: assessment.scores,
        aptitude,
        olq
    })
}
