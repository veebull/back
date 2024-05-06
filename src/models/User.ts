import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  tgUserId: { type: Number, required: true, unique: true, default: '' },
  firstName: { type: String, required: true, default: '' },
  isSubscribed: { type: Boolean, required: false, default: false },
  is_bot: { type: Boolean, required: false, default: null },
  username: { type: String, required: false, default: '' },
  languageCode: { type: String, required: false, default: '' },
  dataGame: {
    name: { type: String, required: false, default: '' },
    totalTaps: { type: Number, required: false, default: 0 },
    achievements: { type: [], required: false, default: [] },
    tasks: { type: [], required: false, default: [] },
    referalLink: { type: String, required: false, default: '' },
    byReferral: { type: Number, required: false, default: 0 },
    annexedByRef: { type: [], required: false, default: [] },
  }
})

const User = mongoose.model('User', userSchema);
export default User;