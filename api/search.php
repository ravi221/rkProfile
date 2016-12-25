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

if(isset($_GET['search'])){
	$search = $_GET['search'];
}


$response = '';
$err = 'Unknown error';


$servername = "localhost:3307";
$username = "root";
$password = "root";
$dbname = "kenyasample";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if(!empty($search))
{
	$sql = "select * from registration WHERE name LIKE '%$search%'";

	if ($conn->query($sql) === TRUE) {
	    echo "New record created successfully";
	    $response = "Registration completed successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	    $err = $conn->error;
	}

	$conn->close();	
}





header('Content-Type: application/json');

$result = ["res" => $response, "err" => $err];
echo json_encode($result);

?>