KISSY.add('pio/restaurant-management/table-management', function(S){

    var urls;

    try{
        urls = PW.Env.url.restaurantManagement.restaurantManagement;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.TableManagement');
    
    S.mix(PW.io.TableManagement, {
        conn: urls,
        /**
         * [停用/恢复餐台是发送餐台ID]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        changeState: function(data, callback){
            S.IO({      
                url: urls.changeState,
                type: 'get',
                //type: 'put',
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
        },
        /**
         * 删除一个餐台，发送id
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        delOneTable: function(data, callback){
            S.IO({      
                url: urls.delOneTable,
                type: 'get',
                //type: delete
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
        },
        /**
         * 搜索
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        searchTable: function(data,callback){
            S.IO({
                url: urls.searchTable,
                type: 'get',
                //type:
                dataType: 'json',
                data: data,
                cache: false,
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
        },
        /**
         * 批量删除，发送的是ID的数组
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        batchDelete: function(data,callback){
            S.IO({
                url: urls.batchDelete,
                type: 'get',
                //type: 'delete',
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
            });
        },
        sendTableName: function(data,callback){
            S.IO({
                url: urls.sendTableName,
                type: 'get',
                //type: 'get',
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
            });
        }   
    })
},{
    requires:[
        'mod/ext'
    ]
})