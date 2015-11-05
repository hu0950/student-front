/*-----------------------------------------------------------------------------
* @Description:     后台管理-用户信息管理-会员管理
* @Version:         1.0.0
* @author:          daiql(1649500603@qq.com)
* @date             2015.10.23
* ==NOTES:=============================================
* v1.0.0(2015.10.23):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('page/student-info-management/base-info-management-list', function(S, List){
	PW.namespace('page.StudentInfoManagement.BaseInfoManagementList');
	PW.page.StudentInfoManagement.BaseInfoManagementList = function(param){
		new List(param);
	}
},{
	requires: [
		'base-info-management-list/list'
	]
});
/*---------------------------------------------------------------------------*/
KISSY.add('base-info-management-list/list', function(S){
	var
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,        
        Pagination = PW.mod.Pagination,
        baseInfoManagementIO = PW.io.StudentInfoManagement.baseInfoManagement,
        Dialog = PW.widget.Dialog,
        config = {
        	pagi: {
        		renderTo: '',
        		renderTo: '',
				juicerRender: '',
				dataRender: '',
				url: '',
				pageSize: 10
        	}
        },
        el = {     
        	// 搜索表单
        	searchForm: '.J_searchForm', 
        	// 数据渲染模板
        	templateTemp: '#J_template',
        	// 删除触发器
        	delTrigger: '.J_del'
        },
        DATA_STUDENT_ID = 'data-student-id',
        TIP = [
        '确定删除该学生吗？',
        '删除成功！',
        '删除失败！'
        ];

	function List(param){
		this.opts = S.merge(config, param);
		this.pagination;
		this._init();
	}

	S.augment(List, {
		_init: function(){
			this._pagination();
			this._addEventListener();
		},
		/**
		 * 添加事件监听
		 */
		_addEventListener: function(){
			var
				that = this,
				opts = that.opts;

			on(el.searchForm, "submit",function(){
				that._reloadPagi();
				return false;
			});			

			delegate(el.templateTemp,'click',el.delTrigger,function(e){
				that._delStudent(e.target);				
			});
		},
		/**
		 * 分页实现
		 * @return {[type]} [description]
		 */
		_pagination: function(){
			var
				that = this,
				opts = that.opts;

			that.pagination = Pagination.client(opts);
		}, 
		/**
		 * 点击搜索，重新刷新分页
		 * @return {[type]} [description]
		 */
		_reloadPagi: function(){
			var
				that = this,
				value = DOM.val(el.inputEl),
				param = {
					extraParam: {
						key: value
					}
				}
				opts = S.mix(that.opts, param);

			that.pagination.reload(opts);
		},
		/**
		 * 删除学生
		 * @param  {[type]} evt [description]
		 * @return {[type]}    [description]
		 */
		_delStudent: function(evt){
			var 
        		that = this,
        		tr = $(evt).parent('tr'),
        		studentId = tr.attr(DATA_STUDENT_ID),
        		info = {
        			id: studentId
        		};
        	
        	Dialog.confirm(TIP[0], function(){
	            baseInfoManagementIO.delStudent(info, function(rs, errMsg){
	                if(rs){
	                    Dialog.alert(TIP[1]);
	                    that._reloadPagi();
	                }else{
	                	Dialog.alert(TIP[2]);
	                }
	            });
	        });
		}
	});
	return List;
},{
	requires: [
		'mod/pagination',
		'widget/dialog',
		'pio/student-info-management/base-info-management'
	]
});