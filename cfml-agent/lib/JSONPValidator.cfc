/**
 * @output false
 */
component {
  
  variables.instance = {};
  
  variables.instance.reservedWords = [
    "break", "do", "instanceof", "typeof", "case", "else", "new", "var", "catch", "finally", 
    "return", "void", "continue", "for", "switch", "while", "debugger", "function", "this", 
    "with", "default", "if", "throw", "delete", "in", "try", "class", "enum", "extends", 
    "super", "const", "export", "import", "implements", "let", "private", "public", "yield",
    "interface", "package", "protected", "static", "null", "true", "false"
  ];
  
  variables.instance.validationRegex = createObject( "java", "java.util.regex.Pattern" )
                      .compile( javaCast( "string", "^[a-zA-Z_$][0-9a-zA-Z_$]*(?:\[(?:"".+""|\'.+\'|\d+)\])*?$" ) );
  
  public boolean function isValidCallback(required string callbackName) {
    if( !len(callbackName) ) {
      return false;
    }
    var splitted = listToArray(callbackName, '.');
    for( var i=1; i <= arrayLen(splitted); i++ ) {
      var matcher = variables.instance.validationRegex.matcher(splitted[i]);
      if( !len(splitted[i]) || !matcher.find() || arrayFindNoCase(variables.instance.reservedWords, splitted[i]) ) {
        return false;
      }
    }
    return true;
  }
  
  variables.instance.tests = {
        ''                    = false,
        'hello'               = true,
        'alert()'             = false,
        'test()'              = false,
        'a-b'                 = false,
        '23foo'               = false,
        'foo23'               = true,
        '$210'                = true,
        '_bar'                = true,
        'some_var'            = true,
        '$'                   = true,
        'somevar'             = true,
        'function'            = false,
        ' somevar'            = false,
        '$.ajaxHandler'         = true,
        '$.23'                  = false,
        'array_of_functions[42]'        = true,
        'array_of_functions[42][1]'     = true,
        '$.ajaxHandler[42][1].foo'      = true,
        'array_of_functions[42]foo[1]'  = false,
        'array_of_functions[]'          = false,
        'array_of_functions["key"]'     = true,
        'myFunction[123].false'         = false,
        'myFunction .tester'            = false,
        '_function'                     = true,
        'petersCallback1412331422[12]'  = true,
        ':myFunction'                   = false
  };
  
  public string function runTests() {
    var passed = 0;
    var tests = structCount(variables.instance.tests);
    var n = "<br />";
    
    writeOutput('<strong>Testing ' & tests & ' callback methods:</strong>' & n & n);
    
    for( callbackName in variables.instance.tests ) {
      var valid = isValidCallback(callbackName);
      var mustBe = variables.instance.tests[callbackName];
      var testSuccess = valid == mustBe;
      if( testSuccess ) passed++;
      
      writeOutput('<span style="color: ' & (testSuccess ? 'green' : 'red') & '">');
      writeOutput('"'& callbackName &'"' & ' passed as ' & (valid ? 'valid' : 'invalid') & ' but must be ' & (mustBe ? 'valid' : 'invalid'));
      writeOutput('</span>' & n);
    }
    
    writeOutput(n & passed & ' of ' & tests & ' tests passed.');
  }
}