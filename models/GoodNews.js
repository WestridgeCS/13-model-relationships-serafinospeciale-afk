import mongoose from 'mongoose';

const goodNewsSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280
    },
    votes: {
      type: Number,
      default: 0
    },
    // Save a formatted date string so it’s “already formatted” in MongoDB
    dateLabel: {
      type: String,
      default: ''
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

// Set dateLabel automatically on create/save
goodNewsSchema.pre('save', function (next) {
  if (!this.dateLabel) {
    this.dateLabel = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).format(new Date());
  }
  next();
});

export const GoodNews = mongoose.model('GoodNews', goodNewsSchema);
