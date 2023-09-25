const JaredRoute = (req, res) => {
  res.send('Name: Jared');
};

const RubenRoute = (req, res) => {
  res.send('Name: Ruben');
};

const PedroRoute = (req, res) => {
  res.send('Name: Pedro');
};

const normalRoute = (req, res) => {
  res.send('Home page');
};

module.exports = {
  JaredRoute,
  RubenRoute,
  PedroRoute,
  normalRoute,
};