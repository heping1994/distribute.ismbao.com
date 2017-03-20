<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/16
 * Time: 9:26
 */

namespace controllers;
use SDF\Db\MongoCollection;
use \SDF\Common\Auth;
use SDF\Model\order;
use \SMB\Controllers\auth_console;
use SMB\Controllers\CRUD;

class order_detail extends baseController{
    function __construct() {
        parent::__construct();
    }
    public function index(){
        $order_id = $_GET['order_id'];
        $model = new order();
        $data = $model->getOrderById($order_id);
        $member=new MongoCollection('member');
        $member_info=$member->findOne(array('openid'=>$data['buyer_openid']));
        $this->DATA['member_info'] = $member_info;
        $this->DATA['data'] = $data;
        self::display( $this->DATA);
    }
    public function ruote(){
        $this->DATA['coordinate'] = $_GET['coordinate'];
        self::display( $this->DATA);
    }
}