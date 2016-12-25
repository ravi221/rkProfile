<?php 
header("Access-Control-Allow-Origin: *");
//header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

$formData = json_decode(file_get_contents('php://input'));
//print_r($formData);

$response = '';
$err = 'Unknown error';

/*
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "billrothhis";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
*/
include "common/db.php";
$conn = connectDB();

$doctorId = '';
if(isset($_GET['id'])){
	$doctorId = $_GET['id'];
}

$patientsId = '';
if(isset($_GET['pDoctorId'])){
	$patientsId = $_GET['pDoctorId'];
}
$patientId = '';
if(isset($_GET['patientId'])){
	$patientId = $_GET['patientId'];
}
if($doctorId == ''){
	//$sql = "SELECT * FROM register";
	$sql = "SELECT Upper(Concat(cp.name_first,' ', cp.name_last)) as DoctorName, cp.pid as pid , cp.date_birth as dob, cpp.nr as personell_nr, cp.cellphone_1_nr as phone, cd.name_formal as department FROM `care_personell` as cpp, care_person as cp,care_department as cd, care_encounter as ce WHERE cpp.nr = ce.current_att_dr_nr and ce.current_dept_nr = cd.nr and cpp.pid = cp.pid  and cpp.job_type_nr='17' and ce.encounter_class_nr = 1 group by cpp.nr";   
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		//$response = $result->fetch_all_assoc(); //->fetch_assoc();
		$response = mysqli_fetch_all($result,MYSQLI_ASSOC);

	} else {
	    $err= "0 results";
	}
	
}
if($doctorId != ''){
	//$sql = "SELECT * FROM register WHERE id = '".$doctorId."'";
	$sql = "SELECT Upper( Concat( cp.name_first,  ' ', cp.name_last )  )  AS DoctorName, ce.encounter_nr AS encounter_nr, cp.pid AS pid, cp.date_birth AS dob, cpp.nr AS personell_nr, cp.cellphone_1_nr AS phone, cd.name_formal AS department

		FROM  `care_personell`  AS cpp, care_person AS cp, care_department AS cd, care_encounter AS ce
		WHERE cpp.nr = ce.current_att_dr_nr AND ce.current_dept_nr = cd.nr  AND cpp.pid = cp.pid AND cpp.job_type_nr =  '17' AND ce.encounter_class_nr = 1 AND cpp.nr =  '".$doctorId."'
		GROUP  BY cpp.nr";
	//$sql = "SELECT Upper(Concat(cp.name_first,' ', cp.name_last)) as DoctorName, cp.pid as pid, cpp.nr as personell_nr FROM `care_personell` as cpp, care_person as cp WHERE cpp.pid = cp.pid  and cpp.job_type_nr='17' and cpp.nr='".$doctorId."'";   
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$response = $result->fetch_assoc(); //->fetch_assoc();
		

	} else {
	    $err= "0 results";
	}
}


$conn->close();
header('Content-Type: application/json');

$result = ["Response" => $response, "err" => $err];
echo json_encode($result);

?>