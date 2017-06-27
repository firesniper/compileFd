let fs = require ( "fs" ) ;
let glob = require ( "glob" ) ;
let nodeCommonLib = require ( "../node_common_lib/node_common_lib.js" ) ;

console.log ( "begin" ) ;

let getResLessSassStr = function ( srcDataStr , fileExt )
{
    console.log ( "srcDataStr:" ,  srcDataStr ) ;

    let lessSassStr = srcDataStr.getContentWrap ( fileExt ).partDomStr ;
    console.log ( "lessSassStr:" , lessSassStr ) ;
    let lessSassStr2 = lessSassStr.placeHolderToToken ( fileExt ) ;
    console.log ( "lessSassStr2:" , lessSassStr2 ) ;

    

    return lessSassStr2 ;
} ;

let getResNonMakeUpStr = function ( srcDataStr , fileExt )
{
    console.log ( "srcDataStr:" ,  srcDataStr ) ;

    let nmuStr = srcDataStr.getContentWrap ( fileExt ).partDomStr ;
    console.log ( "nmuStr:" , nmuStr ) ;
    let nmuStr2 = nmuStr.placeHolderToToken ( fileExt ) ;
    console.log ( "nmuStr2:" , nmuStr2 ) ;
    return nmuStr2 ;
} ;

let getResJsStr2 = function ( srcDataStr , fileExt )
{
    console.log ( "srcDataStr :" , srcDataStr ) ;
    console.log ( "fileExt2:" , fileExt ) ;    
    let jsStr = srcDataStr.getContentWrap ( fileExt ).partDomStr ;
    console.log ( "jsStr:" , jsStr ) ;
    let jsStr2 = jsStr.placeHolderToToken ( fileExt ) ;
    console.log ( "jsStr2:" , jsStr2 ) ;
        
    return jsStr2 ;
} ;                    

let getResHTMLStr = function ( srcDataStr , injSrcStr , fileExt )
{
    console.log ( "srcDataStr:" ,  srcDataStr ) ;
    let targetAryA1 = srcDataStr.getContentWrap ( "head" ).contentAry ;
    console.log ( "targetAryA1:" , targetAryA1 ) ;
    
    let sourceDataPgp = injSrcStr.getContentWrap ( "head" ) ;
    console.log ( "sourceDataPgp.contentAry:" , sourceDataPgp.contentAry ) ;

    let resDiffAry = targetAryA1.excludeOverlap ( sourceDataPgp.contentAry ) ;
    console.log ( " resDiffAry:" ,  resDiffAry ) ;

    let resDiffAry2 = targetAryA1.concat ( resDiffAry ) ;
    console.log ( " resDiffAry2:" ,  resDiffAry2 ) ;

    let parentWrapAry = sourceDataPgp.parentWrapAry ;
    let headStr4 = ( parentWrapAry[ 0 ] + "\n" + resDiffAry2.join( "\n" ) + "\n" + parentWrapAry[ parentWrapAry.length - 1 ] ) ;
    console.log ( "headStr4:" , headStr4 ) ;
    
    let resData = srcDataStr.tokenToPlaceHolder( "global" ) ;
    console.log ( "resData:" , resData ) ;
    let resData2 = resData.replace ( /<head.*>.*<\/head>/ig , headStr4 ) ;
    console.log ( "resData2:" , resData2  ) ;
    
    
    /*if ( srcDataStr.indexOf ( "<body" ) > -1 )
    {
        let bodyStr = srcDataStr.tokenToPlaceHolder ().match ( /<body.*>.*<\/body>/ig ) ;
        console.log ( "bodyStr:" , bodyStr ) ;

        // let bodyStr2 = bodyStr.tokenToPlaceHolder () ;
        let bodyStr3 = bodyStr[ 0 ].placeHolderToToken () ;
        console.log ( "bodyStr3:" , bodyStr3 ) ;
    } ;*/
    let bodyStr = srcDataStr.getContentWrap ( "body" ).partDomStr ;
    let bodyStr2 = bodyStr.placeHolderToToken ( "body" ) ;
    let resData3 = resData2.replace ( /<body.*>.*<\/body>/ig , bodyStr2 ) ;
    console.log ( "bodyStr2:" , bodyStr2 ) ;

    let resData4 = resData3.placeHolderToToken ( "global" ) ;
    console.log ( "resData4:" , resData4  ) ;

    return resData4 ;
    
} ;


let compileFd = 
{
    watchLockA01 : false ,
    init : function ( putPath , injSrcStr , globPgp , baseUrl ) 
    {
        nodeCommonLib.init ( baseUrl ) ;
        let $this = this ;
        console.log ( "$this:" , $this ) ;
        // putPath.inputDir = putPath.inputUri.resolveUri ().dir ;
        // let inputUri = putPath.inputUri ;
        console.log ( "nodeCommonLib:" , nodeCommonLib ) ;



        let promiseA01 = Promise.resolve 
        (
            glob 
            ( 
                '{' 
                + globPgp.regPattAry.join ( "," ) 
                + '}' 
                ,
 
                { 
 
                    "cwd" : globPgp.cwd ? globPgp.cwd : "./" , 
                    mark : true 
                } , 
                function ( err , fileList )
                {
                    if ( err )
                    {
                        console.log ( "err:" , err ) ;
                        return ;
                    } ;
                    console.log ( "fileList1:" , fileList ) ;

                    let readStreamAry = fileList.getReadStreamAry ( ) ;
                    
                    

                    for ( let inc = 0 ; inc < readStreamAry.length ; inc++ )
                    {
                        console.log ( "readStreamAry[ inc ].path:" , readStreamAry[ inc ].path ) ;
                        readStreamAry[ inc ].on
                        (
                            "data" ,
                            function ( srcDataStr )
                            {
                                let _this = this ;
                                let _thisPath = this.path ;
                                console.log ( "this.path:" , this.path ) ;

                                let outputDir = putPath.outputDir ? putPath.outputDir : this.path.resolveUri ().dir ;
         
                                let outputUri =  this.path.getOutputUri ( outputDir ) ;
                                console.log ( "outputUri：" , outputUri ) ;

                                outputUri.validDesDirFileFromUri ( outputDir ) ;
                                let fileExt = this.path.validSrcFileFromUri ().ext ;
                                
                                let resDataStr = 
                                fileExt 
                                ? 
                                ( 
                                    fileExt.match ( 
                                        // /(?:.htm|.html)/ig
                                        new RegExp ( "(?:" + nodeCommonLib.markUpExtAry.join ( "|" ) + ")" , "ig" ) 
                                    ) 
                                    ?
                                    getResHTMLStr ( srcDataStr , injSrcStr , fileExt ) 
                                    :
                                    getResNonMakeUpStr ( srcDataStr , fileExt ) 
                                    
                                )
                                : 
                                null ;
                                console.log ( "resDataStr:" , resDataStr ) ;

                              

                                let writerStream = fs.createWriteStream 
                                ( 
                                    outputUri
                                ) ;
                                // console.log ( "writerStream:" , writerStream ) ;        
                                writerStream.write 
                                ( 
                                    resDataStr , 
                                    "utf-8" 
                                ) ;
                                writerStream.end () ;
                                writerStream.on
                                (
                                    "finish" ,
                                    function ()
                                    {
                                        console.log ( "finish" ) ;
                                    }
                                ) ;
                                let watchLock = false ;
                                let fsWatchHandle = 
                                function ( a , b , c ) 
                                {
                                    if ( $this.watchLockA01 ) return ;
                                    $this.watchLockA01 = true ;

                                    console.log ( "_thisPath:" , _thisPath ) ;
                                    /*fs.unwatchFile
                                    (
                                        _thisPath , 
                                        fsWatchHandle
                                    ) ;*/
                                    globPgp = {
                                        "cwd" : "./" ,
                                        "regPattAry" : [ _thisPath , "" ]
                                    } ;
                                    
                                    compileFd.init 
                                    ( putPath , injSrcStr , globPgp , baseUrl )  ;
                                    let st01 = setTimeout 
                                    (
                                        function ()
                                        {
                                            $this.watchLockA01 = false ;
                                        } ,
                                        3000
                                    ) ;
                                    // clearTimeout ( st01 ) ;
                                    

                                    
                                } ;
                                let psWatchA01 = Promise.resolve
                                (
                                    fs.watch 
                                    ( 
                                        _thisPath , 
                                        fsWatchHandle
                                    ) 
                                ) ;
                                psWatchA01.then
                                (
                                    function ( resolve )
                                    {
                                        let st = setTimeout 
                                        (
                                            function ()
                                            {
                                                watchLock = !watchLock ;
                                            } ,
                                            3000

                                        ) ;
                                        fs.unwatchFile
                                        (
                                            _thisPath , 
                                            fsWatchHandle
                                        ) ;
                                    } ,
                                    function ( reject ) 
                                    {

                                    }
                                ) ;
                                

                            }
                            
                        ) ;
                    } ;

                    

                    return fileList ;
                }    
            ) 
            
        ) ;
        promiseA01.then
        (
            function ( srcDataStr )
            {
                // console.log ( "arg0:" , arg0 ) ;
                // console.log ( "Function.prototype.fileList:", Function.prototype.fileList ) ;
                
                
            } ,
            function ( reject )
            {
                // console.log ( "reject:" , reject ) ;
            }
        ) ;
        
        

    } 
} ;

module.exports = compileFd ;
