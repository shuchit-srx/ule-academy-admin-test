import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    section: { type: String, enum: ['A', 'B'], required: true },
    qId: { type: Number, required: true },
    text: { type: String, required: true },

    options: [{ label: String, value: String }],
    correctOption: { type: String },

    olqName: String,
    factor: { type: String, enum: ['I', 'II', 'III', 'IV'] }
});

export default mongoose.model('Question', questionSchema);
