/**
 * create_user B
 * 
 */
//分页数量设置
$('#limit').change(function () {
    var limit = $(this).val();
    //document.cookie = "limit=" + limit;
    setCookie('limit',limit,1);
    window.location.reload();
});
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

/**
 *define edit input
 */
var span_count=0;
$(".span_control_text").click(function () {
    var span_this=$(this);
    var input_span_this;
    var font_size=$(this).css('width').substr(0,$(this).css('width').length-2);
    var font_height=$(this).css('font-size').substr(0,$(this).css('font-size').length-2);
    var _value= $(this).text();
    var href=$(this).attr('href');
      if(span_count==0){
            span_count=1;
            var str_input = "<input id='span_input_model'  value='" + _value + "' style='width: " + font_size * 2 + "px;height: " + font_height * 1.5 + "px' onkeypress='return span_count_key(event)'  onblur='span_blur()'/>";
            span_this.html(str_input);
            span_this.children().focus();
            input_span_this = $("#span_input_model");
            span_count_key=function (evt) {
                if (evt.keyCode == 13){
                    input_span_this.blur();
                    return false;
                }
                if (evt.keyCode == 27){
                    HySpan(value);
                }
                return false; 
            };
            span_blur = function () {
                var value = input_span_this.val();
                if (_value * 1 == value * 1) {
                    HySpan(value);
                }else{
                    $.getJSON(href,{value:value},function (data){
                        if(data.status_code==200){
                            HySpan(value);
                        }else if(data.status_code==300){
                            HySpan(_value);
                           alert(data.message);
                        }
                    });
                }
            };
        }
     HySpan = function (value) {
        span_this.html(value);
        span_count=0;
    };
});


function delete_confirm($url){
    if(confirm("确认删除")){
        window.location.href=$url;
    }
}

    