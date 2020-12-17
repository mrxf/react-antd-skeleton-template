const gameList = require('./games/list');
const companyList = require('./company/list');

module.exports = () => {
  let routes = {
    gameList,
    companyList,
  };
  return routes;
};
