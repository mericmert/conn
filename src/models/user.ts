import {Schema, model, models} from "mongoose";


const userSchema = new Schema({
    
    full_name : {
        type: String,
        unqiue : false,
        required : [true, "Full name is required"]
    },
    email : {
        type : String,
        unique : true,
        required: [true, "Email is required"],
        minLength : [4, "Full name should be at least 2 characters"] 
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    }

})

const User = models?.User || model("User", userSchema);

export default User