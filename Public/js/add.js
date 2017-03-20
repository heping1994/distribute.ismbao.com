 var self={
	   	click:function(){
	   		$(document).on('click',function(){   //点击其他地方关闭弹窗
	   			$('.detailedlist').hide();
	   			$('.assignbox').hide();
	   			$('.assignbox ul').hide();
	   			$('.date_selector').hide();
	   		});
	   		$('.addtask').click(function(event){     //清单列表弹窗及关闭
	   			 event.stopImmediatePropagation();   
	   			$('.detailedlist').toggle();
	   		});
	   		$('.data a').click(function(event){       //任务的指派人和时间弹窗及关闭
	   			 event.stopImmediatePropagation();
	   			$(this).parent().find('.assignbox').toggle();
	   		});
	   		$('.addnewbt').click(function(){                 //添加新任务按钮
	   			$(this).parent().find('.addtext').show();
	   			$(this).hide();
	   		});
	   		$('.inventory .defaddtext .cancel').click(function(){    //任务取消按钮
	   			$('.defsucctask .changebox').addClass('ok');
	   			$(this).parents('.defaddtext').hide();
	   			$('.defaddtext').find('textarea').val('');
	   		});
	   		$('.detailedul .cancel').click(function(){    //清单取消按钮
	   			$(this).parents('.detailedul').hide();
	   			$('.detailedul').find('textarea').val('');
	   		});
	   		$('.assignbox').click(function(event){    //指派人和时间取消时件冒泡
	   			event.stopImmediatePropagation();
	   		});
	   		$('.addtext .cancel').click(function(){    //清单中的任务取消按钮
	   			$(this).parents('.addtext').hide();
	   			$(this).parents('.centerbox').find('.addnewbt').show();
	   			$('.addtext').find('textarea').val('');
	   		});
	   		$('.complete .inr i').click(function(){     //完成任务删除
	   			$(this).parents('.fill').remove();
	   		});
	   		$('.abolish').click(function(){   //确认删除弹窗关闭
	   			$('.showbox').hide();
	   		});
	   		$('.remove').click(function(){	//确认删除弹窗关闭
	   			$('.showbox').hide();
	   		});
	   		$('.centerboxhead .none').click(function(){    //清单下任务的隐藏和显示切换
	   			if($(this).hasClass('icon-angle-up')){
	   				$(this).parents('.centerboxhead').next().next().hide();
	   				$(this).removeClass('icon-angle-up').addClass('icon-angle-down');
	   			}else{
	   				$(this).parents('.centerboxhead').next().next().show();
	   				$(this).removeClass('icon-angle-down').addClass('icon-angle-up');
	   			};
	   			
	   		});
	   		$('.centerboxhead .close').click(function(){     //删除清单及其任务
	   			  var that =$(this).parents('.centerbox');
	   				$('.showbox').show();
						$('.confirm').off().click(function(){
							that.remove();
							$('.showbox').hide();
						});
	   		});
	   		$('.centerboxhead .edit').click(function(){			//清单名称修改
	   			 $(this).parents('.centerboxhead').next().find('textarea').val($(this).parents('.centerboxhead').find('.title').html());
	   			  $(this).parents('.centerboxhead').next().show();
	   			$(this).parents('.centerboxhead').hide();
	   		});
	   			$('.editname .addbt').click(function(){     //清单名称修改保存
	   				$(this).parents('.editname').prev().find('.title').html($(this).parents('.editname').find('textarea').val());
	   				$(this).parents('.editname').hide();
	   				$(this).parents('.editname').prev().show();
	   			});
	   			$('.editname .cancel').click(function(){    //清单名称修改取消
	   				$(this).parents('.editname').hide();
	   				$(this).parents('.editname').prev().show();
	   			});
	   	},
	   	add:function(_id){


	   		$.each($('.detailedlist li'), function(index) {      //清单列表弹窗
	   			$(this).click(function(){
	   				$('.detailedlist').hide();       
	   				$('.defaddtext').show();
	   			});
	   		});
	   		$('.inventory .defaddtext .addbt').click(function(){       //添加任务全部操作
            //
	   		// 	var text=$('.inventory .defaddtext textarea').val();
	   		// $('.defsucctask').append('<li class="fill"><span class="changebox icon-ok"></span><a href="#">'+text+'</a><div class="assign"><a href="javascript:;"><span>'+$('.defaddtext .data span').eq(0).html()+'</span> · <span>'+$('.defaddtext .data span').eq(1).html()+'</span></a></div><ul class="inr"><li><i class="icon-trash close" title="删除任务清单"></i></li><li><i class="icon-pencil modify" title="编辑"></i></li><li><i class="icon-play ing" title="正在进行中"></i></li></ul></li>');
	   		// 	$('.inventory .defaddtext textarea').val('');
			//
	   		// 	var assignbox1=$(this).parent().find('.assignbox');
	   		// 	$('.assign a').off().click(function(event){
	   		// 	if(assignbox1.length==0){
	   		// 		$(this).parent().append('<div class="assignbox"><p>将任务指派给</p><div class="namebox"><input type="text" placeholder="输入成员姓名"/><span class="namebt  icon-caret-down"></span><ul><li>11111</li><li>2222</li><li>333333</li></ul></div><p>指定关注人</p><div class="follow"><input type="text"placeholder="选择关注人"/><span class="followbt  icon-caret-down"></span><ul><li>关注人1</li><li>关注人2</li></ul></div><p>任务截止时间</p><div class="daybox"><input type="text" placeholder="选择截止时间" class="date_picker"/></div></div>');
	   		// 		 $('.date_picker').date_input();
	   		// 		 		assignbox();
	   		// 	};
	   		// });
	   		// 	$('.defsucctask .inr .ing').off().click(function(){
	   		// 			if($(this).hasClass('icon-play')){
	   		// 				$(this).parents('.fill').find('.changebox').after('<img src="img/cloud.jpg" class="ingimg"/>');
			// 		$(this).removeClass('icon-play').addClass('icon-pause');
	   		// 			}else{
	   		// 		$(this).parents('.fill').find('.ingimg').remove();
			// 		$(this).removeClass('icon-pause').addClass('icon-play');
	   		// 			};
			// });
			// $('.defsucctask .inr .close').off().click(function(){
			// 	   $(this).parents('.fill').remove();
			// });
			// $('.defsucctask .inr .modify').off().click(function(){
			// 		var oldtext=$(this).parents('.fill').find('a').html();
			// 		$(this).parents('.fill').remove();
			// 		$('.defaddtext').find('textarea').val(oldtext);
			// 		$('.defaddtext').show();
			// });
	   		});
			$('.detailedul .addbt').click(function(){     //添加清单全部操作
			var	dettext=$('.detailedul').find('textarea').val();
			$('.defcomplete').append('<li class="fill"><a href="#">'+dettext+'</a><ul class="inr"><li><i class="icon-trash close" title="删除任务清单"></i></li><li><i class="icon-pencil modify" title="编辑"></i></li><li><i class="icon-inbox file" title="归档"></i></li></ul></li>');
			$('.detailedul').find('textarea').val('');
			$('.defcomplete .close').off().click(function(){
				$(this).parents('.fill').remove();
			});
			$('.defcomplete .modify').off().click(function(){
				var oldtext=$(this).parents('.fill').find('a').html();
					$(this).parents('.fill').remove();
					$('.detailedul').find('textarea').val(oldtext);
					$('.detailedul').show();
			});
			
			});
			$('.adddetailed').click(function(){     //添加清单按钮
				$('.detailedul').show();
			});
			
			// var idss =_id;
			// alert(idss);
			// $('.addtext .addbt').attr('_data',idss);
			// alert('外'+$('.addtext .addbt').attr('_data'));
			// $('.addtext .addbt').click(function(){      //清单中任务的全部操作
			// 	alert(_id);
			// 	var li = '<li class="fill"><span class="changebox icon-ok" onclick="change_task_zhuangtai('+idss+')"></span><a href="#">'+$('.addtext').find('textarea').val()+'</a><div class="assign"><a href="javascript:;"><span>'+$('.addtext .data span').eq(0).html()+'</span> · <span>'+$('.addtext .data span').eq(1).html()+'</span></a></div><ul class="inr"><li><i class="icon-trash close" title="删除任务清单"></i></li><li><i class="icon-pencil modify" title="编辑"></i></li><li><i class="icon-play ing" title="正在进行中"></i></li></ul></li>';
	   		// $('.succtask').append(li);
			// 	$('.addtext').find('textarea').val('');
			// 		$('.assign a').off().click(function(event){
	   		// 	if($(this).parent().find('.assignbox').length==0){
	   		// 		$(this).parent().append('<div class="assignbox"><div class="btbox"><button class="determine">确定</button><button class="cancelbt">取消</button></div><p>将任务指派给</p><div class="namebox"><input type="text" placeholder="输入成员姓名"/><span class="namebt  icon-caret-down"></span><ul><li>11111</li><li>2222</li><li>333333</li></ul></div><p>指定关注人</p><div class="follow"><input type="text"placeholder="选择关注人"/><span class="followbt  icon-caret-down"></span><ul><li>关注人1</li><li>关注人2</li></ul></div><p>任务截止时间</p><div class="daybox"><input type="text" placeholder="选择截止时间" class="date_picker"/></div></div>');
	   		// 		 $('.date_picker').date_input();
	   		// 		 assignbox();
	   		// 	};
	   		// 	event.stopImmediatePropagation();
	   		// 	$('.assignbox').click(function(event){
	   		// 	event.stopImmediatePropagation();
	   		// });
	   		// 	$(this).parent().find('.assignbox').toggle();
	   		// });
            //
	   		//  unfinished();
            // complete();
			// });
			
			
	   	},
	 // ceshi:function (a) {
     //
		// 	alert(a);
     //
	 // }

	   
	   	
	   	
	   };
	     function obj(o){
			function F(){};
			F.prototype=o;
			return new F();
		};
	
	 var all=new obj(self);
	 all.click();
	 all.add();
	 assignbox();   
	 // complete();       //对完成的任务操作
	 unfinished();	//未完成任务的操作
	 $('.assign a').click(function(event){                   
	 	 event.stopImmediatePropagation();   
	 	 var assignbox2= $(this).parent().find('.assignbox');
	 	if(assignbox2.is(':hidden')){
	   				$('.assignbox').hide();
	   				assignbox2.show();
	   		}else{
	   				assignbox2.hide();
	   			};
	 	 assignbox();
	 });
 	function assignbox(){
 		 function  showul(obj){
 		 	obj.off().click(function(){   
   			if($(this).next().is(':hidden')){
   				$('.assignbox ul').hide();
   				$(this).next().show();
   			}else{
   				$('.assignbox ul').hide();
   			};	
   		});
 		 };
 		 showul($('.namebt'));   //指派人姓名列表弹窗   
 		  showul($('.followbt')); //指派关注人列表弹窗 
 		  
 		  function assignment(obj){
 		  obj.off().click(function(){   
 		  	if($(this).parents('.namebox')[0]){
				obj.css('background','#fff');
				$(this).css('background','#eee');
				$(this).parent().hide();
				$(this).parents('.namebox').find('input').val($(this).html());
			}else{
	 		  	obj.css('background','#fff');
				$(this).css('background','#eee');
				$(this).parent().hide();
				$(this).parents('.follow').find('input').val($(this).parents('.follow').find('input').val()+' | '+$(this).html());
 		  	}
		});
 		  	
 		  };
 		  assignment($('.namebox ul li'));   //点击指派人姓名列表赋值
		   assignment($('.follow ul li'));   //指派关注人列表赋值
		$('.determine').off().click(function(){
		$(this).parents('.assignbox').prev('a').find('span').eq(0).html($(this).parents('.assignbox').find('.namebox input').val()?$(this).parents('.assignbox').find('.namebox input').val():'未指派');
   		$(this).parents('.assignbox').prev('a').find('span').eq(1).html($(this).parents('.assignbox').find('.daybox input').val()?$(this).parents('.assignbox').find('.daybox input').val():'选择截止时间');
		$(this).parents('.assignbox').hide();
		});
		$('.cancelbt').off().click(function(){
			$(this).parents('.assignbox').hide();
			$('.date_selector').hide();
		});
		};
		function unfinished(){
			$('.succtask .inr .ing').off().click(function(){
				if($(this).hasClass('icon-play')){
					$(this).parents('.fill').find('.changebox').after('<img src="img/cloud.jpg" class="ingimg"/>');
			$(this).removeClass('icon-play').addClass('icon-pause');
				}else{
			$(this).parents('.fill').find('.ingimg').remove();
			$(this).removeClass('icon-pause').addClass('icon-play');
				};	
			});
			$('.succtask .inr .close').off().click(function(){
				   $(this).parents('.fill').remove();
			});
			$('.succtask .inr .modify').off().click(function(){
					var oldtext=$(this).parents('.fill').find('a').html();
					$(this).parents('.fill').remove();
					$('.addtext').find('textarea').val(oldtext);
					$('.addtext').show();
			});
		};
		// function complete(){
		// 		$('.succtask .changebox').off().click(function(){
		// 			$(this).parents('.fill').hide(100);
		// 			alert($(this).parents('.succtask').id);
		// 			$(this).parents('.succtask').next().next().append('<li class="fill"><span class="changebox ok icon-ok"></span><a href="#">'+$(this).parents('.fill').find('a').html()+'</a><span class="time">（刚刚完成）</span><ul class="inr"><li><i class="icon-trash close" title="删除任务"></i></li></ul></li>');
		// 			$(this).parents('.fill').remove();
		// 			$('.complete .close').off().click(function(){
		// 				var that=$(this).parents('.fill');
		// 				$('.showbox').show();
		// 				$('.confirm').off().click(function(){
		// 					that.remove();
		// 					$('.showbox').hide();
		// 				});
		//
		// 			});
		// 			$('.complete .changebox').off().click(function(){
		// 				$(this).removeClass('ok');
		// 			});
		// 	});
		// };
 		$('.date_picker').date_input();
