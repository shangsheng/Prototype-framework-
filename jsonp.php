<?php 
  $callback = $_GET['callback'];
  // $username = $_GET['name'];
  class Person {
    public $name;
    public $age;
    public $gender;
    function __construct($name, $age, $gender) {
      $this->name = $name;
      $this->age = $age;
      $this->gender = $gender;
    }
  }
  // $gg = new Person( $username , 18, '男');
  // $list = array( json_encode(new Person( 'guoguo', 18, '男')),
  // json_encode( new Person( 'jingjing', 218, '女') ), json_encode (new Person( 'duoduo', 28, '女')));
  // echo $callback.'('.json_encode($gg).')';
   echo $callback.'('.json_encode('{"jingjing",18,"男"}').')';
    // echo $callback.'('.'{"jingjing",18,"男"}'.')';
?>