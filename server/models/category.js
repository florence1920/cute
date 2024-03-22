// models/category.js

const mongoose = require('mongoose');

// Category 스키마 정의
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number
  }
});

// Category 모델 생성
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;