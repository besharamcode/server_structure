import express from "express";
import { errorHandler } from "../utils/ErrorHandler.js";
import {
  orderConfirm,
  orderImgUpload,
} from "../controllers/order.controllers.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router
  .route("/upload")
  .post(upload.single("transactionReceipt"), orderImgUpload);
router.route("/create").post(orderConfirm);

router.use(errorHandler);
export default router;
