

module.exports = {
  send: function (res, data) {
    res.end(JSON.stringify(data));
  }
};
