let fs = require ( "fs" ) ;
let glob = require ( "glob" ) ;
let nodeCommonLib = require ( "../node_common_lib/node_common_lib.js" ) ;


console.log ( "begin" ) ;

let gpack = 
{
    
    init : function (  globPg , baseUrl ) 
    {
        nodeCommonLib.init ( baseUrl ) ;

        let promiseA01 = Promise.resolve 
        (
            glob 
            ( 
                '{' 
                + [ 
 
                    globPg.regStr  
                    , ""
                ].join ( "," ) 
                + '}' 
                ,
 
                { 
                    // cwd : './' ,
                    "cwd" : globPg.cwd , 
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
                    
                    let getResDataStr = function ( pc , readStreamAry , inc )
                    {
                        console.log ( "pc:" ,  pc ) ;
                        
                        /*if ( outputDir )
                        {
                            fs.existsSync 
                            (
                                outputDir
                                ,
                                function ( flag )
                                {
                                    if ( flag ) return ; 
                                    fs.mkdirSync ( outputDir ) ;

                                }
                            ) ;
                        } ;
                        
                        return resData2 ;*/
                        
                    } ;

                    /*for ( let inc = 0 ; inc < readStreamAry.length ; inc++ )
                    {
                        console.log ( "readStreamAry[ inc ].path:" , readStreamAry[ inc ].path ) ;
                        readStreamAry[ inc ].on
                        (
                            "data" ,
                            function ( arg0 , readStreamAry , inc )
                            {

                                console.log ( "this.path:" , this.path ) ;
                                let resDataStr = getResDataStr ( arg0 , readStreamAry , inc ) ;
                                fs.writeFile 
                                ( 
                                    // outputDir
                                    this.path.getDirFileFromUri ().dir  
                                    + this.path.getDirFileFromUri ().file 
                                    + ".dev"
                                    + this.path.getDirFileFromUri ().ext
                                    , 
                                    // resDataStr.replace ( /(?:\$placeHolderA1){1,}/ig , "\n" )
                                    resDataStr.placeHolderToN () 
                                    ,
                                    function ( a ) 
                                    {
                                        console.log ( "outputUri:" , outputUri ) ;
                                       
                                    } 
                                ) ;
                            }
                            
                        ) ;
                    } ;
 
                    return fileList ;*/
                }    
            ) 
            
        ) ;
        promiseA01.then
        (
            function ( arg0 )
            {
               
                
            } ,
            function ( reject )
            {
                // console.log ( "reject:" , reject ) ;
            }
        ) ;
        
        
    } 
} ;

module.exports = gpack ;


                    var fnL = function ( uri  )
                    {
                        fs.readdir 
                        (
                            uri ,
                            function ( err , dirs )
                            {
                                let x = 2 ;
                                let inc = 0 ;
                                // console.log ( "dirs:" , dirs ) ;
                                // var fnL2 = function ()
                                // {
                                        // console.log ( "dirs0:" , dirs ) ;
                                        if ( dirs == undefined ) return ;
                                        hfA01 : for ( var i = 0 ; i < dirs.length ; i++ ) 
                                        { 
                                            // console.log ( "dirs[ %i ]:" , i , dirs[ i ] ) ;
                                            let Dirf = dirs [ i ] ;
                                            if ( Dirf.indexOf ( "." ) > 0 ) continue hfA01 ;
                                            console.log ( "Dirf:" , Dirf ) ;
                                            // if ( i >= dirs.length ) return ;
                                            /*fs.readdir 
                                            (
                                                dirs [ i ] ,
                                                function ( err , dirs2 )
                                                {
                                                    console.log ( "dirs2:" , dirs2 ) ;
                                                    // fnL ( dirs2 ) ;
                                                }
                                            ) ;*/
                                            if ( Dirf == undefined ) continue hfA01 ;
                                            fnL (  Dirf ) ;
                                        } ;       
                                // } ;
                                /*inc ++ ;
                                if ( inc >= x ) return ;
                                fnL ( Dirf ) ;*/
                                    
                                
                            }
                        ) ;
                    } ;
                    // fnL ( "./" ) ;

                                                    /*fs.writeFile 
                                ( 
                                    // outputDir
                                    this.path.getDirFileFromUri ().dir  
                                    + this.path.getDirFileFromUri ().file 
                                    + ".dev"
                                    + this.path.getDirFileFromUri ().ext
                                    , 
                                    // resDataStr.replace ( /(?:\$placeHolderA1){1,}/ig , "\n" )
                                    resDataStr.placeHolderToToken () 
                                    ,
                                    function ( a ) 
                                    {
                                        console.log ( "outputUri:" , outputUri ) ;
                                       
                                    } 
                                ) ;*/