define([
  'jquery'
], function($) {

  var CFAgent = function(address, password) {
    this.address = address;
    this.password = password;
  };

  CFAgent.createFromServer = function(server) {
    return new CFAgent(server.get('address'), server.get('password'));
  };

  CFAgent.prototype.getDatasources = function(success, error) {
    return this._callAPI('getDatasources', {}, success, error);
  };

  CFAgent.prototype.setMySQL5 = function(db, success, error) {
    return this._callAPI('setMySQL5', db, success, error);
  };

  CFAgent.prototype.setDatasource = function(db, success, error) {
    var data = {
      name: db.get('name'),
      database: db.get('database'),
      host: db.get('host'),
      port: db.get('port') || 3306,
      username: db.get('username'),
      password: db.get('password'),
      description: db.get('description'),
      args: db.get('args'),
      enablemaxconnections: db.get('enablemaxconnections'),
      pooling: db.get('pooling'),
      timeout: db.get('timeout'),
      interval: db.get('interval'),
      disable: db.get('disable'),
      login_timeout: db.get('login_timeout'),
      enable_clob: db.get('enable_clob'),
      enable_blob: db.get('enable_blob'),
      buffer: db.get('buffer'),
      blob_buffer: db.get('blob_buffer'),
      disable_autogenkeys: db.get('disable_autogenkeys'),
      alter: db.get('alter'),
      grant: db.get('grant'),
      update: db.get('update'),
      delete: db.get('delete'),
      create: db.get('create'),
      storedproc: db.get('storedproc'),
      insert: db.get('insert'),
      drop: db.get('drop'),
      revoke: db.get('revoke'),
      select: db.get('select'),
      validationquery: db.get('validationQuery')
    };

    if( db.get('maxconnections') ) {
      data.maxconnections = db.get('maxconnections');
    }

    return this._callAPI('setMySQL5', data, success, error);
  };

  CFAgent.prototype.deleteDatasource = function(dbName, success, error) {
    return this._callAPI('deleteDatasource', {
      dsnname: dbName
    }, success, error);
  };

  CFAgent.prototype._callAPI = function(method, params, success, error) {
    return $.ajax({
      dataType: 'jsonp',
      url: this.address,
      data: $.extend({
        method: 'handleRequest',
        api_method: method,
        admin_password: this.password
      }, params),
      success: success,
      error: error
    });
  };

  return CFAgent;

});