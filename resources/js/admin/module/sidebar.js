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
            //一级菜单
            layer_1_menu: '.page-sidebar-menu',
            //二级菜单
            layer_2_menu: '.second-layer-menu',
            //三级菜单
            // layer_3_menu: '.third-layer-menu',
            //菜单列表
            menu_list: '.page-sidebar-menu > li'
        },
        LAYER_LEVEL = 'layer-level',
        ACTIVE = 'active',
        OPEN = 'open';

    function Core(param){
        this.opts = S.merge(config, param);
        this._init();
    }

    S.augment(Core,{
        _init: function(){
            this._hasActive();
            this._bulidEvt();
        },
        _bulidEvt: function(){
            var
                that = this;
            on(el.menu_list, 'click', function(e){
                e.stopPropagation();
                that._toggle(this);
            });
            on(el.layer_2_menu+'>li', 'click', function(e){
               e.stopPropagation();
                that._foldMenu(this);
                that._toggle(this);
            });
            on(el.layer_3_menu+'>li', 'click', function(e){
                e.stopPropagation();
            });
        },
       /**
         * 折叠已展开的菜单
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        _foldMenu: function(e){
            var
                that = this,
                otherLi = DOM.siblings(e, 'li');

            S.each(otherLi, function(item){
                if(DOM.hasClass(otherLi, OPEN)){
                        DOM.removeClass(OPEN);
                        DOM.find('ul').removeClass(OPEN);
                        DOM.find('ul').slideUp(200);
                }
            });
        },
        /**
         * 事先将已经是active的菜单展开
         * @return {Boolean} [description]
         */
        _hasActive: function(){
            var
                that = this,
                // 所有菜单项
                lis = $(el.sidebarEl).find('li');
            $(lis).each(function(){
                if(DOM.hasClass(ACTIVE) && DOM.parent('ul').attr(LAYER_LEVEL) == 3){
                    DOM.parents(el.layer_2_menu+'>li').addClass(OPEN);
                    DOM.parents(el.layer_1_menu+'>li').addClass(OPEN);
                    DOM.parents(el.layer_3_menu).addClass(OPEN);
                    DOM.parents(el.layer_2_menu).addClass(OPEN);
                    DOM.parents(el.layer_2_menu).css('display','block');
                    DOM.parents(el.layer_3_menu).css('display','block');
                }else if(DOM.hasClass(ACTIVE) && DOM.parent('ul').attr(LAYER_LEVEL) == 2){
                    DOM.parents(el.layer_1_menu+'>li').addClass(OPEN);
                    DOM.parents(el.layer_2_menu).addClass(OPEN);
                    DOM.parents(el.layer_2_menu).css('display','block');
                }
            });
        },
        /**
         * 展开或折叠菜单
         * 
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        _toggle: function(e){
            var
                that = this,
                // 当前操作的ul
                currentMenu = $(e).children('ul'),
                //当前操作的li
                currentLi = $(e),
                // 当前操作的ul下的所有li
                li = $(currentMenu).find('li'),
                // 当前li下的所有ul
                menu = $(currentLi).find('ul');

            if($(currentLi).hasClass(OPEN)){
                $(currentLi).removeClass(OPEN);
                $(currentMenu).removeClass(OPEN);
                $(menu).removeClass(OPEN);
                $(li).removeClass(OPEN);
                $(menu).slideUp(200);
            }else{
                $(currentMenu).addClass(OPEN);
                $(currentMenu).slideDown(200);
                $(currentLi).addClass(OPEN);
            }
        }
    });
    return Core;
 },{
 	requires:[
 		'core'
 	]
 });

