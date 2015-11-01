/*-----------------------------------------------------------------------------
* @Description:     根据下拉框选中的内容，将输入框修改为相应的验证条件
* @Version:         2.0.0
* @author:          cuiy(361151713@qq.com)
* @date             2015.9.25
* ==NOTES:=============================================
* v1.0.0(2015.9.25):
* ---------------------------------------------------------------------------*/

KISSY.add('module/select-valid', function(S, Core){
	PW.namespace('module.SelectValid');
	var
		DOM = S.DOM, query = DOM.query, $ = S.all,
		el = {
			// 触发器：下拉列表
			selectEl: '.J_select',
			// 渲染输入框
			renderTo: '.J_renderTo'
		}
		SelectValid = {
			client: function(param){
				return new Core(param);
			},
			refresh: function(){
				var
					that = this;
				S.each(query(el.selectEl), function(o){
					var 
						renderTo = $(o).parent().next().children(el.renderTo);
					DOM.data(o, 'selectValid', that.client({
						triggerEl: o,
						renderTo: renderTo
					}));
				});
			}
		};
	S.ready(function(){
		SelectValid.refresh();
	});
	PW.module.SelectValid = SelectValid;
	return SelectValid;
},{
	requires: [
		'select-valid/core'
	]
});

KISSY.add('select-valid/core', function(S){
	var
		DOM = S.DOM, query = DOM.query,
		on = S.Event.on, fire = S.Event.fire,
		config = {
			// 下拉列表
			triggerEl: '',
			// 渲染输入框
			renderTo: ''
		},
		el = {},
		DATA_VALID_RULE = 'data-valid-rule',
		DATA_VALID_TIP = 'data-valid-tip';

	function Core(param){
		this.opts = S.merge(config, param);
		this._init();
	}

	S.augment(Core, S.EventTarget, {
		_init: function(){
			this._renderVaild();
			this._bulidEvt();
		},
		_bulidEvt: function(){
			var
				that = this,
				triggerEl = that.opts.triggerEl,
				renderTo = that.opts.renderTo;
			on(triggerEl, 'change', that._renderVaild, that);
		},
		_renderVaild: function(){
			var
				that = this,
				triggerEl = that.opts.triggerEl,
				renderTo = that.opts.renderTo;
			that._getVaild();
			DOM.attr(renderTo, DATA_VALID_RULE, that.validRule);
			DOM.attr(renderTo, DATA_VALID_TIP, that.validTip);
			that.fire('refreshValid');
		},
		_getVaild: function(){
			var
				that = this,
				triggerEl = that.opts.triggerEl,
				options = query('option', triggerEl);
			S.each(options, function(option){
				if(option.selected){
					that.validRule = DOM.attr(option, DATA_VALID_RULE);
					that.validTip = DOM.attr(option, DATA_VALID_TIP);
				}
			});
		}
	});

	return Core;
},{
	requires: [
		'core'
	]
});