const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Type:ObjectId } = Schema; // 타입을 가져옴
// noSQL은 직접 키값이 들어감 _id
const commentSchema = new Schema({
    writer:{
        type: ObjectId,  // 객체의 아이디를 참조하겠다.
        required: true,
        ref: "User" // 참조하는 스키마 (외래키가 될 수 있음)
    },
    comment:{
        type: String,
        required: true
    },
    createAt:{
        type:Date,
        default: Date.now()
    }

});


module.exports = mongoose.model("Comment", commentSchema);