import mongoose from 'mongoose';

const CellSchema = new mongoose.Schema({
  day: { type: String, required: true },
  periodIndex: { type: Number, required: true },
  subject: { type: String, default: '' },
  teacher: { type: String, default: '' },
  color: { type: String, default: '#9ccee7' },
});

const RoutineSchema = new mongoose.Schema({
  title: { type: String, default: 'Class Routine' },
  periods: [
    {
      label: String,
      title: String,
    },
  ],
  daysOrder: [String],
  cells: [CellSchema],
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.models.Routine ||
  mongoose.model('Routine', RoutineSchema);
