import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema(
    {
        candidate: {
            name: String,
            entry: String,
            attempt: Number
        },

        responses: {
            aptitude: { type: Map, of: String },
            olq: { type: Map, of: Number }
        },

        scores: {
            aptitudePercentage: Number,
            olqPercentage: Number,
            compatibility: Number
        }
    },
    { timestamps: true }
);

export default mongoose.model('Assessment', assessmentSchema);
