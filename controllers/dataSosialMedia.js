const { SocialMedia } = require("../models");

class SosialMediaController {
  static async createMedia(req, res) {
    const UserId = req.user.id;
    const { name, social_media_url } = req.body;
    try {
      const dataMedia = await SocialMedia.create({
        name,
        social_media_url,
        UserId,
      });
      res.status(200).json({ message: "Sosial media upload success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Sosial media upload failed" });
    }
  }

  static async getAllMedia(req, res) {
    try {
      const dataMedia = await SocialMedia.findAll({});
      res.status(200).json(dataMedia);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getMedia(req, res) {
    await SocialMedia.findAll({
      include: {
        model: User,
        attributes: ["id", "username", "profile_image_url"],
      },
    })
      .then((result) => {
        res.status(200).json({ social_medias: result });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }

  static async updateMedia(req, res) {
    const UserId = req.user.id;
    const id = req.params.socialMediaId;
    const { name, social_media_url } = req.body;
    let updateData = {
      name,
      social_media_url,
    };
    try {
      await SocialMedia.update(updateData, {
        where: {
          id,
        },
        returning: true,
      });
      res.status(200).json({ message: "sosial media edited successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static deleteMediaId(req, res) {
    const UserId = req.user.id;
    const id = req.params.socialMediaId;
    SocialMedia.destroy({
      where: {
        id,
      },
    });
    res
      .status(200)
      .json({ message: "Your sosial media has been successfully deleted" });
  }
  catch(error) {
    res.status(500).json(error);
  }
}

module.exports = SosialMediaController;
