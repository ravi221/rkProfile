<?php
function connectDB(){
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "ghchis";

	/*$servername = "192.168.0.132";
	$username = "root";
	$password = "root";
	$dbname = "chennaihis";*/

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 
	return $conn;
}