/*-----------------------------------------------------------------------------
* @Description:     侧边栏导航
* @Version:         1.0.0
* @author:          daiqiaoling(1649500603@qq.com)
* @date             2015.11.02
* ==NOTES:=============================================
* v1.0.0(2015.11.02):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('module/sidebar',function(S, Core){
	PW.namespace('module.sidebar');
    PW.module.sidebar = function(){
        new Core();
    }     
},{
    requires: [
        'sidebar/detail'
    ]
});

 KISSY.add('sidebar/detail',function(S){
 	var
        DOM = S.DOM, get = DOM.get, query = DOM.query, next = DOM.next,
        on = S.Event.on, delegate = S.Event.delegate,
        // $ = S.all,
        config = {},
        el = {
            // 菜单
            sidebarEl: '.J_sidebar',
            //菜单列表
            menu_list: '.page-sidebar-menu > li'
        },
        ACTIVE = 'active',
        OPEN = 'open';

    function Core(param){
        this.opts = S.merge(config, param);
        this._init();
    }

    S.augment(Core,{
        _init: function(){
            this._bulidEvt();
        },
        _bulidEvt: function(){
            var
                that = this;
            // on(el.menu_list, 'click', function(e){
            //     e.stopPropagation();
            //     that._toggle(this);
            // });
            
        },        
    });
    return Core;
 },{
 	requires:[
 		'core'
 	]
 });

