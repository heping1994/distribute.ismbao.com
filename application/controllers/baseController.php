<?php
/*
 * 门店系统的权限验证
 * User: bo
 * Date: 2016/11/24
 * Time: 13:51
 */

namespace controllers;

class baseController extends \SMB\Controllers\CRUD
{
    public function __construct()
    {
        $oauth_callback = @$_SERVER['HTTP_HOST'].@$_SERVER['REQUEST_URI'];//受访地址
        parent::__construct();
        //5788bf3a0afd79af638c3865   客户这个角色
        if (!in_array(self::$admin_user['username'],self::$username_arr)&&(!isset(self::$admin_user['admin_role'])||!in_array(new \MongoId("5788bf3a0afd79af638c3865"),self::$admin_user['admin_role'])) && isset(self::$admin_user['shop_id']) && !empty(self::$admin_user['shop_id'])){
            $this->message("没有权限","http://account.console.".self::$domain_name."/login?oauth_callback=".$oauth_callback);
        }
    }
    /**
     * 显示提示信息
     * @param string $message 显示信息
     * @param string $jumpUrl 跳转地址
     * @param string $param   跳转带的参数
     * @param int $time
     */
    public function message($message = '', $jumpUrl = "",$param="",$time=5)
    {   if($time==0) {
        $oauth_callback = $_SERVER['HTTP_HOST'];//受访地址
        header("Refresh:0;url=http://".$oauth_callback.$jumpUrl);//0秒后跳转到仪表盘
        exit();
    }
        if(is_array($param)){
            $str=http_build_query($param);
        }else{
            $str=$param;
        }
        $this->DATA['time'] = $time;
        $this->DATA['message'] = $message;
        $this->DATA['jumpUrl'] = $jumpUrl;
        $this->DATA['param'] = $str;
        $this->display($this->DATA, "message");
        exit();
    }
    public function dataFmt($code = 200, $data) {
        $ret = array ();
        switch ($code) {
            case 200 :
                $ret ['code'] = $code;
                $ret ['msg'] = "操作成功";
                if ($data)
                    $ret ['data'] = $data;
                break;
            default :
                $ret ['code'] = $code;
                $ret['msg'] = $data;
                break;
        }
        $ret ['time'] = time();
        $ret = json_encode($ret);
        return $ret;
    }
}