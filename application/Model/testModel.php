<?php
 namespace Model;
 use SDF\Db\MongoCollection;
 class testModel extends MongoCollection{
     protected static $model;
     public function __construct()
     {
        self::$model = new MongoCollection('zhouqin','log');
         parent::__construct();
     }
     public function get_zhouqin_data(){
         $name= self::$model->find();
         $arr=array();
         foreach($name as $v){

                 $arr[]=$v['username'];

         }
         return $arr;
     }
     public function page($page,$pagesize,$where=array()){
        //self::iterator_to_array 解压mongodb数据集合
         $pagesize = $pagesize?$pagesize:20;//每页显示数量
         $page = $page>1?$page-1:0;//当前第几页
         $skip = $page * $pagesize;//跳过记录数
         $count = self::$model->count();
//         if(!empty($where)){
            $data = self::$model->find($where)->skip($skip)->limit($pagesize);
//         }else{
//             $data = self::$model->find()->skip($skip)->limit($pagesize);
//         }

         $list = array(
             'data'=>self::iterator_to_array($data),
             'count'=>$count
         );
        return $list;
     }
 }