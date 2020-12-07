const gameList = require('./games/list');

module.exports = () => {
  let routes = {
    gameList,
  };
  return routes;
};
