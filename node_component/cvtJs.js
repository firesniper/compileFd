let fs = require ( "fs" ) ;
let glob = require ( "glob" ) ;
let nodeCommonLib = require ( "../node_common_lib/node_common_lib.js" ) ;



let getResDataStr = function ( chunk )
{
    // console.log ( "chunk :" , chunk ) ;
        // chunk = chunk.toString() ;
        // console.log ( typeof chunk ) ;
        let reserved0 = { "placeHolder1" : "\\//" } ; 

        // let reserved = { "placeHolder1" : /\\\/\//ig }  ;
        let reserved = {} ;
        for ( let pA in reserved0  )
        {
            let RegStr = reserved0[ pA ].formatToRegStr () ;
            reserved[ pA ] =  new RegExp ( RegStr , "ig" ) ;
        } ;
        console.log ( "reserved0 Format: " , reserved0[ "placeHolder1" ].formatToRegStr (  ) ) ; 
        console.log ( reserved[ "placeHolder1" ].test ( chunk ) ) ;
        // console.log ( reserved[ "placeHolder1" ].exec ( chunk ) ) ;
      /*  let matchRes = "" ;
        matchRes = chunk.match ( reserved[ "placeHolder1" ] ) ;
        let resChunk = chunk.replace 
        ( 
             /\\\/\//ig  , 
            "placeHolder1" 
        ) ; */
        let resChunk = "" ;
        for ( let p in reserved )
        {
            /*console.log ( "p:" , p ) ;
            console.log ( "reserved[ p ] :" , reserved[ p ] ) ;*/
            // let regReserved = new RegExp () ;
            // let resServeReg = new RegExp ( reserved[ p ] , "ig" ) ;
            // console.log ( reserved[ p ].test ( chunk ) ) ;
            resChunk = chunk.replace ( reserved[ p ] , p ) ; 
             
        } ;
        // console.log ( "matchRes:" , matchRes ) ;
        console.log ( "resChunk:" , resChunk ) ;
        let regStr = 
        [ 
            // "console.log.*(?:;|\\r\\n)" 
            // ,
            "\\/\\/.*\\r\\n" 
            , 
            "\\/\\*.*\\*\\/"
        ] ;
        let regStr2 = 
        [ 
            /console.log.*(?:;|\r\n)/ig 
            ,
            /\/\/.*\r\n/ig
            , 
            /\/\*.*\*\//ig 
        ] ;
           
        let regRes = resChunk ;
        for ( let i = 0 ; i < regStr.length ; i++ )
        {
            //  let reg = new RegExp ( regStr[ i ] , "ig" ) ;
            //  regRes += chunk.match ( reg , "" ) ;
             regRes = regRes.replace ( regStr2[ i ] , "" ) ;
        } ;
        
        let resChunk2 = regRes ;
        for ( let p in reserved0 )
        {
            // let regReserved = new RegExp () ;
            resChunk2 = resChunk2.replace ( new RegExp( p , "ig" ) , reserved0[ p ] ) ; 
        } ;
        console.log ( "resChunk2：" , resChunk2 ) ;
        /*console.log ( "regRes:" , reserved[ "placeHolder1" ].test( regRes ) ) ;
        console.log ( "regRes:" , new RegExp ( Object.keys( reserved ) [ 0 ] ).test( regRes ) ) ;*/
        return resChunk2 ;
} ;



let cvtJs = 
{
    init : function ( globPgp , outputDir , baseUrl ) 
    {
        nodeCommonLib.init (  baseUrl ) ;
        glob 
        (
            '{' + globPgp.regPattAry.join () + '}' ,
            {
                "cwd" : globPgp.cwd ? globPgp.cwd : './' ,
                'mark' : true ,
            } ,
            function ( err , files )
            {
                let readStreamAry = files.getReadStreamAry () ;
                console.log ( "readStreamAry:" , readStreamAry ) ;
                let inputFile = "./public/node_js/inputJs.dev.txt" ;
                
                for ( let i = 0 ; i < readStreamAry.length ; i++ )
                {
                    // let  iptRs = fs.createReadStream ( inputFile ) ;
                    // iptRs.setEncoding ( "utf-8" ) ;
                    readStreamAry[ i ].on (
                        "data" ,
                        function ( chunk )
                        {
                            let outputUri = 
                            (
                                outputDir  
                                + this.path.getDirFileFromUri ().file 
                                // + ".dev"
                                + this.path.getDirFileFromUri ().ext 
                            ).rmSuffix ( "" ) ;
                            console.log ( "outputUri:", outputUri ) ;
                            let resDataStr = getResDataStr ( chunk ) ;
                            fs.writeFile 
                            (
                                outputUri
                                ,
                                resDataStr ,
                                function ()
                                {

                                }
                            ) ;

                        }
                    ) ;
                } ;
                
            }
        ) ;
    }
} ;
module.exports = cvtJs ;
// cvtJs.init ( "asfdss" ) ;


Promise.resolve
(

) ;