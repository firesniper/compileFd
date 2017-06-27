let nodeLib = require ( "../node_common_lib/node_common_lib" ) ;
let fs = require ( "fs" ) ;
console.log ( "nodeLib:" ,  nodeLib )　;
nodeLib.init ( "" ) ;
let str1 = "a.b.c.d.e.f.g" ;
console.log () 
let index1 = str1.backNumIndexOf ( "." , 2 ) ;
console.log ( "index1:", index1 ) ;
let resStr1 = str1.slice ( index1 ) ;
console.log ( "resStr1:" , resStr1 ) ;
let str2 = "node_js/output.dev.htm.html" ;
let resStr2 = str2.rmSuffix () ;
console.log ( "resStr2:" , resStr2 ) ;
console.log ( "".toTagRegStrPg() ) ;
let strTab = "      " ;
let restabstr = strTab.match ( /(?: )/ig ) ;
console.log ( "restabstr:", restabstr ) ;
let resAAA01 =  strTab.replace ( /(?: )/ig , "$PH_space" ) ;
console.log ( "resAAA01:" , resAAA01 ) ; 
let resAAAB01 = resAAA01.replace ( /(?:\$PH_space){1,}/ig , " " ) ;
console.log ( "resAAAB01:" , resAAAB01 ) ;

var time1 = new Date ().getTime ( ) ;
var data = [] ;
for(var i = 0 ; i < 100000 ; i++ )
{
    data.push(i%100);
} ;
let data2 = [0,0,0,1,1,1,2,2,2,3,3,4,5,5,6,6]
console.log ( "data:" , data ) ;
let data2res = data2.unique2 () ;
console.log ( "data2res:" , data2res ) ;

String.prototype.placeHolderTokenMapFn () ;
let readRes = fs.readFileSync ( "node_js/htmloutput.dev.htm" , 'utf-8' ) ;
console.log ( "readRes:" ,  readRes   ) ;
let validRes = "node_js/htmloutput.dev.htm".validSrcFileFromUri () ;
console.log ( "validRes" , validRes ) ;

let boA02 = ".htm".isEleInAry ( nodeLib.markUpExtAry ) ;
console.log ( "boA02:" , boA02 ) ;