const router = require('express').Router();
const { Member, Club } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('home');
  });

  router.get('/about', (req, res) => {
    res.render('about');
  });

router.get('/profile', withAuth, async (req, res) => {
   try {
    const member = await Member.findByPk(req.session.memberId, {
      include: [
        {
          model: Club,
          as: 'clubs',
          attributes: ['name', 'id']
        },
      ],
    });

    if (!member) {
      res.status(404).json({ message: 'No member found with this id!' });
      return;
    }

    res.render('profile', {
      member: member.toJSON(),
      clubs: member.clubs,
     });

  } catch (err) {
    console.error('Error fetching page:', err);
    res.status(500).json(err);
  }
});

module.exports = router;