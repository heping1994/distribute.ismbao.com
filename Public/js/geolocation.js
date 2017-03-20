/**
 * Created by Administrator on 2017/3/11.
 */
function location_gps() {
    if (navigator.geolocation) {
        // getCurrentPosition支持三个参数
        // getSuccess是执行成功的回调函数
        // getError是失败的回调函数
        // getOptions是一个对象，用于设置getCurrentPosition的参数
        // 后两个不是必要参数
        var getOptions = {
            //是否使用高精度设备，如GPS。默认是true
            enableHighAccuracy: true,
            //超时时间，单位毫秒，默认为0
            timeout: 10000,
            //使用设置时间内的缓存数据，单位毫秒
            //默认为0，即始终请求新数据
            //如设为Infinity，则始终使用缓存数据
            maximumAge: 0
        };
//            成功回调
        function getSuccess(position) {

//                   riding = new AMap.Riding({
//                        map: map
//                    });
//                    //根据起终点坐标获得骑行路线距离
//                    riding.search([position.coords.longitude,position.coords.latitude],[106.56119, 29.64629],function(status, result){
//                        alert(JSON.stringify(result.routes[0].distance)+'米');
//                    });
//                var lat = position.coords.latitude;
//                var lng = position.coords.longitude;
//                var li = '<li>'+lat+'</li><li>'+lng+'</li></br>';
//                $('#container').append(li);
//                var map = new AMap.Map('container', {
//                    resizeEnable: true,
//                    zoom:11,
//                    center: [position.coords.longitude, position.coords.latitude]
//
//                });
//                marker = new AMap.Marker({
//                    position: [position.coords.longitude, position.coords.latitude]
//                });
//                marker.setMap(map);

                $.ajax({
                    url:'http://distribute.ismbao.com.cn/index/updata_coordinate',
                    type:'post',
                    data:{
                        'lng':position.coords.longitude,
                        'lat':position.coords.latitude
                    },
                    dataType:'json',
                    success:function(response){
                        alert(JSON.stringify(response));
                    }
                
                });

        }

        //失败回调
        function getError(error) {
            // 执行失败的回调函数，会接受一个error对象作为参数
            // error拥有一个code属性和三个常量属性TIMEOUT、PERMISSION_DENIED、POSITION_UNAVAILABLE
            // 执行失败时，code属性会指向三个常量中的一个，从而指明错误原因
            // switch (error.code) {
            //     case error.TIMEOUT:
            //         alert('超时');
            //         break;
            //     case error.PERMISSION_DENIED:
            //         alert('用户拒绝提供地理位置');
            //         break;
            //     case error.POSITION_UNAVAILABLE:
            //         alert('地理位置不可用');
            //         break;
            //     default:
            //         break;
            // }

            
        }

        navigator.geolocation.getCurrentPosition(getSuccess, getError, getOptions);
    }
    
};