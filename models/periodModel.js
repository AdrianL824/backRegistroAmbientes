import mongoose from "mongoose"
 const periodSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date_i: {
      type: String,
      
    },
    date_f: {
        type: String,
        
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("periods", periodSchema);


