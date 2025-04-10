import mongoose from 'mongoose';
const timetableSchema = new mongoose.Schema({
  Branch: { type: String, required: true },
  Year: { type: String, required: true },
  classroom: { type: String, required: true },
  TimeTable: {
    Monday: {
      type: Map,
      of: String 
    },
    Tuesday: {
      type: Map,
      of: String
    },
    Wednesday: {
      type: Map,
      of: String
    },
    Thursday: {
      type: Map,
      of: String
    },
    Friday: {
      type: Map,
      of: String
    },
    Saturday: {
      type: Map,
      of: String
    }
  }
});
const Timetable =mongoose.model.Timetable || mongoose.model('Timetable', timetableSchema);
export default Timetable;