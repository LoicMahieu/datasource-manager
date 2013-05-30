/**
*
* @author iGLOO
* @description
*
*/
component output="false" {

  variables.logged = false;
  variables.keyConvertion = ['timeout', 'interval'];

  remote any function handleRequest(required string api_method) {


    if( !_isRemoteMethod(api_method) ) {
      return _return({ succcess = false, error = 'access_denied' });
    }


    try {
      _login();
      var res = evaluate('this.#api_method#(argumentCollection = arguments)');
    } catch(any e) {
      return _handleError(e);
    }

    return _return( res );
  }

  remote void function dumpPublicMethods() {
    var md = getMetaData(_datasource());

    for( var i=1; i <= arrayLen(md.functions); i++ ) {
      var fn = md.functions[i];

      if( !structKeyExists(fn, 'access') || fn.access == 'public' ) {
        writeOutput("<h1>#fn.name#</h1>");



        writeDump(fn);
      }
    }

    var md = getMetaData(_datasource());

    for( var i=1; i <= arrayLen(md.functions); i++ ) {
      var fn = md.functions[i];

      if( fn.name == 'setMySQL5' ) {
        for( var j=1; j <= arrayLen(fn.parameters); j++ ) {
          var param = fn.parameters[j];

          if( param.required ) {
            writeOutput('required ');
          }
          writeOutput(param.type & ' ');
          writeOutput(param.name & '');

          if( structKeyExists(param, 'default') && len(param.default) ) {
            if( isNumeric(param.default) ) {
              writeOutput(' = ' & param.default);
              } else {
                writeOutput(' = "' & param.default & '"');
              }
          }

          writeOutput(', ');

          if( structKeyExists(param, 'hint') && len(param.hint) ) {
            writeOutput('                     // ' & param.hint);
          } 

          writeOutput(chr(10));
          
        }

        abort;
      }
    }



    abort;
  }

  remote struct function setMySQL5(
    required string name,                 // ColdFusion datasource name.
    required string host,                 // Database server host name or IP address.
    required string database,             // Database name that corresponds to the data source.
    string originaldsn,                   // Original ColdFusion datasource name, if you are renaming this dsn.
    string port = 3306,                   // Port that is used to access the database server. (default 3306)
    string driver = "MySQL5",             // JDBC driver.
    string class = "com.mysql.jdbc.Driver", // JDBC class file.
    string username,                      // Database username.
    string password,                      // Database password.
    boolean encryptpassword = "true",     // Indicates whether to encrypt the password when storing it in the neo-query.xml 
                                          // file:
                                          //    <ul>
                                          //      <li>True – Encrypt the password before storing it. </li>
                                          //      <li>False - Store the password in clear text.</li>
                                          //      <br>
                                          //      <b>Note:</b> If you are updating a data source that already has an encrypted password, you must set this argument 
                                          //      to false to avoid re-encrypting an encrypted password.
                                          //    </ul>
    string description,                   // A description of this data source connection.
    string args,                          // Connection string arguments, formatted (arg1=argvalue;arg2=argvalue).
    numeric timeout,                      // The number of seconds that ColdFusion maintains an unused connection before destroying it.
    numeric interval,                     // The time (in seconds) that the server waits between cycles to check for expired data source connections to close.
    numeric login_timeout,                // The number of seconds before ColdFusion times out the data source connection login attempt.
    numeric buffer,                       // The default buffer size, used if disable_clob is not specified or True. Default is 64000 bytes.
    numeric blob_buffer,                  // The default buffer size, used if disable_blob is not specified or True. Default is 64000 bytes.
    boolean enablemaxconnections,         // Enables the maxconnections setting.
    numeric maxconnections,               // Limit connections to this maximum amount.
    boolean pooling,                      // Enable server connection pooling for your data source.
    boolean disable,                      // Suspends all client connections to the data source.
    boolean disable_clob,                 // Specify False to return the entire contents of any CLOB/Text columns in the database. 
                                          // If you specify False, ColdFusion retrieves up to the amount specified in the buffer argument.
    boolean disable_blob,                 // Specify False to return the entire contents of any BLOB/Image columns in the database. 
                                          // If you specify False, ColdFusion retrieves up to the amount specified in the blob_buffer setting.
    boolean disable_autogenkeys,          // Specify true to disable retrieval of autogenerated keys
    boolean select,                       // Allow SQL SELECT statements.
    boolean create,                       // Allow SQL CREATE statements.
    boolean grant,                        // Allow SQL GRANT statements.
    boolean insert,                       // Allow SQL INSERT statements.
    boolean drop,                         // Allow SQL DROP statements.
    boolean revoke,                       // Allow SQL REVOKE statements.
    boolean update,                       // Allow SQL UPDATE statements.
    boolean alter,                        // Allow SQL ALTER statements.
    boolean storedproc,                   // Allow SQL stored procedure calls.
    boolean delete,                       // Allow SQL DELETE statements.
    string validationQuery,               // Validation Query used by Coldfusion for validating the connection state when removing connections from the connection pool.
    numeric version = 1,                  // version of the datasource
    boolean force = false
  ) returnformat="json" {
    var res = {
      'success' = false,
      'error' = 'unknown'
    };

    if( !len(name) ) {
      res.error = 'name_required';
      return res;
    }

    for( var val in variables.keyConvertion ) {
      arguments[val] = arguments[val] * 60;
    }

    var ds = _getDatasource(name);
    if( !isNull(ds) && !structIsEmpty(ds) ) {
      if( ds.version == version && !force) {
        if( !verifyDsn(name) ) {
          return {
            'success' = false,
            'status' = 'datasource_not_verified'
          };
        }
        return {
          'success' = true,
          'status' = 'unchanged'
        };
      } else {
        description = serializeJSON({ 'message' = description, 'version' = version});
      }

      deleteDatasource(name);
    }

    structDelete(arguments, 'force');

    _datasource().setMySQL5(argumentCollection = arguments);

    if( !datasourceExists(name) ) {
      return {
        'success' = false,
        'status' = 'datasource_not_exists'
      };
    }

    if( !verifyDsn(name) ) {
      return {
        'success' = false,
        'status' = 'datasource_not_verified'
      };
    }

    return {
      'success' = true,
      'status' = 'changed'
    };
  }

  /**
  * @hint Deletes the specified data source.
  */
  remote boolean function deleteDatasource(required string dsnname) returnformat="json" {
    try {
      _datasource().deleteDatasource(dsnname);
    } catch(any e) {}

    var exists = !datasourceExists(dsnname);

    return exists;
  }

  /**
  * @hint Returns a structure a specified data source.
  */
  remote struct function getDatasource(required string dsnname) returnformat="json" {
    var dbs = createobject("java","coldfusion.server.ServiceFactory").getDatasourceService().getDatasources();

    if( !dbs.containsKey(dsnname) ) {
      return {
        'success' = false,
        'status' = dsnname + " does'nt exist"
      };
    }

    var db = dbs[dsnname];
    if( len(db['password']) ) {
      try {
        db['password'] = decrypt(db['password'], generate3DesKey("0yJ!@1$r8p0L@r1$6yJ!@1rj"), "DESede", "Base64");
      } catch(any e) {}
    }

    return {
      'success' = true,
      'status' = 'datasource exist',
      'data' = _formatDatasource(_util().copyStruct(db))
    };

  }

  /**
  * @hint Returns a structure containing all data sources.
  */
  remote struct function getDatasources() returnformat="json" {
    var dbs = createobject("java","coldfusion.server.ServiceFactory").getDatasourceService().getDatasources();
    var i = '';

    dbs = _util().copyStruct(dbs);

    for( i in dbs ) {
      if( len(dbs[i]['password']) ) {
        try {
          dbs[i]['password'] = decrypt(dbs[i]['password'], generate3DesKey("0yJ!@1$r8p0L@r1$6yJ!@1rj"), "DESede", "Base64");
        } catch(any e) {}
      }

      dbs[i] = _formatDatasource(dbs[i]);
    }

    return _structToLCase( dbs );
  }

  /**
  * @hint Returns a structure containing all data sources or a specified data source.
  */
  remote boolean function datasourceExists(required string dbdsn) returnformat="json" {
    return structKeyExists(getDatasources(), dbdsn);
  }

  remote boolean function verifyDsn(required string dbdsn) returnformat="json" {
    return _datasource().verifyDsn(dbdsn);
  }

  remote struct function getDriverDetails(string driverName) returnformat="json" {
    return _datasource().getDriverDetails(argumentCollection = arguments);
  }

  // ----
  private any function _getDatasource(required string dsnname) {
    var dbs = createobject("java","coldfusion.server.ServiceFactory").getDatasourceService().getDatasources();

    if( !dbs.containsKey(dsnname) ) {
      return {};
    }

    var db = dbs[dsnname];
    if( len(db['password']) ) {
      try {
        db['password'] = decrypt(db['password'], generate3DesKey("0yJ!@1$r8p0L@r1$6yJ!@1rj"), "DESede", "Base64");
      } catch(any e) {}
    }

    return _formatDatasource(_util().copyStruct(db));
  }

  private any function _handleError(e) {
    if( e.errorCode == 'cfAccessDenied' ) {
      _util().setHeaderStatus(403, 'Access Denied');
      
      return _return({
        'reason' = 'access_denied',
        'success' = false
      });
    }

    return _return({
      'success' = false,
      'error' = {
        'reason' = 'unknown',
        'message' = e.message,
        'stackTrace' = e.stackTrace
      }
    });
  }

  private any function _return(result) {
    var res = serializeJSON(result);
    var output = '';
    var mimeType = 'application/json';
    var util = _util();
    
    if( structKeyExists(url, 'callback') ) {
      // JSONP
      var callback = url.callback;
      var jsonpValidator = new lib.JSONPValidator();
      if( !jsonpValidator.isValidCallback(callback) ) {
        callback = '_';
      }
      res = "#callback#(" & res & ")";
      mimeType = 'text/javascript';
    }

    var binaryResponse = toBinary(toBase64(res));
    util.setContentType(mimeType & "; charset=UTF-8", binaryResponse);
    util.setHeader('Content-length', arrayLen(binaryResponse));
    return result;
  }

  private struct function _structToLCase(required struct obj) {
    var res = {};
    var i_obj = '';
    for( i_obj in obj ) {
      var val = obj[i_obj];

      if( isStruct(val) ) {
        val = _structToLCase(val);
      }

      res[lCase(i_obj)] = val;
    }
    return res;
  }

  private cfide.adminapi.datasource function _datasource() {
    return createObject("component","CFIDE.adminapi.datasource");
  }

  private lib.Util function _util() {
    return new lib.Util();
  }

  private void function _login() {
    if( variables.logged ) {
      return;
    }

    var api = createObject("component","CFIDE.adminapi.administrator");

    if( structKeyExists(url, 'admin_password') ) {
      api.login(url.admin_password);
      variables.logged = true;
    }
  }

  private boolean function _isRemoteMethod(method) {
    var md = getMetaData(this);

    for( var i=1; i <= arrayLen(md.functions); i++ ) {
      if( md.functions[i].name == method ) {
        return md.functions[i].access == 'remote';
      }
    }

    return false;
  }

  private struct function _formatDatasource(required struct db) {
    var desc = structKeyExists(db, 'description') ? db.description : '';

    if( !isJSON(desc) ) {
      desc = {
        'message' = desc,
        'version' = 0
      };
    } else {
      desc = deserializeJSON(desc); 
      desc = isStruct(desc) ? desc : {};
      desc.message = structKeyExists(desc, 'message') ? desc.message : '';
      desc.version = structKeyExists(desc, 'version') ? desc.version : 0;
    }

    db['description'] = desc.message;
    db['version'] = desc.version;

    for( var val in variables.keyConvertion ) {
      db[val] = db[val] / 60;
    }

    return db;
  }

}