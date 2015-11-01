KISSY.add('pio/module/mul-select', function(S){

    var urls;

    try{
        urls = PW.Env.url.module.mulSelect;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.Module.MulSelect');
    S.mix(PW.io.Module.MulSelect, {
        conn: urls,
        /**
         * 搜索相关项
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        search: function(data, callback){
            S.IO({      
                url: urls.search,
                type: 'get',
                dataType: 'json',
                data: data,
                success: function(rs){
                    callback(
                        rs.code == 0,
                        rs.list,
                        rs.errMsg
                    );
                },
                error: function(err){
                    callback(
                        false,
                        PW.Env.msg[0]
                    )
                }
            })
        } 
    })
},{
    requires:[
        'mod/ext'
    ]
})