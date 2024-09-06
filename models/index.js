const Book = require('./Books');
const Club = require('./Clubs');
const Member = require('./Members');
const Library = require('./Libraries');
const Memberlist = require('./Memberlists')

Book.belongsToMany(Club, {

  through: {
    model: Library,
    unique: false
  },

});

Club.belongsToMany(Book, {
  through: {
    model: Library,
    unique: false
  },
});

Club.hasOne(Member, {
  as: 'host'
})

Club.belongsToMany(Member, {
  through: {
    model: Memberlist,
    unique: false

});

Member.belongsToMany(Club, {
  through: {
    model: Memberlist,
    unique: false

});


module.exports = { Book, Club, Member, Library };
