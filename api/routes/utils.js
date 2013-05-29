

module.exports = {
  send: function (res, data) {
    res.end(JSON.stringify(data));
  },
  formatRows: function (rows, table) {
    rows.forEach(function (row){
      (table).forEach(function (prop) {
          row[prop] = row[prop] === 1;
      });
    });

    return rows;
  }
};
