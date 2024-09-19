const router = require('express').Router();
const { Book } = require('../../models');

// GET all locations
router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll();
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single book
router.get('/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      // include: [{ model: Traveller, through: Trip, as: 'location_travellers' }]
    });

    if (!bookData) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a book
router.post('/', async (req, res) => {
  try {
    const bookData = await Book.create(req.body);
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:isbn', (req, res) => {
  // Calls the update method on the Book model
  Book.update(
    {
      // All the fields you can update and the data attached to the request body.
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      edition: req.body.edition,
      is_paperback: req.body.is_paperback
    },
    {
      // Gets the books based on the isbn given in the request parameters
      where: {
        isbn: req.params.isbn
      }
    }
  )
    .then((updatedBook) => {
      // Sends the updated book as a json response
      res.json(updatedBook);
    })
    .catch((err) => res.json(err));
});

// DELETE a book
router.delete('/:id', async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!bookData) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
