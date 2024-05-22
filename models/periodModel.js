import mongoose from "mongoose"
 const periodSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date_p_i: {//son las fechas del periodo de que se puede reservar
      type: String
      
    },
    date_p_f: {
      type: String
      
    },
    date_r_i: {//son las fechas en que las aulas estan reservadas
      type: String,
      
    },
    date_r_f: {
        type: String
        
    },
    slug: {
      type: String,
      lowercase: true,
    },
    role: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("periods", periodSchema);


