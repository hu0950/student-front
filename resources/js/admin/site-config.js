(function(){

    var site ={
        website:'/', //站点地址
        staticWebsite: '/', // 前端服务器地址
        puiWebsite: '/resources/tool/pui2/'
    }

    
    _pw_env = {
        status: 0, //0-前端调试，1-后端调试, 2-后端部署
        website: site.website,
        staticWebsite: site.staticWebsite,
        puiWebsite: site.puiWebsite,
        tag: '',
        pkgs:[
            {
                name: 'pio',
                path: site.staticWebsite + 'resources/js/admin/'
            },
            {
                name: 'widget',
                path: site.staticWebsite + 'resources/tool/base-widget/js/'
            },
            {
                name: 'module',
                path: site.staticWebsite + 'resources/js/admin/'
            },
            {
                name: 'page',
                path: site.staticWebsite + 'resources/js/admin/'
            }
        ],
        //对pui各个组件的一个
        modSettings:{
            notifier: {
                top: 100
            },
            dialog:{
                opacity: 0.5,
                position: 'fixed',
                theme: 'white',
                title: '提示信息',
                width: 600,
                top : 100,
                content: '暂无内容！',
                themeUrl: site.staticWebsite + 'resources/tool/base-widget/css/core.css'
            },
            defender:{
                themeUrl: site.staticWebsite + 'resources/tool/base-widget/css/core.css'  
            },
            scroll:{
                cursorborderradius: 0,
                cursorcolor: '#3d3d3d'
            },
            pagination: {
                themePackage: {
                    layout: ['first','num','last'],
                    //默认分页样式（定义了五种）
                    themeCss: 'pagination-white',
                    //首页按钮内容显示
                    firstPageTip: '<i class="fa fa-angle-left"></i>',
                    //尾页按钮内容显示
                    lastPageTip: '<i class="fa fa-angle-right"></i>'
                },
                themeUrl: site.staticWebsite + 'resources/tool/base-widget/css/pagination.css' 
            },
            tooltip:{
                position: { 
                    my: 'tc',
                    at: 'bc' //options: tl,tc,tr, rt,rc,rb, bl,bc,br,lt,lc,lb 
                }
            },
            skylo:{
                themeUrl: site.staticWebsite + 'resources/tool/base-widget/css/skylo.css'
            },
            // 文件上传swf路径
            upload: {
                swfUrl: site.staticWebsite + 'resources/tool/webuploader/swf/Uploader.swf'
            }
        },
        //统一错误信息入口
        msg:{
            0: '网络加载错误'
        },
        //地址信息
        url:{
            // 菜品管理
            dishManagement: {
                dishManagement: {
                    // 删除菜品
                    delDish: site.staticWebsite + 'mock/admin/dish.json',
                    // 发送菜品分类联动id
                    sendClassLinkage: site.staticWebsite + 'mock/admin/big-classify.json',
                    // 发送计量单位联动id
                    sendUnitLinkage: site.staticWebsite + 'mock/admin/small-classify.json',
                    // 获取原材料
                    getIngredient: site.staticWebsite + 'mock/admin/ingredient-list.json',
                    // 删除原材料
                    delIngredient: site.staticWebsite + 'mock/admin/ingredient-list.json'
                }
            },
            // 基本信息管理
            baseInfoManagement: {
                //搜索风向标
                searchVane: {
                    //添加菜品标签
                    addOrder: site.staticWebsite + 'mock/admin/add-order.json',
                    //删除菜品标签
                    delOrder: site.staticWebsite + 'mock/admin/del-order.json'
                }
            },
            // 用户管理（会员管理、员工管理）
            userManagement: {
                // 员工管理
                employeeManagement: {
                    // 发送当前用户名id，获取其服务员管辖餐台, 为气泡所用
                    sendEmployeeId: site.staticWebsite + 'mock/admin/employee-table.json',
                    // 搜索相应角色的员工,获取当前角色下的员工列表
                    searchEmployee: site.staticWebsite + 'mock/admin/employee-list.json',
                    // 删除员工
                    delEmployee: site.staticWebsite + 'mock/admin/employee-list.json',
                    // 转换员工的状态,即启用\停用互换
                    convertEmployeeStatus: site.staticWebsite + 'mock/admin/employee-list.json',
                    // 发送员工号码,判断员工电话号码是否重复
                    sendEmployeePhone: site.staticWebsite + 'mock/admin/hasEmployee.json',
                    // 发送员工用户名,判断员工用户名是否重名
                    sendEmployeeUserName: site.staticWebsite + 'mock/admin/hasEmployee.json'
                },
                //会员管理
                vipManagement: {
                    //改变会员状态时，发送会员id
                    sendVipId: site.staticWebsite + 'mock/admin/change-vip-status.json',
                    //发送新添加会员的手机号，与数据库进行判重
                    hasVip: site.staticWebsite + 'mock/admin/hasVip.json'
                }
            },
            login: {
                login: {
                    getLogin: site.staticWebsite + 'mock/admin/login.json'
                }
            },
            //权限管理
            authorityManagement: {
                //权限管理
                authorityManagement: {
                    //改变权限时，发送当前权限的id
                    sendAuthorityId: site.staticWebsite + 'mock/admin/change-authority.json',
                    //删除权限组时，发送当前权限组的id和当前用户的id
                    delAuthority: site.staticWebsite + 'mock/admin/del-authority-group.json',
                    //保存编辑后的权限
                    saveAuthority: site.staticWebsite + 'mock/admin/save-authority.json',
                    //保存新添加的权限
                    saveNewAuthority: site.staticWebsite + 'mock/admin/save-authority.json',
                    //删除权限时，发送权限id
                    delAuthority: site.staticWebsite + 'mock/admin/login.json',
                    //权限组配置页面，删除权限
                    delAuthorityOfGroup: site.staticWebsite + 'mock/admin/login.json'
                },
            },
            // 原配料管理
            ingredientManagement: {
                //原配料单位管理
                ingredientManagement:{
                    //编辑
                    saveIngredient: site.staticWebsite + 'mock/admin/save-ingredient.json',
                    //保存
                    saveNewIngredient: site.staticWebsite + 'mock/admin/save-ingredient.json',
                    //删除
                    delIngredient: site.staticWebsite + 'mock/admin/login.json'
                },
            },

            restaurantManagement:{
                restaurantManagement:{
                    //保存新添加区域信息
                    saveNewArea: site.staticWebsite + 'mock/admin/save-new-area.json',
                    //保存编辑原有区域信息结果
                    saveEditArea: site.staticWebsite + 'mock/admin/login.json',
                    //删除餐台区域时，发送需删除的id
                    delAreaId: site.staticWebsite + 'mock/admin/login.json',
                    //改变餐台状态（停用、恢复）
                    changeState: site.staticWebsite + 'mock/admin/login.json',
                    //删除单个餐台
                    delOneTable: site.staticWebsite + 'mock/admin/login.json',
                    //搜索餐台
                    searchTable: site.staticWebsite + 'mock/admin/table-list.json',
                    //批量删除
                    batchDelete: site.staticWebsite + 'mock/admin/login.json',
                    //添加页，判断餐台名称是否重复
                    sendTableName: site.staticWebsite + 'mock/admin/login.json'
                }
            },
            // 公用模块
            module: {
                // 多选
                mulSelect: {
                    // 搜索
                    search: site.staticWebsite + 'mock/admin/search-item-list.json'
                }
            }
        }
    }
})();