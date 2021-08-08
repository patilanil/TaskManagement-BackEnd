const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName: { type: String, unique: true, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      enum: [
          "COMPLETED",
          "TODO",
      ],
      default: "TODO"
  },
    createdDate: { type: Date, default: Date.now }
});

taskSchema.post("save", async function (doc) {
    doc = doc.toJSON();
  });

module.exports = mongoose.model('Task', taskSchema);