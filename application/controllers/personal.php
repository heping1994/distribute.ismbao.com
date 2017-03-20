<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/14
 * Time: 15:59
 */

namespace controllers;
use SDF\Db\MongoCollection;
use \SDF\Common\Auth;
use \SMB\Controllers\auth_console;
use SMB\Controllers\CRUD;

class personal extends baseController{
    function __construct() {
        parent::__construct();
    }
    public function index(){
        $db = new MongoCollection('distribution');
        $data = $db->findOne(array('distribute_id'=>self::$admin_user['_id']));
        $this->DATA['data'] = $data;
        self::display($this->DATA);
    }
}