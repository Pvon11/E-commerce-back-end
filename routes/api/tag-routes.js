const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, attributes: ["product_name"] }],
    });

    if (!tags) return res.status(404).json({ message: "No Tags found!" });

    return res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) return res.status(404).json({ message: "No tag found!" });

    return res.status(200).json(tag);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);

    if (!newTag)
      return res.status(404).json({ message: "Tag was not created!" });

    return res.status(200).json(newTag);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedTag)
      return res.status(404).json({ message: "Tag was not created!" });

    return res.status(200).json(updatedTag);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTag)
      return res.status(404).json({ message: "Tag could not be found!" });

    return res.status(200).json(deletedTag);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
