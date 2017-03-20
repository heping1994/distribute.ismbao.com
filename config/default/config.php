<?php

return array(
    /*'app_path'=>'audio_application',//程序所在位置，默认:application*/
//    'default_control'=>'testController',
    'project'=>array(
        'name'=>'tzs2',
        //'tpl_path'=> \SDF\SDF::getRootPath() . 'template' . DS . 'audio'. DS,//项目模板所在位置,默认: \SDF\SDF::getRootPath() . 'template' . DS . 'default'. DS
    ),
    'wechat_options' => array(
        'token'=>'KassSoftO2O', //填写您设定的key
        'appid'=>'wx9b887f333c5bb5ea', //填写高级调用功能的app id
        'appsecret'=>'77b05650c581c14faecb86c6da4a557f' //填写高级调用功能的密钥
    ),
    'thumb_host'=>'img.ismbao.com',
    
    /*文件上传配置*/
    'allexts'=>array('jpg', 'gif', 'png', 'jpeg','doc','xls','csv','zip','docx','xlsx','pdf','rar'),//允许上传文件类型
    'savePath'=> UPLOAD_PATH,//上传路径设置
    'maxSize'=> 3145728,//允许最大上传文件大小 默认3MB
    'UPLOAD_FILE_RULE'=> 'time',

    /*文件上传目录配置*/
    'subType'   => 'date',//子目录格式
    'dateFormat' => 'Ym',//子目录命名
    'autoSub'=>true,//是否启用子目录

);