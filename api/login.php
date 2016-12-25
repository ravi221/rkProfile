<?php 
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

$formData = json_decode(file_get_contents('php://input'));
//print_r($formData);
if(isset($formData)){
    foreach ($formData as $key=>$value) {
        $_POST[$key]=$value;
    }
}
$name='';
if(isset($_POST['username'])){
	$name = $_POST['username'];
}
$pass='';
if(isset($_POST['password'])){
	$pass = $_POST['password'];
}

//$address = $_POST['Address'];
    

 

$response = '';
$err = 'Unknown error';


include "common/db.php";
$conn = connectDB();

//if(!empty($name) && !empty($pass) )
//{
	//$sql = "SELECT login_id, password FROM  care_users where  personell_nr != 96 and personell_nr != 0";
	$sql = "SELECT u.login_id FROM `care_users`  as u ,care_personell as pr WHERE u.personell_nr=pr.nr and pr.job_type_nr=17 and u.login_id='".$name."' and u.password='".md5($pass)."'";
	$result = $conn->query($sql);
	
	if ($result->num_rows > 0) {
		//$response = $result->fetch_assoc();
		//$response = "Login completed successfully";  JWT
		$response = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODAxMTQ3MjIsImlkIjoiZ2FuZXNoMzVAZ21haWwuY29tIiwib3JpZ19pYXQiOjE0ODAxMTExMjJ9.zZPGnmO8_-_r_w3cvHercOki4Lpjohmu1D3sM4WAlyc';
	} else {
	    $err= "0 results";
	}
	/*if ($conn->query($sql) === TRUE) {
	   // echo "New record created successfully";
	    $response = "Login completed successfully";
	} else {
	   // echo "Error: " . $sql . "<br>" . $conn->error;
	    $err = $conn->error;
	}
*/
	$conn->close();	
//}





header('Content-Type: application/json');

$result = ["token" => $response, "err" => $err];
echo json_encode($result);

?>