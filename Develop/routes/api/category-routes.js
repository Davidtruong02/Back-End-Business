const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories
  try{
    const categoryData = await Category.findAll({include:Product});
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: { category_id: req.params.id },
    include: Product 
  })
    .then((foundCategory) => {
      if (!foundCategory) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.json(foundCategory); 
    })
    .catch((err) => { res.status(500).json(err); } ); 
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((newCategory) => res.status(200).json(newCategory))
    .catch((err) => res.status(400).json(err));
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { category_id: req.params.id }
  })
    .then((updatedCategory) => {
      if (!updatedCategory) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.json(updatedCategory);
    })
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { category_id: req.params.id }
  })
    .then((deletedCategory) => {
      if (!deletedCategory) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.json(deletedCategory);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;