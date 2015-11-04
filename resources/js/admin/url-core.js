/*-----------------------------------------------------------------------------
 * @Description:    配置url地址 (url-core.js)
 * @Version:        V2.0.0
 * @author:         cuiy(361151713@qq.com)
 * @date            2015.11.02
 * ==NOTES:=============================================
 * v1.0.0(2015.11.02):
 * 经项目实践,发现目前项目架构不适合调试使用,需要不断修改IO层,这样会对前\后端的开发带来不便,故决定使用此插件来解决问题
 * ---------------------------------------------------------------------------*/
(function(){
    var
        site ={
            website:'/', //站点地址
            staticWebsite: '/', // 前端服务器地址
            puiWebsite: '/resources/tool/pui2/'
        };


    _pw_apiData = {
            //  后台登录
            Login:[
                ['getLogin', site.staticWebsite + 'mock/admin/login.json', 'get', '后台登录']
            ],
            // 学生信息管理
            StudentInfoManagement: [
                // 基本信息管理
                ['delStudent', site.staticWebsite + 'mock/admin/del-student.json', 'get', '删除学生']
            ]
        };
})();