const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const multer = require("multer");
const Cuteness = require("../models/Cuteness");

// Multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 파일이 저장될 경로 지정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 저장될 파일의 이름 지정
  },
});

const upload = multer({ storage: storage });

// GET /categories - 모든 카테고리 정보 가져오기
router.get("/", async (req, res, next) => {
  try {
    const categories = await Cuteness.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// GET 요청 처리 - 특정 아이템의 정보 가져오기
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const item = await Cuteness.findById(id); // MongoDB에서 해당 ID의 아이템을 찾습니다.

    if (item) {
      // 아이템을 찾았으면 클라이언트에 해당 아이템의 정보를 반환합니다.
      res.status(200).json(item);
    } else {
      // 아이템을 찾지 못했을 경우 에러 메시지를 반환합니다.
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT 요청 처리 - 특정 아이템 업데이트
router.put("/:id", upload.single("picture"), async (req, res) => {
  try {
    const { id } = req.params;
    // 클라이언트로부터 받은 업데이트할 데이터
    const { name, cutePoint, category, rate } = req.body;
    // 업데이트할 사진이 있는 경우에만 새로운 사진 경로 설정
    const newPicturePath = req.file
      ? req.file.path.replace(/uploads\\/, "")
      : null;

    // 업데이트할 데이터 생성
    const updatedData = {
      name,
      cutePoint,
      category,
      rate,
    };
    // 사진이 있는 경우만 사진 경로 업데이트
    if (newPicturePath) {
      updatedData.picture = newPicturePath;
    }
    console.log("id" + id);
    // // 클라이언트에서 전달된 ID 값을 ObjectId로 변환
    // const objectId = new ObjectId(id);
    // console.log("obid" + objectId);

    // MongoDB에서 해당 ID의 아이템을 업데이트합니다.
    const result = await Cuteness.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (result) {
      // 업데이트가 성공했을 경우 클라이언트에 업데이트된 아이템 정보를 반환합니다.
      res
        .status(200)
        .json({ message: "Item updated successfully", data: result });
    } else {
      // 업데이트가 실패한 경우 해당 아이템을 찾을 수 없음을 반환합니다.
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST 요청 처리
router.post("/", upload.single("picture"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    // 클라이언트로부터 받은 데이터
    const { name, cutePoint, category, rate } = req.body;
    const newPicturePath = req.file.path.replace(/uploads\\/, "");
    // MongoDB에 저장할 데이터 생성
    const newData = {
      picture: newPicturePath,
      name,
      cutePoint,
      category,
      rate,
    };

    // MongoDB에 데이터 저장
    const result = await Cuteness.create(newData); // Cuteness 모델 사용

    // 클라이언트에 응답 전송
    res.status(201).json({ message: "Data saved successfully", data: result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE 요청 처리 - 특정 아이템 삭제
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // MongoDB에서 해당 ID의 아이템을 삭제합니다.
    const result = await Cuteness.findByIdAndDelete(id);

    if (result) {
      // 삭제가 성공했을 경우 클라이언트에 성공 메시지를 반환합니다.
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      // 삭제가 실패한 경우 해당 아이템을 찾을 수 없음을 반환합니다.
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
