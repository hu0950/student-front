KISSY.add('pio/student-info-management/base-info-management', function(S){

    var urls;

    try{
        urls = PW.Env.url.StudentInfoManagement.baseInfoManagement;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.StudentInfoManagement.baseInfoManagement');
    
    S.mix(PW.io.StudentInfoManagement.baseInfoManagement, {
        conn: urls,
        /**
         * 发送所删除菜品的id
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {Boolean}           [description]
         */
        delStudent: function(data, callback){
            S.IO({      
                url: urls.delStudent,
                type: 'get',
                // type: 'delete',
                dataType: 'json',
                data: data,
                cache: false,
                success: function(rs){
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