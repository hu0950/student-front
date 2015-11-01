/*-------------------------------------------------------------
* @Description:     餐台管理-餐台列表
* @Version:         1.0.0
* @author:          jiangx(631724595@qq.com)
* @date             2015.10.21
* ==NOTES:=============================================
* v1.0.0(2015.9.17):
     初始生成
* -----------------------------------------------------------------*/
KISSY.add('page/restaurant-management/table-management-list', function(S, List){
	PW.namespace('page.TableManagement.List');
	PW.page.TableManagement.List = function(param){
		new List(param);
	};
},{
	requires: [
		'table-management/list'
	]
});
/* ---------------------------------------------------------------------------*/
KISSY.add('table-management/list', function(S){
	var 
		DOM = S.DOM, $ = S.all, on = S.Event.on, delegate = S.Event.delegate,
		Juicer = PW.mod.Juicer, Dialog = PW.widget.Dialog,
		TableManagementIO =  PW.io.TableManagement,
		SelectAll = PW.mod.Selectall,
		config = {}, 
		el = {
			//停用启用触发器
			changeTrigger: '.J_change',
			//删除触发器
			delOneTrigger: '.J_del',
			//状态td
			stateEl: '.J_state',
			//区域全选触发器
			selectAllTrigger: '.J_selectAll',
			//搜索表单
			searchForm: '.J_searchForm',
			//区域checkbox
			areaTrigger: '.J_area',
			//搜索按钮
			searchTrigger: '.J_searchBtn',
			//数据渲染的位置
			dataTemp: '#J_template',
			//数据模板
			renderTemp: '#tpl',
			//餐台表单
			tableForm: '.J_operForm',
			//餐台checkbox
			tableTrigger: '.J_table',
			//餐台全选触发器
			selectAllTable: '.J_selectAllTable',
			//批量删除
			batchDeleteTrigger:'.J_batchDelete'
		},
		STATE = ['停用', '启用', '可用'],
		stateMap = {
			'停用': 0,
			'启用': 1
		},
		TIP = ['确定删除该餐台吗？', '删除成功!', '请选择要批量删除的餐台!', '批量删除成功!', '确定批量删除餐台吗？',
		'修改餐台状态成功!']
		DATA_TABLE_ID = 'data-table-id';

	function List(param){
		this.opts = S.merge(config, param);
		this._init();
	};

	S.augment(List, {
		_init: function(){
			//this.checkboxList = DOM.query('input[type = checkbox]', el.tableForm);
			//this._removeAllChecked();
			this._selectAllArea();
			this._buildEvt();
			this._selectAllTable();
		},
		/**
		 * 餐台区域全选
		 * @return {[type]} [description]
		 */
		_selectAllArea: function(){
			var 
				that =this;
			SelectAll.client({
				root: el.searchForm,
				select: el.areaTrigger,
				toggleTrigger: el.selectAllTrigger
			});
		},
		/**
		 * 餐台全选
		 * @return {[type]} [description]
		 */
		_selectAllTable: function(){
			var 
				that =this;
			SelectAll.client({
				root: el.tableForm,
				select: el.tableTrigger,
				toggleTrigger: el.selectAllTable
			});
		},
		_buildEvt: function(){
			var that = this;
			//修改餐台状态
			delegate(document, 'click', el.changeTrigger, function(e){
				that._changeState(e.target);							
			});
			//删除一个餐台
			delegate(document, 'click', el.delOneTrigger, function(e){
				that._delOneTable(e.target);
			});
			//搜索
			delegate(document, 'click', el.searchTrigger, function(){
				that._search();
				return false;
			});
			//批量删除
			on(el.batchDeleteTrigger, 'click',function(){
				var selectedList = [];
				selectedList = that._getDeleteId();
				that._batchDelete(selectedList);
			})
		},
		/**
		 * 修改餐台状态
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */
		_changeState: function(e){
			var 
				that = this,
				id = $(e).parent('tr').attr(DATA_TABLE_ID),
				td = $(e).parent('td'),
				state = S.trim($(td).children(el.changeTrigger).text()),
				stateVal = stateMap[state];
			Dialog.confirm("确定" + state + "该餐台？", function(){
				that._sendTableId(td, id, stateVal);
			})
		},
		/**
		 * 发送餐台Id的ajax
		 * @param  {[type]} td    [description]
		 * @param  {[type]} id    [description]
		 * @param  {[type]} state [description]
		 * @return {[type]}       [description]
		 */
		_sendTableId: function(td, id, stateVal){
			var that = this;
			TableManagementIO.changeState({
				id: id,
				stateOper: stateVal
			},function(rs, errMsg){
				if(rs){
					that._renderStatu(td, stateVal);
				}else{
					Dialog.alert(errMsg);
				}
			});
		},
		/**
		 * 渲染修改后的状态
		 * @param  {[type]} td    [description]
		 * @param  {[type]} state [description]
		 * @return {[type]}       [description]
		 */
		_renderStatu: function(td, stateVal){
			var 
				stateTd = $(td).siblings(el.stateEl),
				changeA = $(td).children(el.changeTrigger);
			if(stateVal == 0){
				//当前从操作获取的内容是停用，证明该餐台状态是可用
				$(changeA).html('<i class="fa fa-check"></i>&nbsp;' + STATE[1]);
				$(stateTd).text(STATE[0]);
			}else{
				$(changeA).html('<i class="fa fa-circle"></i>&nbsp;'+ STATE[0]);
				$(stateTd).text(STATE[2]);
			};
			Dialog.alert(TIP[5]);
		},
		/**
		 * 删除一个餐台
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */
		_delOneTable: function(e){
			var 
				that = this,
				tr = $(e).parent('tr'),
				id = $(tr).attr(DATA_TABLE_ID);
			Dialog.confirm(TIP[0], function(){
				TableManagementIO.delOneTable({
					id:id
				},function(rs, errMsg){
					if(rs){
						Dialog.alert(TIP[1]);
						$(tr).remove();
					}else{
						Dialog.alert(errMsg);
					}
				});
			});
		},
		/**
		 * 搜索
		 * @return {[type]} [description]
		 */
		_search: function(){
			var 
				that = this,
				formData = DOM.serialize(el.searchForm);
			TableManagementIO.searchTable(formData, function(rs, data, errMsg){
				if(rs){
					that._renderData(data);
					//强制取消全选的勾选
					 $(el.selectAllTable).attr('checked', false);
				}else{
					Dialog.alert(errMsg);
				}
			});
		},
		/**
		 * 渲染搜索后的结果
		 * @param  {[type]} list [description]
		 * @return {[type]}      [description]
		 */
		_renderData: function(list){
			var 
				that = this,
				renderTemp = $(el.renderTemp).html(),
				renderStr = Juicer.client(renderTemp, {
					list: list
				});
			$(el.dataTemp).html(renderStr);
			that._selectAllTable();
		},
		/**
		 * 获取要批量删除餐台的Id
		 * @return {[type]} [description]
		 */
		_getDeleteId: function(){
			var 
				idList = new Array(),
				checkboxList = DOM.query(el.tableTrigger, el.tableForm);
			S.each(checkboxList, function(item){
				if(item.checked){
					var id = $(item).parent('tr').attr(DATA_TABLE_ID);
					idList.push(id);
				}
			});
			return idList;
		},
		/**
		 * 批量删除
		 * @param  {[type]} list [description]
		 * @return {[type]}      [description]
		 */
		_batchDelete: function(list){
			var that = this,
				 tableId = list.join(',');	
			if(!list.length){
				//如果list的长度==0，提示请选择要批量删除的餐台
				Dialog.alert(TIP[2]);
			}else{
				Dialog.confirm(TIP[4], function(){
					//ajax 发送list
					TableManagementIO.batchDelete({
						tableId: tableId
					}, function(rs, errMsg){
						if(rs){
							//把所有选中的remove掉
							that._removeChecked();
							//强制取消全选的勾选
							$(el.selectAllTable).attr('checked', false);
						}else{
							Dialog.alert(errMsg);
						}
					});	
				});
			};
		},
		/**
		 * 移除选中的checkbox
		 * @return {[type]} [description]
		 */
		_removeChecked: function(){
			var checkboxList = DOM.query(el.tableTrigger, el.tableForm);
			S.each(checkboxList, function(item){
				if(item.checked){
					$(item).parent('tr').remove();
				};
			});
			Dialog.alert(TIP[3]);
		}
	});
	return List;
}, {
	requires: [
		'mod/juicer',
		'widget/dialog',
		'mod/selectall',
		'pio/restaurant-management/table-management'
	]
});