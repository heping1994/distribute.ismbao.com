<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/13
 * Time: 17:12
 */

namespace controllers;
use SDF\Db\MongoCollection;
use \SDF\Common\Auth;
use \SMB\Controllers\auth_console;
use SMB\Controllers\CRUD;

class index extends  baseController{
    function __construct() {
        parent::__construct();
        //初始化配送员表
        $model = new MongoCollection('distribution');
        $arr = $model->findOne(array('distribute_id'=>self::$admin_user['_id']));
        if(empty($arr)){
            $data = array(
                'distribute_id'=>self::$admin_user['_id'],
                'all_waybil'=>0,
                'person_pick_up_time'=>1,
                'all_ordernum'=>0,
                'team_pick_up_time'=>1,
                'all_mileage'=>0,
                'response'=>1,
                'all_delitime'=>0,
                'speed'=>1,
                'prescription'=>1,
                'state'=>1,
                'last_time'=>'',
                'openid'=>self::$admin_user['openid'],
//                'shop_id'=>self::$admin_user['site_id'],
                'order_mileage'=>0
        );
            $model->insert($data);
        }

    }
    public  function  index(){
        $map = array();
        if(isset($_GET['state'])&&$_GET['state']){
            $map['waybil_state'] =  intval($_GET['state']);
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
        $this->DATA['id'] = self::$admin_user['_id'];
        echo self::$admin_user['_id'];
        self::display($this->DATA);



    }
    //取消货单
    public function cancel_order(){
        $id = $_POST['_id'];
        if(!$id){
            $this->_error('操作失败哦');
        }
        $db = new MongoCollection('waybil');
        $rs_del = $db->remove(array("_id"=>new \MongoId($id)));
        echo json_encode($rs_del);
    }
    //接受货单
    public function confirm_order(){
        $id = $_POST['_id'];
        if(!$id){
            $this->_error('操作失败哦');
        }
        $db = new MongoCollection('waybil');
        $rs_del = $db->update(array("_id"=>new \MongoId($id)),array('$set'=>array('confirm_waybil'=>2)));
        echo json_encode($rs_del);
    }
    //开始派单
    public function bengin_order(){
        $id = $_POST['_id'];
        $shop_id = $_POST['shop_id'];

        if(!$id||!$shop_id){
            $this->_error('操作失败哦');
        }

        $db = new MongoCollection('waybil');
        $data = $db->findOne(array("_id"=>new \MongoId($id)));


        foreach ($data['order_list'] as $k=>$v){
            $data['order_list'][$k][2] = "2";
        }

        $rs_del = $db->update(array("_id"=>new \MongoId($id)),array('$set'=>array('waybil_state'=>2,'order_list'=>$data['order_list'])));

        //修改个人平均取货时间
        $model = new MongoCollection('delivery_log');//实例化派送日志表
        $bring_end_time = time();//记录该配送员取货完成截止时间
        $bring_time = ceil((time()-$data['createtime'])%86400/60);//记录该配送员一次整个取货时间
        $arr = array(
            'createtime'=>time(),
            'bring_end_time'=>$bring_end_time,
            'distribution_name'=>self::$admin_user['nickname'],
            'distribution_id'=>self::$admin_user['_id'],
            'bring_time'=>$bring_time,
            'condition'=>1
//            'site_id'=>self::$admin_user['site_id']
        );
        
        $model->insert($arr);
        $data = $db->update(array("_id"=>new \MongoId($id)),array('$set'=>array('delivery_log'=>$arr['_id'])));
         echo json_encode();
    }
    //获取该货单下上一个完成的订单
    public function get_ago_order(){
        $waybil_id = $_POST['waybil_id'];//货单id
        $order_id = $_POST['order_id'];//订单id
        $db = new MongoCollection('waybil');
        $data = $db->findOne(array("_id"=>new \MongoId($waybil_id)));
        $time = 0;
        $address = '';
        foreach ($data['order_list'] as $k=>$v){//找到该货单下上一个完成的订单
            if(isset($v[5])&&$v[5]>$time){
                $time = $v[5];
            }
        }
        if($time!=0){//如果该订单不是该货单下第一个订单,则返回上一个完成的订单的位置

            foreach ($data['order_list'] as $k=>$v){
                if(isset($v[5])&&$v[5]==$time){
                    $address = $v[3];
                }
            }
        }else{//如果该订单是该货单下第一个订单，则返回门店地址
            $address = '渝北区民心佳园';
        }
        echo json_encode($address);
    }
    //完成订单
    public function finsh_order(){
        $waybil_id = $_POST['waybil_id'];//货单id
        $order_id = $_POST['order_id'];//订单id
        $order_distance = $_POST['order_distance']/1000;//订单到门店的距离
        if(!$waybil_id || !$order_id){
            $this->_error('操作失败哦');
        }
        $db = new MongoCollection('waybil');
        $data = $db->findOne(array("_id"=>new \MongoId($waybil_id)));
        $check_waybil_finsh = true;//默认该货单下所有订单都已经完成配送
        foreach ($data['order_list'] as $k=>$v){
            if($v[0]==$order_id){
                $data['order_list'][$k][2] = "3";//修改该订单状态
                $data['order_list'][$k][5] = time();//存入该订单完成时间戳
                $v[2] = "3";
            }
            if($v[2]==1 || $v[2]==2){//若该货单下面存在还没有完成配送的订单，则不修改该货单的状态
                $check_waybil_finsh = false;
            }
        }
        if(isset($data['this_distance'])&&$data['this_distance']>0){//判断该订单是不是该货单下第一个完成的订单
            $order_distance = $order_distance+$data['this_distance'];//不是 ，则该订单与上个订单的距离加上该货单配送的历史距离
        }
        if($check_waybil_finsh){
            $arr = array('waybil_state'=>3,'order_list'=>$data['order_list'],'this_distance'=>$order_distance);
        }else{
            $arr = array('order_list'=>$data['order_list'],'this_distance'=>$order_distance);
        }
        $rs_del = $db->update(array("_id"=>new \MongoId($waybil_id)),array('$set'=>$arr));

        $model = new MongoCollection('distribution');
        $list = $model->findOne(array('distribute_id'=>self::$admin_user['_id']));
        /*
         * 修改总混云单
         * 修改总订单
         * 修改最后送达时间
         * */
        $all_waybil = $list['all_waybil'];//获取该配送员历史总配送货单数
        $last_time = $list['last_time'];//获取该配送员最后一次完成订单的时间
        $all_ordernum = $list['all_ordernum']+1;//修改总订单数


        $delivery_log = new MongoCollection('delivery_log');
        /*
         * 插入本次混运单的距离
         * 插入本次混运单的时间
         * */
        if($check_waybil_finsh){//如果该订单是该货单下最后一个完成的订单
            $all_waybil += 1;
            $last_time = time();
            $delivery_arr = array(
                'mileage'=>$list['order_mileage'],
                'updatatime'=>time(),
                'delivery_time'=>ceil((time()-$data['createtime'])%86400/60),
                'all_waybil'=>$all_waybil,
                'all_ordernum'=>$list['all_ordernum']+1
            );
            $delivery_log->update(array('_id'=>new \MongoId($data['delivery_log'])),array('$set'=>$delivery_arr));
        }
        $list_arr = array(
            'all_waybil'=>$all_waybil,
            'all_ordernum'=>$all_ordernum,
            'last_time'=>$last_time
        );
        $model->update(array('distribute_id'=>self::$admin_user['_id']),array('$set'=>$list_arr));
        echo json_encode(555);
    }
    //修改配送员地理位置
    public function updata_coordinate(){
        $lat = $_POST['lat'];//纬度
        $lng = $_POST['lng'];//经度
        $arr = array($lng,$lat);
        $model = new MongoCollection('distribution');
        $model->update(array('distribute_id'=>self::$admin_user['_id']),array('$set'=>array('coordinate'=>$arr)) );
    }
    public function qq(){
        $db = new MongoCollection('waybil');
        $data = $db->find(array('tixing'=>1));
        $data = iterator_to_array($data);
        if(count($data)>0){
            foreach ($data as $v){
                $db->update(array("_id"=>new \MongoId($v['_id'])),array('$set'=>array('tixing'=>2) ));
            }
            echo json_encode(1);
        }else{
            echo json_encode(2);
        }
        
    }
}