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
            //一级菜单项
            level_1_menu: '.J_menu-li',
            //二级菜单列表
            subMenuEl: '.J_subMenu'
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
                that = this
                LEVEL_1_MENU = $(el.level_1_menu),
                subMenu = $(el.subMenuEl);

            $(el.subMenuEl).hide();

            S.each(LEVEL_1_MENU,function(li){
                on(li,'click',function(e){
                    that._toggle(li);
                });
            });
        },
        _toggle: function(ev){
            var 
                that = this,
                li = $(ev),
                subMenu = li.children('ul');

            if(!li.hasClass(ACTIVE)){
                li.addClass(ACTIVE);
                subMenu.show();
                subMenu.addClass(ACTIVE);
            }else{
                if(!subMenu.hasClass(ACTIVE)){                
                    li.removeClass(ACTIVE);
                    subMenu.hide();
                    subMenu_li.removeClass(ACTIVE);
                }
            }
        }
    });
    return Core;
 },{
 	requires:[
 		'core'
 	]
 });

