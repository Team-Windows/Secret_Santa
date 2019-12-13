<?php

function getView($file){
  require ('view/'.$file);
}

require_once ('req/header.php');




if(isset($_GET['action'])){

  $action = $_GET['action'];

  switch ($action) {
    case 'connection':
    getView('loggin.php');

    break;

    case 'inscription' :
    getView('inscription.php');
    break;

    default:
    getView('404.php');
    break;
  }
}




















require_once ('req/footer.php');
