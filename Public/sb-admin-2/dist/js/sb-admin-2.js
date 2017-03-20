$(function() {

    $('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });
    var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url;
    // }).addClass('active').parent().parent().addClass('in').parent();
    var tempStr = url.href;
    var bool = tempStr.indexOf($('ul.nav a').context.URL);
    if (bool==0){
        var urloo = $('ul.nav a').context.location.origin,
           congh = $('ul.nav a').context.location.pathname;
        var xxos = urloo+congh;
        var element = $('ul.nav a').filter(function() {
            return this.href == xxos;
        }).addClass('active').parent().parent().addClass('in').parent().addClass('active').parent().addClass('in').parent().addClass('active');

    }

});

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


//设置dataTable的默认属性 2016-08-10 12:50:25 yuanji
if($.fn.dataTable)$.extend( $.fn.dataTable.defaults, {
    language: {
        url:"/Public/sb-admin-2/bower_components/datatables-plugins/i18n/Chinese.lang"
    },
    lengthMenu: [
        [10,20, 40, 60,100 ,-1],
        [10,20, 40, 60,100,"All"]
    ],
    dom:
    "<'row'<'col-sm-6'i><'col-sm-6'f>>" +
    "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-6'l><'col-sm-6'p>>",
    responsive: true
} );


/**
 * checkbox 选择插件
 */
(function($){
    $.fn.extend({
        checkboxCtrl: function(parent){
            return this.each(function(){
                var $trigger = $(this);
                $trigger.click(function(){
                    var group = $trigger.attr("group");
                    if ($trigger.is(":checkbox")) {
                        var type = $trigger.is(":checked") ? "all" : "none";
                        if (group) $.checkbox.select(group, type, parent);
                    } else {
                        if (group) $.checkbox.select(group, $trigger.attr("selectType") || "all", parent);
                    }

                });
            });
        }
    });

    $.checkbox = {
        selectAll: function(_name, _parent){
            this.select(_name, "all", _parent);
        },
        unSelectAll: function(_name, _parent){
            this.select(_name, "none", _parent);
        },
        selectInvert: function(_name, _parent){
            this.select(_name, "invert", _parent);
        },
        select: function(_name, _type, _parent){
            var $parent = $(_parent || document);
            var $checkboxLi = $parent.find(":checkbox[name='"+_name+"']");
            switch(_type){
                case "invert":
                    $checkboxLi.each(function(){
                        var $checkbox = $(this);
                        $checkbox.prop('checked', !$checkbox.is(":checked"));
                    });
                    break;
                case "none":
                    $checkboxLi.prop('checked', false);
                    break;
                default:
                    $checkboxLi.prop('checked', true);
                    break;
            }
        }
    };
})(jQuery);

$(function() {
    $(":button.checkboxCtrl, :checkbox.checkboxCtrl").checkboxCtrl();
});
