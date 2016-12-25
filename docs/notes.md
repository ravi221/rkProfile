SELECT encounter_nr, notes,type_nr,CASE WHEN type_nr=500 THEN 'CHIEF COMPLIENTS' ELSE 'ALLERGIES' END AS TYPE
FROM `care_encounter_notes` 
WHERE type_nr
IN ( 500, 22 ) and encounter_nr=201602190005

UNION

SELECT encounter_nr,code ,'' as type_nr,c.description as TYPE
FROM `care_encounter_diagnosis` d, care_icd10_en c  WHERE c.diagnosis_code=d.code and encounter_nr=201602190005

UNION

select bill_item_encounter_nr as encounter_nr,bill_item_desc,bill_item_code,p.group_id as TYPE
from care_billing_bill_item b  LEFT JOIN care_test_param p ON p.id=b.bill_item_code where b.bill_item_encounter_nr=201602190005  and status NOT IN ('cancel') and type_nr IN (325,425,525,625,3225,1425)



SELECT  '' AS PatientName,  '' AS dob,  '' AS religion,  '' AS doctor,  '' AS ward_name, encounter_nr, notes, type_nr, 
CASE  WHEN type_nr = 500
THEN  'CHIEF COMPLIENTS'
ELSE  'ALLERGIES'
END  AS 
TYPE 
FROM  `care_encounter_notes` 
WHERE type_nr
IN ( 500, 22  )  AND encounter_nr =  '201611190000'
UNION 
SELECT  '' AS PatientName,  '' AS dob,  '' AS religion,  '' AS doctor,  '' AS ward_name, encounter_nr, code,  '' AS type_nr, c.description AS 
TYPE 
FROM  `care_encounter_diagnosis` d, care_icd10_en c
WHERE c.diagnosis_code = d.code AND encounter_nr =  '201611190000'
UNION 
SELECT  '' AS PatientName,  '' AS dob,  '' AS religion,  '' AS doctor,  '' AS ward_name, bill_item_encounter_nr AS encounter_nr, bill_item_desc, bill_item_code, p.group_id AS 
TYPE 
FROM care_billing_bill_item b
LEFT  JOIN care_test_param p ON p.id = b.bill_item_code
WHERE b.bill_item_encounter_nr =  '201611190000'  AND type_nr
IN ( 325, 425, 525, 625, 3225, 1425  ) 
UNION 
SELECT Upper( Concat( cp.name_first,  ' ', cp.name_last )  )  AS PatientName, cp.date_birth AS dob, cp.religion AS religion, ce.consulting_dr AS doctor, cw.name AS ward_name, ce.encounter_nr AS encounter_nr,  '' AS notes,  '' AS type_nr,  '' AS 
TYPE  FROM care_encounter AS ce, care_person AS cp, care_ward AS cw, care_room AS cr
WHERE cp.pid =  ce.pid and ce.encounter_nr = '201611190000' AND ce.current_ward_nr = cw.nr AND ce.encounter_class_nr = 1
GROUP  BY cp.pid
LIMIT 10 



SELECT '' AS PatientName, '' AS dob, '' AS religion, '' AS doctor, '' AS ward_name, encounter_nr, notes, type_nr,
CASE WHEN type_nr = 500
THEN 'CHIEF COMPLIENTS'
ELSE 'ALLERGIES'
END AS
TYPE
FROM `care_encounter_notes`
WHERE type_nr
IN ( 500, 22 ) AND encounter_nr = '201611190000'
UNION
SELECT '' AS PatientName, '' AS dob, '' AS religion, '' AS doctor, '' AS ward_name, encounter_nr, code, '' AS type_nr, c.description AS
TYPE
FROM `care_encounter_diagnosis` d, care_icd10_en c
WHERE c.diagnosis_code = d.code AND encounter_nr = '201611190000'
UNION
SELECT '' AS PatientName, '' AS dob, '' AS religion, '' AS doctor, '' AS ward_name, bill_item_encounter_nr AS encounter_nr, bill_item_desc, bill_item_code, p.group_id AS
TYPE
FROM care_billing_bill_item b, care_encounter ce
LEFT JOIN care_test_param p ON p.id = b.bill_item_code
LEFT JOIN care_person cp ON cp.pid = ce.pid
LEFT JOIN  care_ward cw ON ce.current_ward_nr = cw.nr
WHERE b.bill_item_encounter_nr = '201611190000' and ce.encounter_class_nr = 1 AND type_nr
IN ( 325, 425, 525, 625, 3225, 1425 )



SELECT  '' AS PatientName,  '' AS dob,  '' AS religion,  '' AS doctor,  '' AS ward_name, encounter_nr, notes, type_nr, 
		CASE  WHEN type_nr = 500
		THEN  'CHIEF COMPLIENTS'
		ELSE  'ALLERGIES'
		END  AS 
		TYPE 
		FROM  `care_encounter_notes` 
		WHERE type_nr
		IN ( 500, 22  )  AND encounter_nr =  '".$patientId."'
		UNION 
		SELECT  '' AS PatientName,  '' AS dob,  '' AS religion,  '' AS doctor,  '' AS ward_name, encounter_nr, code,  '' AS type_nr, c.description AS 
		TYPE 
		FROM  `care_encounter_diagnosis` d, care_icd10_en c
		WHERE c.diagnosis_code = d.code AND encounter_nr =  '".$patientId."'
		UNION 
		SELECT  '' AS PatientName,  '' AS dob,  '' AS religion,  '' AS doctor,  '' AS ward_name, bill_item_encounter_nr AS encounter_nr, bill_item_desc, bill_item_code, p.group_id AS 
		TYPE 
		FROM care_billing_bill_item b
		LEFT  JOIN care_test_param p ON p.id = b.bill_item_code
		WHERE b.bill_item_encounter_nr =  '".$patientId."'  AND type_nr
		IN ( 325, 425, 525, 625, 3225, 1425  ) 
		UNION 
		SELECT Upper( Concat( cp.name_first,  ' ', cp.name_last )  )  AS PatientName, cp.date_birth AS dob, cp.religion AS religion, ce.consulting_dr AS doctor, cw.name AS ward_name, ce.encounter_nr AS encounter_nr,  '' AS notes,  '' AS type_nr,  '' AS 
		TYPE  FROM care_encounter AS ce, care_person AS cp, care_ward AS cw, care_room AS cr
		WHERE cp.pid =  ce.pid and ce.encounter_nr = '".$patientId."' AND ce.current_ward_nr = cw.nr AND ce.encounter_class_nr = 1
		GROUP  BY cp.pid
		LIMIT 10 
