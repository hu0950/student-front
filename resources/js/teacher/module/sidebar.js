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
            //一级菜单项
            level_1_menu: '.J_menu-li',
            //二级菜单列表
            subMenuEl: '.J_subMenu'
        },
        ACTIVE = 'active';

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
                LEVEL_1_MENU = $(el.level_1_menu).children('a'),
                subMenu = $(el.subMenuEl);

            //打开页面时，将子列表隐藏
            $(el.subMenuEl).hide();

            S.each(LEVEL_1_MENU,function(a){
                on(a,'click',function(e){
                    that._toggle(a);
                    return false;
                });
            });
        },
        /*
        **点击一级菜单项时，切换显示子列表
        */
        _toggle: function(ev){
            var 
                that = this,
                li = $(ev).parent('li')
                siblingLi = li.siblings('li'),
                siblingUl = siblingLi.children('ul'),
                subMenu = $(ev).next('ul'),
                subMenuLi = subMenu.children('li');

            if(!li.hasClass(ACTIVE)){
                li.addClass(ACTIVE);
                subMenu.show();
                subMenuLi.addClass(ACTIVE);
                siblingLi.removeClass(ACTIVE);
                siblingUl.hide();
            }else{
                li.removeClass(ACTIVE);
                subMenu.hide();
                subMenuLi.removeClass(ACTIVE);
            }
        }
    });
    return Core;
 },{
 	requires:[
 		'core'
 	]
 });

