KISSY.add('pio/login/login', function(S){

    var urls;

    try{
        urls = PW.Env.url.login.login;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.Login');
    
    S.mix(PW.io.Login, {
        conn: urls,
        /**
         * 发送用户登录的用户名和密码
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getLogin:function(data,callback){
            S.IO({
                url:urls.getLogin,
                type:'get',
                //type: 'post',
                dataType:'json',
                data:data,
                success:function(rs){
                   callback(
                        rs.code == 0,
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