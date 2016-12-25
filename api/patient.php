<?php 
header("Access-Control-Allow-Origin: *");
//header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

$formData = json_decode(file_get_contents('php://input'));
//print_r($formData);

$response = '';
$err = 'Unknown error';


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

$patientDescId = '';
if(isset($_GET['patientDescId'])){
	$patientDescId = $_GET['patientDescId'];
}

$enc = '';
if(isset($_GET['enc'])){
	$enc = $_GET['enc'];
}

if($patientsId != ''){

	$sql = "SELECT Upper(Concat(cp.name_first,' ', cp.name_last)) as PatientName, cp.pid as pid, cp.date_birth as dob, cp.religion as religion, ce.encounter_nr as encounter_nr, ce.consulting_dr as doctor, cw.name as ward_name FROM care_encounter as ce, care_person as cp, care_ward as cw, care_room as cr WHERE ce.current_att_dr_nr = '".$patientsId."' and ce.pid = cp.pid and ce.current_ward_nr = cw.nr and ce.encounter_class_nr = 1 limit 10";


	//$sql = "SELECT * FROM patients WHERE doctor_id = '".$patientsId."'";
	//echo $sql = "SELECT Upper(Concat(cp.name_first,' ', cp.name_last)) as PatientName, cp.pid as pid, cp.date_birth as dob, cp.religion as religion, ce.encounter_nr as encounter_nr, cw.name as ward_name, cr.room_nr as roomno  FROM `care_personell` as cpp, care_encounter as ce, care_person as cp, care_ward as cw, care_room as cr WHERE ce.current_att_dr_nr = '".$patientsId."' and ce.pid = cp.pid and ce.current_ward_nr = cw.nr and ce.current_room_nr = cr.nr group by cp.pid"; 

	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$response = mysqli_fetch_all($result,MYSQLI_ASSOC);
	} else {
	    $err= "0 results";
	}
}

if($patientId != ''){

	

	$sql = "SELECT cp.pid, cp.title, cp.name_first, cp.name_last, cp.date_birth, cp.religion";
	$sql .=", ce.consulting_dr, cw.name AS ward_name, 	ce.encounter_nr";
	$sql .=" FROM care_person AS cp ";
	$sql .=" LEFT JOIN care_encounter as ce on cp.pid =  ce.pid ";
	$sql .=" LEFT JOIN care_ward as cw on ce.current_ward_nr = cw.nr ";
	$sql .=" WHERE   ce.encounter_nr = '".$patientId."' AND ce.encounter_class_nr = 1";

	//$sql = "SELECT * FROM patients WHERE doctor_id = '".$patientId."'";
	 //$sql = "SELECT Upper(Concat(cp.name_first,' ', cp.name_last)) as PatientName, cp.pid as pid, cp.date_birth as dob, cp.religion as religion, ce.encounter_nr as encounter_nr, ce.consulting_dr as doctor, cw.name as ward_name FROM care_encounter as ce, care_person as cp, care_ward as cw, care_room as cr WHERE ce.current_att_dr_nr = '".$patientsId."' and cp.pid = '".$patientId."' and ce.current_ward_nr = cw.nr and ce.encounter_class_nr = 1 group by cp.pid limit 10";
	//$sql = "SELECT Upper(Concat(cp.name_first,' ', cp.name_last)) as PatientName, cp.pid as pid FROM care_person as cp WHERE cp.pid = '".$patientId."' group by cp.pid" ; 
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {

		$patientData = $result->fetch_assoc();
		$response['patientData'] = $patientData; 

		$sql = "SELECT cen.encounter_nr,cen.type_nr, cen.nr, cen.notes, cen.personell_name, cen.date, cen.time";
		$sql .=" FROM care_encounter_notes AS cen ";
		
		$sql .=" WHERE   cen.encounter_nr = '".$patientData['encounter_nr']."'";
		$sql .=" ORDER BY cen.type_nr, cen.date, cen.time DESC;";
		//echo $sql;
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			$encounterData = mysqli_fetch_all($result,MYSQLI_ASSOC);
			$encdata = array();
			$notes = unserialize($encounterData[2]['notes']); 

			//$encdata[] = $notes;
			// print_r($encounterData[2]['type_nr']);
			if($encounterData[2]['type_nr'] == 22 && $encounterData[3]['type_nr'] == 22){

				 $encounterData[2]['notes']=$notes ;
				 $encounterData[3]['notes']=$notes ;

			}
			//echo $encounterData[2]['notes'];
			
			 $response['encounterData'] = $encounterData;
			//print_r($response['encounterData']);
			$sql = "SELECT cbbi.bill_item_desc, cbbi.bill_item_code, cbbi.type_nr";
			$sql .= ", ctp.group_id";
			$sql .=" FROM care_billing_bill_item AS cbbi ";
			$sql .=" LEFT JOIN care_test_param ctp ON ctp.id = cbbi.bill_item_code";
			$sql .=" WHERE   cbbi.bill_item_encounter_nr = '".$patientData['encounter_nr']."'";
			$sql .=" and cbbi.bill_item_id IN (select max(bill_item_id) bill_item_id from care_billing_bill_item b,care_test_param p where bill_item_encounter_nr = '".$patientData['encounter_nr']."' and p.id=bill_item_code GROUP BY group_id)";
			$sql .=" ORDER BY cbbi.type_nr DESC;";
			/*$sql = "SELECT ced.code";
			$sql .= ", icd.description";
			$sql .=" FROM care_encounter_diagnosis AS ced ";
			$sql .=" LEFT JOIN care_icd10_en as icd on ced.code = icd.diagnosis_code ";
			$sql .=" WHERE   ced.encounter_nr = '".$patientData['encounter_nr']."'";*/
			//echo $sql;
			$result = $conn->query($sql);
			if ($result->num_rows > 0) {
				$response['labData'] = mysqli_fetch_all($result,MYSQLI_ASSOC);
			}	
		} 
	} else {
	    $err= "0 results";
	}
}

if($patientDescId != ''){

	

	$sql = "SELECT cp.pid, cp.title, cp.name_first, cp.name_last, cp.date_birth, cp.religion";
	$sql .=", ce.consulting_dr, cw.name AS ward_name, 	ce.encounter_nr";
	$sql .=" FROM care_person AS cp ";
	$sql .=" LEFT JOIN care_encounter as ce on cp.pid =  ce.pid ";
	$sql .=" LEFT JOIN care_ward as cw on ce.current_ward_nr = cw.nr ";
	$sql .=" WHERE   ce.encounter_nr = '".$patientDescId."' AND ce.encounter_class_nr = 1";

	//$sql = "SELECT * FROM patients WHERE doctor_id = '".$patientId."'";
	 //$sql = "SELECT Upper(Concat(cp.name_first,' ', cp.name_last)) as PatientName, cp.pid as pid, cp.date_birth as dob, cp.religion as religion, ce.encounter_nr as encounter_nr, ce.consulting_dr as doctor, cw.name as ward_name FROM care_encounter as ce, care_person as cp, care_ward as cw, care_room as cr WHERE ce.current_att_dr_nr = '".$patientsId."' and cp.pid = '".$patientId."' and ce.current_ward_nr = cw.nr and ce.encounter_class_nr = 1 group by cp.pid limit 10";
	//$sql = "SELECT Upper(Concat(cp.name_first,' ', cp.name_last)) as PatientName, cp.pid as pid FROM care_person as cp WHERE cp.pid = '".$patientId."' group by cp.pid" ; 
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {

		$patientData = $result->fetch_assoc();
		$response['patientData'] = $patientData;

		$sql = "SELECT cen.encounter_nr,cen.type_nr, cen.nr, cen.notes, cen.personell_name, cen.date, cen.time";
		$sql .=" FROM care_encounter_notes AS cen ";
		
		$sql .=" WHERE   cen.encounter_nr = '".$patientData['encounter_nr']."'";
		$sql .=" ORDER BY cen.type_nr, cen.date, cen.time DESC;";
		//echo $sql;
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			$encounterData = mysqli_fetch_all($result,MYSQLI_ASSOC);
			//print_r($encounterData);
			$response['encounterData'] = $encounterData;
			$sql = "SELECT cbbi.bill_item_desc, cbbi.bill_item_code, cbbi.type_nr";
			$sql .= ", ctp.group_id";
			$sql .=" FROM care_billing_bill_item AS cbbi ";
			$sql .=" LEFT JOIN care_test_param ctp ON ctp.id = cbbi.bill_item_code";
			$sql .=" WHERE   cbbi.bill_item_encounter_nr = '".$patientData['encounter_nr']."'";
			$sql .=" ORDER BY cbbi.type_nr DESC;";
			/*$sql = "SELECT ced.code";
			$sql .= ", icd.description";
			$sql .=" FROM care_encounter_diagnosis AS ced ";
			$sql .=" LEFT JOIN care_icd10_en as icd on ced.code = icd.diagnosis_code ";
			$sql .=" WHERE   ced.encounter_nr = '".$patientData['encounter_nr']."'";*/
			//echo $sql;
			$result = $conn->query($sql);
			if ($result->num_rows > 0) {
				$response['labData'] = mysqli_fetch_all($result,MYSQLI_ASSOC);
			}	
		} 
	} else {
	    $err= "0 results";
	}
}

	
	

if($enc != ''){
	//$sql = "SELECT * FROM patients WHERE doctor_id = '".$patientId."'";
	 $sql = "SELECT Upper(Concat(cp.name_first,' ', cp.name_last)) as PatientName, cp.pid as pid, cp.date_birth as dob, cp.religion as religion, ce.encounter_nr as encounter_nr, ce.consulting_dr as doctor, cw.name as ward_name FROM care_encounter as ce, care_person as cp, care_ward as cw, care_room as cr WHERE cp.pid = ce.pid and ce.encounter_nr = '".$enc."' and ce.current_ward_nr = cw.nr and ce.encounter_class_nr = 1 group by cp.pid limit 10";
	//$sql = "SELECT Upper(Concat(cp.name_first,' ', cp.name_last)) as PatientName, cp.pid as pid FROM care_person as cp WHERE cp.pid = '".$patientId."' group by cp.pid" ; 
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