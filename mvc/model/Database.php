<?php


error_reporting(E_ALL);
ini_set('display_errors', 1);
// import the ENV variables ====================================================
include('autoload.php');


class Database {
    

    
    // connection to the Database ==============================================
    private static function conn(){

        $conn =  new mysqli(env("DB_HOST"), env("DB_USERNAME"),env("DB_PASSWORD"), env("DB_NAME")) or die("Connection failed %s\n" . $conn->error);
        return $conn;
    }
    


    // initialize the Database [not implemented yet in frontend] ===============
    public static function init(){
        $sql_query =<<<SQL_CREATE_TABLES
        CREATE TABLE IF NOT EXISTS `mediaserver`.`viewed` ( `ID` INT NOT NULL AUTO_INCREMENT , `COURSE` VARCHAR(256) NOT NULL , `TOPIC` VARCHAR(256) NOT NULL , `LECTURE` VARCHAR(256) NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;
        CREATE TABLE IF NOT EXISTS `mediaserver`.`completed` ( `ID` INT NOT NULL AUTO_INCREMENT , `COURSE` VARCHAR(256) NOT NULL , `TOPIC` VARCHAR(256) NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;
        CREATE TABLE IF NOT EXISTS `mediaserver`.`notes` ( `ID` INT NOT NULL AUTO_INCREMENT , `COURSE` VARCHAR(256) NOT NULL , `TOPIC` VARCHAR(256) NOT NULL , `LECTURE` VARCHAR(256) NOT NULL , `TIME` VARCHAR(256) NOT NULL , `NOTE` VARCHAR(1000) NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;
        CREATE TABLE IF NOT EXISTS `mediaserver`.`unfinished` ( `ID` INT NOT NULL AUTO_INCREMENT , `COURSE` VARCHAR(256) NOT NULL , `TOPIC` VARCHAR(256) NOT NULL , `LECTURE` VARCHAR(256) NOT NULL , `TIME` VARCHAR(256) NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;
        SQL_CREATE_TABLES;

        $conn = self::conn();
        if ($conn->query($sql_query) === TRUE){
            echo "Database created successfully";
        } else {
          echo "Error creating database: " . $conn->error;
        }
        $conn->close();
    }

    // =========================================================================
    // =========================================================================
    //                          INSERT
    // =========================================================================
    // =========================================================================



    // insert COMPLETED topic ==================================================
    public static function insert_completed($course, $topic){
        $conn = self::conn();
        $stmt = $conn->prepare("INSERT INTO `completed` (`COURSE`, `TOPIC`) VALUES (?,?);");
        $stmt->bind_param("ss", $course, $topic);
        $stmt->execute();
        $conn->close();
    }


    // insert NOTES ============================================================
    public static function insert_notes($course, $topic, $lecture, $time, $note){
        $conn = self::conn();
        $stmt = $conn->prepare("INSERT INTO `notes` (`COURSE`, `TOPIC`, `LECTURE`, `TIME`, `NOTE`) VALUES (?,?,?,?,?);");
        $stmt->bind_param("sssss",$course, $topic, $lecture, $time, $note);
        $stmt->execute();
        $conn->close();
    }


    // insert UNFINISHED =======================================================
    public static function insert_unfinished($course, $topic, $lecture, $time){
        $conn = self::conn();
        $stmt = $conn->prepare("INSERT INTO `unfinished` (`COURSE`, `TOPIC`, `LECTURE`, `TIME`) VALUES (?,?,?,?);");
        $stmt->bind_param("ssss",$course, $topic, $lecture, $time);
        $stmt->execute();
        $conn->close();
    }


    // insert VIEWED =======================================================
    public static function insert_viewed($course, $topic, $lecture){
        $conn = self::conn();
        if ($stmt = $conn->prepare("INSERT INTO `viewed` (`COURSE`, `TOPIC`, `LECTURE`) VALUES (?,?,?);")){
            echo "INSERT INTO `viewed` (`COURSE`, `TOPIC`, `LECTURE`) VALUES ($course, $topic, $lecture)";
            $stmt->bind_param("sss",$course, $topic, $lecture);
            $stmt->execute();
        } else{
            $error = $conn->errno . ' ' . $conn->error;
            echo $error; 
        }
        $conn->close();
    }




}




?>