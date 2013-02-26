<cfcomponent>

  <cffunction name="setContentType" returntype="void" access="public" output="false">
    <cfargument name="type" type="string" required="true" />
    <cfargument name="variable" type="any" />
    <cfcontent attributecollection="#arguments#" />
  </cffunction>

  <cffunction name="setHeader" returntype="void" access="public" output="false">
    <cfargument name="name" type="string" required="true" />
    <cfargument name="value" type="any" />
    <cfheader attributecollection="#arguments#" />
    <!---<cfset getPageContext().getResponse().setHeader(name, value) />--->
  </cffunction>
  
  <cffunction name="setHeaderStatus" returntype="void" access="public" output="false">
    <cfargument name="statusCode" type="string" required="true" />
    <cfargument name="statusText" type="any" />
    <!--- TODO: Use http://existdissolve.com/2010/10/cfscript-alternative-to-cfheader/ --->
    <cfheader statusCode="#statusCode#" statusText="#statusText#" />
  </cffunction>

</cfcomponent>