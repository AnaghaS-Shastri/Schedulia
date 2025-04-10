import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({    
    available:Array})
const Room = mongoose.models.Rooms || mongoose.model('Room', roomSchema);
export default Room;