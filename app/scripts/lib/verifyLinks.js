define(
  [],
  function () {
    'use strict';

    var compare = function (db, data) {
      var compData = [];

      for (var key in data) {
        var val = {};
        if (!(data[key] instanceof Object)) {
          val[key] = data[key];
        } else {
          val = data[key];
        }

        for (var keyMap in val) {
          var keyToDb = keyMap.toLowerCase();
          if (!db.has(keyToDb)) {
            continue;
          }

          if (db.get(keyToDb) !== val[keyMap]) {
            if (!isNaN(val[keyMap]) && !isNaN(db.get(keyToDb)) &&
              parseInt(db.get(keyToDb), 10) === parseInt(val[keyMap], 10)
            ) {
              continue;
            }

            compData.push(keyMap + 's are different');
          }
        }
      }

      return compData;
    };



    var verify = function (cfagent, db, callback) {
      var ret = [];
      var dbName = db.get('name');
      var call = cfagent.getDatasource(dbName);

      var callFail = function (status) {
        ret.push(status);
        callback(ret);
      };

      var callError = function (xhr, error, status) {
        console.warn('HTTP Error: ' + xhr.status + ' ' + xhr.statusText, xhr, error, status);
        callFail(xhr.status + ' ' + xhr.statusText);
      };

      call.done(function (data) {
        if (!data.success) {
          callFail(data.status);
          return;
        }

        var comp = compare(db, data.data);
        if (comp.length) {
          callFail(comp.join('\n'));
          return;
        }

        var verifyDsn = cfagent.verifyDsn(dbName);
        verifyDsn.done(function (success) {
          if (!success) {
            callFail('DSN not verified');
            return;
          }
          callback(ret);
        });

        verifyDsn.fail(callError);

      });

      call.fail(callError);

    };

    return {
      verify: verify
    };
  }
);