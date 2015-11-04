KISSY.add('pio/student-info-management/base-info-management', function(S){

    var urls,
        conn = PW.mod.Connector(_pw_apiData);

    try{
        urls = conn.StudentInfoManagement;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.StudentInfoManagement');
    
    S.mix(PW.io.StudentInfoManagement, {
        conn: urls,
        /**
         * 点击删除时，发送当前学生id
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {Boolean}           [description]
         */
        delStudent: function(data, callback){
            var
                BaseInfoManagementIO = urls.delStudent;

            BaseInfoManagementIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                );
            });
        }
    })
},{
    requires:[
        'mod/ext',
        'mod/connector'
    ]
})