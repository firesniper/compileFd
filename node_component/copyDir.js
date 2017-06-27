var fs = require( 'fs' ),
    stat = fs.stat;
let getFileList = require ( "glob" ) ;
/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */

var copy = function( src, dst )
{
    // 读取目录中的所有文件/目录
    getFileList 
    ( 
        
        '{' 
        + src.regAry.join ( "," ) 
        + '}' 
        ,

        { 
            // cwd : './' ,
            "cwd" : src.cwd , 
            mark : true 
        } ,  
        function ( err , paths )
        {
            let pathList = fs.readdirSync ( src.rootDir ) ;
            console.log ( "pathList:" , pathList ) ;
            console.log ( "paths:" , paths ) ;
            if( err ){
                throw err;
            }
            pathList.forEach
            (
                function ( path )
                {
                    var _src = src.rootDir + '/' + path,
                        _dst = dst.rootDir + '/' + path,
                        readable, writable;       
                    stat 
                    ( 
                        _src , 
                        function ( err, st )
                        {
                            if( err ){
                                throw err;
                            }
                            // 判断是否为文件
                            if( st.isFile() ){
                                // 创建读取流
                                readable = fs.createReadStream( _src );
                                // 创建写入流
                                writable = fs.createWriteStream( _dst );   
                                // 通过管道来传输流
                                readable.pipe( writable );
                            }
                            // 如果是目录则递归调用自身
                            else if( st.isDirectory() )
                            {
                                exists
                                ( 
                                    { rootDir : _src }, 
                                    { rootDir : _dst } , 
                                    copy 
                                ) ;
                            }
                        } 
                    ) ;
                }
            ) ;
        }
    ) ;
} ;
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback )
{
    fs.exists
    ( 
        dst.rootDir , 
        function( exists )
        {
            // 已存在
            if( exists ){
                callback( src, dst );
            }
            // 不存在
            else
            {
                fs.mkdir 
                ( 
                    dst , 
                    function ()
                    {
                        callback ( src , dst ) ;
                    }
                ) ;
            }
        }
    ) ;
} ;
// 复制目录
exists
( 
    { 
        rootDir : 'e:\\d2' ,
        regAry : [ "**"  , "" ],
        cwd : "./" 
    } , 
    { rootDir : 'e:\\d1' } , 
    copy 
) ;