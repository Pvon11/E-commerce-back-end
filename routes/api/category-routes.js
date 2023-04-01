const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product, attributes: ["product_name"] }],
    });

    if (!categories)
      return res.status(404).json({ message: "No Categories found!" });

    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category)
      return res.status(404).json({ message: "No category found!" });

    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);

    if (!newCategory)
      return res.status(404).json({ message: "Category was not created!" });

    return res.status(200).json(newCategory);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedCategory)
      return res.status(404).json({ message: "Category was not created!" });

    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  // update a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategory)
      return res.status(404).json({ message: "Category could not be found!" });

    return res.status(200).json(deletedCategory);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
