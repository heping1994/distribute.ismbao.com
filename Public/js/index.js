			$('.searchbox i').click(function(){
			if($('#search').hasClass('show')){
					$('#search').removeClass('show');
			}else{
					$('#search').addClass('show');
					$('#search').focus();
					$('#search').blur(function(){
						$('#search').removeClass('show');
					});
			}
		});
		$('.notice .noticebt').click(function(){
			if($('.noticebox').is(':hidden')){
				$('.userbox').slideUp(100);
				$('.noticebox').slideDown(100);
			}else{
				$('.noticebox').slideUp(100);
			}
		});
				$('.user .userbt').click(function(){
			if($('.userbox').is(':hidden')){
				$('.noticebox').slideUp(100);
				$('.userbox').slideDown(100);
			}else{
				$('.userbox').slideUp(100);
			}
		});
	
	$(window).scroll(function(){
   	  		if($(window).scrollTop()>55){
   		$('#totop').show();
   	}else{
   		$('#totop').hide();
   	};
    	});
	$('#totop').click(function(){//调用回到顶点
    	goToWhere(0,5);
  });
	 var goToWhere = function (where,speed)
    {  
        var me = this;
        me.site = [];
        clearInterval (me.interval);
        var dom = document.documentElement || document.body; 
        var height = !!where ? dom.scrollHeight : 0;     
        me.interval = setInterval (function ()
        {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            var num = (height - top) / speed;
            if (num === me.site[0])
            {
                window.scrollTo (0, height);   
                clearInterval (me.interval);
            }
            window.scrollBy (0, num);
            me.site.unshift (num);
        }, 30);
    };