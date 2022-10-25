const router = require("express").Router();

const CommentController = require("../controllers/dataComment");
const PhotoController = require("../controllers/DataPhoto");
const SosialMediaController = require("../controllers/dataSosialMedia");
const UserController = require("../controllers/userControllers");
const authentication = require("../middlewares/authentication");
const commentAuthorize = require("../middlewares/commentAuthorize");
const photoAuthorize = require("../middlewares/photoAuthorize");
const socialMediaAuthorize = require("../middlewares/sosialAuthorize");
const userAuthorize = require("../middlewares/userAuthorize");
const socialmedia = require("../models/socialmedia");

router.post("/users/register", UserController.registerUser);
router.post("/users/login", UserController.loginUser);

router.use(authentication);

router.use("/users/:userId", userAuthorize);
router.put("/users/:userId", UserController.editUser);

router.put("/photos", PhotoController.getIdPhotos);
router.post("/photos", PhotoController.createPhotos);
router.use("/photos/:photoId", photoAuthorize);
router.get("/photos/:photoId", PhotoController.getIdPhotos);
router.delete("/photos/:photoId", PhotoController.deletePhotoId);

router.put("/Comments", CommentController.updateCommentId);
router.post("/Comments", CommentController.createOneComment);
router.use("/comments/:commentId", commentAuthorize);
router.get("/Comments/:commentId", CommentController.getComments);
router.delete("/Comment/:commentId", CommentController.deleteCommentId);

router.post("/socialmedias/create", SosialMediaController.createMedia);
router.post("/socialmedias", SosialMediaController.getMedia);
router.get("/socialmedias", SosialMediaController.getAllMedia);
router.use("/socialmedias/:socialMediaId", socialMediaAuthorize);
router.put("/socialmedias/:socialMediaId", SosialMediaController.updateMedia);
router.delete(
  "/socialmedias/:socialMediaId",
  SosialMediaController.deleteMediaId
);

module.exports = router;
