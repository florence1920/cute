const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// GET /categories - 모든 카테고리 정보 가져오기
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// POST /categories - 새로운 카테고리 추가
router.post("/", async (req, res, next) => {
  try {
    // 요청으로부터 데이터 추출
    const { title, count } = req.body;

    // 새로운 카테고리 생성
    const newCategory = new Category({
      title,
      count,
    });

    // MongoDB에 저장
    const savedCategory = await newCategory.save();

    // 클라이언트에 응답
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error); // 에러 발생 시 다음 미들웨어로 전달합니다.
  }
});

module.exports = router;
