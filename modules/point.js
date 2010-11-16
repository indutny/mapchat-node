/**
* Initiates point model
*/
db.mongoose.model({
  properties: ['location', 'topic', 'author_id', 'updated_at'],
  indexes: {
    'location': '2d',
    'updated_at': -1,
    'author_id': 1
  }
});

db.models.Point = db.model('Point');
