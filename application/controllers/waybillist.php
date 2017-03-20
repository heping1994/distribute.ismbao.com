<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/14
 * Time: 10:31
 */

namespace controllers;

use SDF\Db\MongoCollection;
use \SDF\Common\Auth;
use \SMB\Controllers\auth_console;
use SMB\Controllers\CRUD;
class waybillist extends baseController{
    function __construct() {
        parent::__construct();
    }
    public function index(){
        if(isset($_GET['state'])&&$_GET['state']){
            $map['state'] =  $_GET['state'];
        }
//        $map['distrbut_name'] = self::$admin_user['nickname'];
        $limit = 20;//每页显示数量
        $page = intval(@$_REQUEST['page'])-1;//当前第几页
        $page = $page<1 ? 0 : $page;
        $skip = $page * $limit;//跳过记录数

        $db = new MongoCollection('waybil');
        $list = $db->find($map)->skip($skip)->limit($limit);
        $recordsFiltered = $db->find($map)->count();
        $list = iterator_to_array($list);
        $page_model = new \SMB\Utils\page($recordsFiltered,$limit);
        $this->DATA['page_html'] = $page_model->show();
        $this->DATA['list'] = $list;
        self::dispaly($this->DATA);
    }
}