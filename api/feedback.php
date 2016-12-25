<?php 
header("Access-Control-Allow-Origin: *");
//header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');


include "common/db.php";
$conn = connectDB();

$formData = json_decode(file_get_contents('php://input'));
//print_r($formData);
if(isset($_GET['group'])) $group=$_GET['group'];



if(isset($formData)){
    foreach ($formData as $key=>$value) {
        $_POST[$key]=$value;
    }

    if(isset($_POST['encounter_nr'])) $encounter_nr  = $_POST['encounter_nr'];
    if(isset($_POST['Comment']))  $Comment  = $_POST['Comment'];
    if(isset($_POST['pid']))  $pid  = $_POST['pid'];
    if(!empty($encounter_nr) && !empty($Comment  )&& !empty($pid  )){
		$sql  = "select encounter_nr from care_encounter_feedback where encounter_nr = '".$encounter_nr."'";
		$result = $conn->query($sql);

		$count = $result->num_rows;
		if ($count > 0 ){
			$sql = "update care_encounter_feedback set comment = '".$Comment."' where encounter_nr = '".$encounter_nr."' ";
	   		$query = $conn->query($sql);
		} else {
	   		$sql = "insert into care_encounter_feedback (uhid, encounter_nr, comments) values('".$pid."', '".$encounter_nr."', '".$Comment."' )";
	   		$query = $conn->query($sql);
		}
		if(empty($group)) $group="admission_process";
	}
   
}

if(!empty($group)){
	$arr = array("admission_process"=>"ADMISSION PROCESS", "rooms_wards" => "ROOMS / WARDS",  
		'duty_doctors'=>"DUTY DOCTORS",
		'nursing_care'=>"NURSING CARE",
		'tests_treatment'=>"TESTS / TREATMENT",
		'diet'=>"DIET",
		'other_services'=>"OTHER SERVICES",
		'satisfaction_overview'=>"SATISFATION OVERVIEW",
		'registration_process'=>"REGISTRATION PROCESS",
		'waiting_area'=>"WAITING AREA",
		'consultation'=>"CONSULTATION",
		'overall_assessment'=>"OVERALL ASSESSMENT"
	);


	$db_group =$arr[$group];
	if(empty($db_group )) $db_group =  'admission_process';

	$next_group = '';  $flag = '';
	foreach($arr as $index=>$value) 
	{
		if($flag==true) { $next_group = $index; break; }
		if($group == $index ) $flag = true;
	}
	
	$sql = "select * from care_encounter_feedback_master where group_front_office = '".$db_group."'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		$response = $result->fetch_assoc();

		$conn->close();
		header('Content-Type: application/json');

		$result = ["Response" => $response, "err" => $err];
		echo json_encode($result);


	} else {
	    $err= "0 results";
	}
}

// --------------------------------------------- 
if(empty($group)){
	$response = '';
	$err = 'Unknown error';

	$uhid = '';
	if(isset($_GET['uhid'])){
		$uhid = $_GET['uhid'];
	}



	if($uhid != ''){

		$sql = "SELECT cp.name_first, cp.name_last , cp.cellphone_1_nr";
		$sql .= ", ce.encounter_nr, ce.pid";
		$sql .= " FROM care_person cp";
		$sql .= " LEFT JOIN  care_encounter ce ON cp.pid = ce.pid";
		$sql .= " WHERE ce.encounter_nr = '".$uhid."'";

		//echo $sql;
		//$sql = "SELECT * FROM patients WHERE doctor_id = '".$patientsId."'";
		//echo $sql = "SELECT Upper(Concat(cp.name_first,' ', cp.name_last)) as PatientName, cp.pid as pid, cp.date_birth as dob, cp.religion as religion, ce.encounter_nr as encounter_nr, cw.name as ward_name, cr.room_nr as roomno  FROM `care_personell` as cpp, care_encounter as ce, care_person as cp, care_ward as cw, care_room as cr WHERE ce.current_att_dr_nr = '".$patientsId."' and ce.pid = cp.pid and ce.current_ward_nr = cw.nr and ce.current_room_nr = cr.nr group by cp.pid"; 

		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			$response = $result->fetch_assoc();
		} else {
		    $err= "0 results";
		}
	}




	$conn->close();
	header('Content-Type: application/json');

	$result = ["Response" => $response, "err" => $err];
	echo json_encode($result);
}
?>