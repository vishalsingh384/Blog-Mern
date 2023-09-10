const mongoose=require('mongoose');
const {Schema}=mongoose;

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        min:4,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:4
    }
});

const UserModel=mongoose.model('User', UserSchema);
module.exports=UserModel;
