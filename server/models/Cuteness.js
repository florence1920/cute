const mongoose = require("mongoose");

// 스키마 정의
const cutenessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  cutePoint: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

// 모델 생성 및 내보내기
module.exports = mongoose.model("Cuteness", cutenessSchema);
