<?php 

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

$formData = json_decode(file_get_contents('php://input'));
print_r($formData);
if(isset($formData)){
    foreach ($formData as $key=>$value) {
        $_POST[$key]=$value;
    }
}

if(isset($_POST['FirstName'])){
	$name = $_POST['FirstName'];
}
if(isset($_POST['Email'])){
	$email = $_POST['Email'];
}
if(isset($_POST['PhoneNo'])){
	$phone = $_POST['PhoneNo'];
}

if(isset($_POST['Address'])){
	$address = $_POST['Address'];
}
//$address = $_POST['Address'];

$response = '';
$err = 'Unknown error';


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kenyasample";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if(!empty($name) && !empty($email) && !empty($phone) && !empty($address))
{
	echo $sql = "INSERT INTO registration (name, email, phone, address)
	VALUES ('". $name ."', '". $email ."', '". $phone ."', '". $address ."')";

	if ($conn->query($sql) === TRUE) {
	    echo "New record created successfully";
	    $response = "Registration completed successfully";
	} else {
	    //echo "Error: " . $sql . "<br>" . $conn->error;
	    $err = $conn->error;
	}

	$conn->close();	
}





header('Content-Type: application/json');

$result = ["res" => $response, "err" => $err];
echo json_encode($result);

?>