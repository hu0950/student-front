KISSY.add('pio/restaurant-management/table-area-management', function(S){

    var urls;

    try{
        urls = PW.Env.url.restaurantManagement.restaurantManagement;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.RestaurantManagement');
    
    S.mix(PW.io.RestaurantManagement, {
        conn: urls,
        /**
         * 删除餐台区域时，发送需删除的id
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        delArea: function(data, callback){
            S.IO({      
                url: urls.delAreaId,
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
            })
        },
        /**
         * 保存编辑原有区域信息结果
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        saveEditArea: function(data, callback){
            S.IO({      
                url: urls.saveEditArea,
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
         * 保存新添加区域信息
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        saveNewArea: function(data, callback){
            S.IO({      
                url: urls.saveNewArea,
                type: 'get',
                //type: 'post',
                dataType: 'json',
                data: data,
                cache: false,
                success: function(rs){
                    callback(
                        rs.code == 0,
                        rs.data,
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