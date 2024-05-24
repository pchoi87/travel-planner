const Traveller = require('./Traveller');
const Location = require('./Location');
const Trip = require('./Trip');

// Associations
Traveller.belongsToMany(Location, {
  through: Trip,
  foreignKey: 'traveller_id',
});

Location.belongsToMany(Traveller, {
  through: Trip,
  foreignKey: 'location_id',
});

module.exports = { Traveller, Location, Trip };
