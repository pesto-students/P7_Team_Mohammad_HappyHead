import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the UserToolsSchema
const UserToolsSchema = mongoose.Schema({
  type: {
    type: Array,
    enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
    required: true,
  },
});

// Define the UserAnswersSchema
const UserAnswersSchema = mongoose.Schema({
  question: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length === 26;
      },
      message: 'Questions array must have exactly 26 numbers.',
    },
  },
  answers: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length === 26;
      },
      message: 'Answers array must have exactly 26 numbers.',
    },
  },
  recommendations: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length === 26;
      },
      message: 'Recommendations array must have exactly 26 strings.',
    },
  },
});

// Define the UsersSchema
const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  toolsCompleted: UserToolsSchema,
  answers: UserAnswersSchema,
  bookedSlots: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expert',
    booked: { type: Boolean, default: false },
    expert: { type: Object, default: {} }
  }]
});

// Hash the password before saving
UsersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.hash_password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Create the Users model using the schema
const Users = mongoose.models.Users || mongoose.model('Users', UsersSchema);

export default Users;
