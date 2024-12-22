import mongoose from "mongoose";

const skillSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is a required field in Skills"],
        unique: [true, "This type of skill already exists"]
    },
    category:{
        type: String,
        required: [true, "Category is a required field in Skills"]
    },
    popularity:{
        type: Number,
        required: true,
        min: [1, "Popularity must be at least 1"], // Minimum value
        max: [100, "Popularity must be at most 100"], // Maximum value 
    }
},{
    timestamps: true
})

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;