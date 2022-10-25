const { Photo, User } = require("../models");

class PhotoController {
  static async getAllPhotos(res) {
    try {
      const dataPhotos = await Photo.findAll();
      res.status(200).json(dataPhotos);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getIdPhotos(req, res) {
    const id = req.params.photoId;
    try {
      const dataPhotos = await Photo.findOne({
        where: {
          id,
        },
      });
      res.status(200).json(dataPhotos);
    } catch (error) {
      console.log(error);
    }
  }

  static async createPhotos(req, res) {
    const userId = req.user.id;
    const { title, caption, poster_image_url } = req.body;
    try {
      await Photo.create({
        title,
        caption,
        poster_image_url,
        UserId: userId,
      });
      res.status(200).json({ message: "photo created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "there is incomplete data" });
    }
  }

  static async updatePhotos(req, res) {
    let id = req.params.id;
    const { tittle, caption, poster_image_url } = req.body;
    let editData = {
      tittle,
      caption,
      poster_image_url,
    };
    Photo.update(editData, {
      where: {
        id,
      },
      returning: true,
    });
    res.status(200).json({ message: "photo data edited successfully" });
  }
  catch(error) {
    res.status(500).json(error);
  }

  static deletePhotoId(req, res) {
    let id = req.params.id;
    Photo.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "data deleted successfully" });
  }
  catch(error) {
    res.status(500).json(error);
  }
}

module.exports = PhotoController;
