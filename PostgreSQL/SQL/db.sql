-- แก้ uuid_generate_v4() does not exist
-- fk__ชื่อตาราง__ชื่อคอลัม__ชื่อตารางที่กล่าวถึง__ชื่อคอลัมที่กล่าวถึง
-- 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE FUNCTION get_random_string(
        IN string_length INTEGER,
        IN possible_chars TEXT DEFAULT '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    ) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
    output TEXT = '';
    i INT4;
    pos INT4;
BEGIN
    FOR i IN 1..string_length LOOP
        pos := 1 + CAST( random() * ( LENGTH(possible_chars) - 1) AS INT4 );
        output := output || substr(possible_chars, pos, 1);
    END LOOP;
    RETURN output;
END;
$$;

CREATE TABLE photo (
    id serial,
    name character varying(255) NOT NULL,
    path character varying(300) NOT NULL,
    mimetype character varying(100) NOT NULL,
    thumbnail int,
    PRIMARY KEY(id),
    CONSTRAINT fk__photo__thumbnail__photo__id FOREIGN KEY (thumbnail)
        REFERENCES photo (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    name character varying(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    photo_id int,
    isactive BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk__users__photo_id__photo__id FOREIGN KEY (photo_id)
        REFERENCES photo (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE roles(
    id serial NOT NULL,
    name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE users_roles(
    id serial NOT NULL,
    users_id uuid NOT NULL,
    roles_id int NOT NULL,
    level int NOT NULL,
    note json,
    PRIMARY KEY (id),
    CONSTRAINT fk__users_roles__users_id__users__id FOREIGN KEY (users_id)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk__users_roles__roles_id__roles__id FOREIGN KEY (roles_id)
        REFERENCES roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE documenttype(
    code character varying(10),
    thainame character varying(20),
    engname character varying(20),
    path character varying(30),
    color character(7),
    PRIMARY KEY (code)
);

CREATE TABLE documentstatus(
    code character varying(10),
    thainame character varying(50),
    engname character varying(50),
    note character varying(100),
    isdisabled BOOLEAN NOT NULL,
    PRIMARY KEY (code)
);

CREATE TABLE document(
    id text default get_random_string(30) UNIQUE,
    name character varying(100),
    createby uuid,
    createdate timestamp,
    documenttype_code character varying(10),
    documentstatus_code character varying(10),
    documentdata_id character varying(30),
    isactive BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk__document__createby__users__id FOREIGN KEY (createby)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk__document__documenttype_code__documenttype__code FOREIGN KEY (documenttype_code)
        REFERENCES documenttype (code) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk__document__documentstatus_code__documentstatus__code FOREIGN KEY (documentstatus_code)
        REFERENCES documentstatus (code) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);


CREATE TABLE termyear(
    code character varying(10),
    thainame character varying(50),
    engname character varying(50),
    note character varying(100),
    isdisabled BOOLEAN NOT NULL,
    PRIMARY KEY (code)
);

CREATE TABLE faculty(
    id serial,
    thainame character varying(100) NOT NULL,
    engname character varying(100) NOT NULL,
    isdisabled BOOLEAN NOT NULL,
    PRIMARY KEY(id)
);



CREATE TABLE department(
    id serial,
    thainame character varying(100) NOT NULL,
    engname character varying(100) NOT NULL,
    faculty_id int,
    isdisabled BOOLEAN NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk__department__faculty_id__faculty__id FOREIGN KEY (faculty_id)
        REFERENCES faculty (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);



CREATE TABLE employee(
    id text default get_random_string(30) UNIQUE,
    thainame character varying(100) NOT NULL,
    engname character varying(100) NOT NULL,
    type character varying(50) NOT NULL,
    email character varying(100),
    phone character varying(15),
    website character varying(200),
    faculty_id int,
    department_id int,
    level int,
    users_id uuid,
    isactive BOOLEAN NOT NULL,
    status_code character varying(10),
    PRIMARY KEY (id),
    CONSTRAINT fk__employee__faculty_id__faculty__id FOREIGN KEY (faculty_id)
        REFERENCES faculty (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk__employee__users_id__users__id FOREIGN KEY (users_id)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk__employee__department_id__udepartment__id FOREIGN KEY (department_id)
        REFERENCES department (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);



CREATE TABLE education(
    year int NOT NULL,
    employee_id character varying(30) NOT NULL,
    level character varying(100) NOT NULL,
    course character varying(100) NOT NULL,
    major character varying(100) NOT NULL,
    academy character varying(100) NOT NULL,
    country character varying(255) NOT NULL,
    PRIMARY KEY(year,employee_id),
    CONSTRAINT fk__education_employee_id__employee__id FOREIGN KEY (employee_id)
        REFERENCES employee (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);


CREATE TABLE tqf2(
    id text default get_random_string(30) UNIQUE,
    program_name character varying(255),
    program_depart character varying(255),
    program_year_detail character varying(50),
    program_year character varying(50),
    program_code character varying(50),
    program_thainame character varying(255),
    program_engname character varying(255),
    program_type_th character varying(100),
    program_type_en character varying(100),
    full_thai character varying(255),
    mini_thai character varying(255),
    full_eng character varying(255),
    mini_eng character varying(255),
    major character varying(255),
    allcredit character varying(10),
    createdate timestamp,
    createby uuid,
    status_code character varying(10),
    file_id character varying(30),
    degrees_code character varying(50),
    PRIMARY KEY (id),
    CONSTRAINT fk__tqf3__createby__users__id FOREIGN KEY (createby)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE employee_roles(
    id serial NOT NULL,
    employee_id uuid NOT NULL,
    role character varying(50) NOT NULL,
    role_thainame character varying(200),
    role_engname character varying(200),
    level int NOT NULL,
    tqf2_id character varying(30),
    PRIMARY KEY (id),
    CONSTRAINT fk__employee_roles__employee_id__employee__id FOREIGN KEY (employee_id)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT fk__employee_roles__tqf2_id__tqf2__id FOREIGN KEY (tqf2_id)
        REFERENCES tqf2 (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE tqf2course(
    id text default get_random_string(30) UNIQUE,
    tqf2_id character varying(30),
    index int,
    course_code character varying(20),
    course_thainame character varying(511),
    course_engname character varying(511),
    course_credit character varying(10),
    course_prerequi character varying(30),
    course_describtion character varying(2000),
    PRIMARY KEY (id),
    CONSTRAINT fk__tqf2course__tqf2_id__tqf2__id FOREIGN KEY (tqf2_id)
        REFERENCES tqf2 (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE tqf2course_clo(
    id text default get_random_string(30) UNIQUE,
    tqf2course_id character varying(30),
    index int,
    value character varying(511),
    PRIMARY KEY (tqf2course_id,index),
    CONSTRAINT fk__tqf2course__tqf2course_id__tqf2course__id FOREIGN KEY (tqf2course_id)
        REFERENCES tqf2course (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE
);


CREATE TABLE tqf3(
    id text default get_random_string(30) UNIQUE,
    code character varying(10),
    thainame character varying(100),
    engname character varying(100),
    tqf2program_id character varying(30),
    tqf2course_id character varying(30),
    credit character varying(10),
    termyear_code character varying(10),
    pre_requisites_st character varying(30),
    pre_requisites_nd character varying(30),
    co_requisites character varying(30),
    place character varying(20),
    study_time character varying(100),
    no_students int,
    createdate timestamp,
    updatedate timestamp,
    createby uuid,
    documentstatus_code character varying(10),

    objective character varying(1024),
    description character varying(1024),
    describe character varying(1024),
    additionteach character varying(1024),
    activelearn character varying(1024),
    selflearn character varying(1024),
    consulthour character varying(1024),
    moraldev character varying(1024),
    moralteach character varying(1024),
    moralevaluation character varying(1024),
    knowledgeget character varying(1024),
    knowledgeteach character varying(1024),
    knowledgetvaluation character varying(1024),
    intellecdev character varying(1024),
    intellecteach character varying(1024),
    intellectevaluation character varying(1024),
    relation character varying(1024),
    reationteach character varying(1024),
    relationevaluation character varying(1024),
    analydev character varying(1024),
    analyteach character varying(1024),
    analyevaluation character varying(1024),
    rangeoutcome character varying(1024),
    rangeteach character varying(1024),
    rangeevaluation character varying(1024),
    book character varying(1024),
    doc character varying(1024),
    addodc character varying(1024),
    effect character varying(1024),
    evaluation character varying(1024),
    improve character varying(1024),
    exam character varying(1024),
    opeartion character varying(1024),

    PRIMARY KEY (id),
    CONSTRAINT fk__tqf3__createby__users__id FOREIGN KEY (createby)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk__tqf3__documentstatus_code__documentstatus__code FOREIGN KEY (documentstatus_code)
        REFERENCES documentstatus (code) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk__tqf3__termyear_code__termyear__code FOREIGN KEY (termyear_code)
        REFERENCES termyear (code) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk__tqf3__tqf2program_id__tqf2program__id FOREIGN KEY (tqf2program_id)
        REFERENCES tqf2 (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk__tqf3__tqf2course_id__tqf2course__id FOREIGN KEY (tqf2course_id)
        REFERENCES tqf2course (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE tqf3outcome(
    id text default get_random_string(30) UNIQUE,
    tqf3_id character varying(30),
    no int,
    text character varying(511),
    PRIMARY KEY (tqf3_id,no),
    CONSTRAINT fk__tqf3outcome__tqf3_id__tqf3__id FOREIGN KEY (tqf3_id)
        REFERENCES tqf3 (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE tqf3teachplan(
    id text default get_random_string(30) UNIQUE,
    tqf3_id character varying(30),
    week int,
    title character varying(511),
    hour int,
    activity character varying(511),
    professorweek character varying(511),
    activity_note character varying(511),
    why_not_plan character varying(511),
    sol_not_plan character varying(511),
    real_hour int,
    reason_note character varying(511),
    PRIMARY KEY (tqf3_id,week),
    CONSTRAINT fk__tqf3outcome__tqf3_id__tqf3__id FOREIGN KEY (tqf3_id)
        REFERENCES tqf3 (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE tqf3evaluationplan(
    id text default get_random_string(30) UNIQUE,
    tqf3_id character varying(30),
    evaactivity int,
    evaoutcome character varying(511),
    howeva character varying(511),
    evaweek  character varying(511),
    evaratio character varying(511),
    PRIMARY KEY (tqf3_id,evaactivity),
    CONSTRAINT fk__tqf3outcome__tqf3_id__tqf3__id FOREIGN KEY (tqf3_id)
        REFERENCES tqf3 (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE
);


CREATE TABLE tqf3_employee_match (
    tqf3_id character varying(30) NOT NULL,
    employee_id character varying(30) NOT NULL,
    role character varying(20),
    PRIMARY KEY(tqf3_id,employee_id),
    CONSTRAINT fk__t3mp__tqf3_id__tqf3__id FOREIGN KEY (tqf3_id)
        REFERENCES tqf3 (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT fk__t3mp__employee_id__employee__id FOREIGN KEY (employee_id)
        REFERENCES employee (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE tqf3clo(
    id text default get_random_string(30) UNIQUE,
    tqf3_id character varying(30),
    tqf2course_clo_id character varying(30),
    index int,
    howteach character varying(511),
    howeva character varying(511),
    problem character varying(511),
    criterion int,
    pass int,
    text character varying(511),
    PRIMARY KEY (id),
    CONSTRAINT fk__tqf3clo__tqf3_id__tqf3__id FOREIGN KEY (tqf3_id)
        REFERENCES tqf3 (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE
    --     ,
    -- CONSTRAINT fk__tqf3clo__tqf2course_clo_id__tqf2course_clo__id FOREIGN KEY (tqf2course_clo_id)
    --     REFERENCES tqf2course_clo (id) MATCH SIMPLE
    --     ON UPDATE NO ACTION ON DELETE NO ACTION
);


CREATE TABLE weeksnote_evaluations(
    id text default get_random_string(30) UNIQUE,
    tqf3teachplan_id character varying(30),
    tqf3evaluationplan_id character varying(30),
    checked BOOLEAN default false,
    PRIMARY KEY (tqf3teachplan_id, tqf3evaluationplan_id),
    CONSTRAINT fk__weeksnote_evaluation__tqf3teachplan_id__tqf3teachplan__id FOREIGN KEY (tqf3teachplan_id)
        REFERENCES tqf3teachplan (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT fk__weeksnote_evaluation__tqf3evaluationplan_id__tqf3evaluationplan__id FOREIGN KEY (tqf3evaluationplan_id)
        REFERENCES tqf3evaluationplan (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE
);


CREATE TABLE weeksnote_eva_clo(
    id text default get_random_string(30) UNIQUE,
    tqf3teachplan_id character varying(30),
    tqf3clo_id character varying(30),
    checked BOOLEAN default false,
    PRIMARY KEY (tqf3teachplan_id, tqf2course_clo_id),
    CONSTRAINT fk__weeksnote_eva_clo__tqf3teachplan_id__tqf3teachplan__id FOREIGN KEY (tqf3teachplan_id)
        REFERENCES tqf3teachplan (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT fk__weeksnote_eva_clo__tqf3clo_id__tqf3clo__id FOREIGN KEY (tqf3clo_id)
        REFERENCES tqf3clo (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE
);


CREATE TABLE uploadfile (
    id text default get_random_string(30) UNIQUE,
    name character varying(255) NOT NULL,
    path character varying(300) NOT NULL,
    mimetype character varying(100) NOT NULL,
    createby uuid NOT NULL,
    createdate timestamp,
    PRIMARY KEY(id),
    CONSTRAINT fk__uploadfile__createby__users__id FOREIGN KEY (createby)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);
CREATE TABLE document_upload(
    id text default get_random_string(30) UNIQUE,
    name character varying(100),
    createby uuid,
    createdate timestamp,
    documenttype_code character varying(10),
    documentstatus_code character varying(10),
    uploadfile_id character varying(30),
    isactive BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk__document_upload__createby__users__id FOREIGN KEY (createby)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk__document_upload__documenttype_code__documenttype__code FOREIGN KEY (documenttype_code)
        REFERENCES documenttype (code) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk__document_upload__documentstatus_code__documentstatus__code FOREIGN KEY (documentstatus_code)
        REFERENCES documentstatus (code) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk__document_upload__uploadfile_id__uploadfile__id FOREIGN KEY (uploadfile_id)
        REFERENCES uploadfile (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE tqf5(
    id text default get_random_string(30) UNIQUE,
    tqf3_id character varying(30),
    remain_students int,
    withdraw_students int,
    student_grade json,
    error_score character varying(1000),
    error_timeeva json,
    error_howeva json,
    student_reconsider json,
    resourse_problems json,
    organize_problems json,
    studenteva_result json,
    othereva_result json,
    course_progress json,
    other_progress character varying(1000),
    proposal_updateplan json,
    suggestion_toleadear character varying(1000),
    createby uuid,
    createdate timestamp,
    PRIMARY KEY (id),
    CONSTRAINT fk__tqf5__tqf3_id__tqf3__id FOREIGN KEY (tqf3_id)
        REFERENCES tqf3 (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT fk__tqf5__createby__users__id FOREIGN KEY (createby)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
);

CREATE TABLE calendar_event(
    id text default get_random_string(30) UNIQUE,
    title character varying(500) DEFAULT '' NOT NULL,
    duedate timestamp DEFAULT NOW() NOT NULL,
    isshowed BOOLEAN DEFAULT true NOT NULL,
    createdate timestamp DEFAULT NOW(),
    createby uuid,
    PRIMARY KEY (id),
    CONSTRAINT fk__calendar_event__createby__users__id FOREIGN KEY (createby)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE initial_config(
    key character varying(100) NOT NULL UNIQUE,
    value character varying(500) DEFAULT '' NOT NULL,
    note character varying(500) DEFAULT '',
    PRIMARY KEY (key)
);

CREATE TABLE back_log(
    id serial,
    event_type character varying(20) DEFAULT 'Unknown' NOT NULL,
    source character varying(500),
    message character varying(500) DEFAULT NOT NULL,
    createdate timestamp DEFAULT NOW(),
    createby uuid,
    PRIMARY KEY (id),
    CONSTRAINT fk__back_log__createby__users__id FOREIGN KEY (createby)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);
















INSERT INTO roles (name) VALUES ('guest');
INSERT INTO roles (name) VALUES ('student');
INSERT INTO roles (name) VALUES ('staff');
INSERT INTO roles (name) VALUES ('professor');
INSERT INTO roles (name) VALUES ('admin');

INSERT INTO documenttype (code,thainame,engname,path,color) VALUES ('TQF3','มคอ.3','TQF3','/tqf3','#EEA95C');
INSERT INTO documenttype (code,thainame,engname,path,color) VALUES ('TQF2','มคอ.2','TQF2','/tqf2','#B5C891');
INSERT INTO documenttype (code,thainame,engname,path,color) VALUES ('TQF7','มคอ.7','TQF7','/tqf7','#F4CE87');
INSERT INTO documenttype (code,thainame,engname,path,color) VALUES ('SAR','SAR','SAR','/sar','#AFCBE5');
INSERT INTO documenttype (code,thainame,engname,path,color) VALUES ('CS','แผนการสอน','Course Syllabus','/syllabus','#FB9483');

INSERT INTO faculty (thainame, engname, isdisabled) VALUES ('วิศวกรรมศาสตร์','Engineering',false);
INSERT INTO faculty (thainame, engname, isdisabled) VALUES ('วิทยาศาสตร์','Science',true);
INSERT INTO faculty (thainame, engname, isdisabled) VALUES ('ครุศาสตร์อุตสาหกรรมและเทคโนโลยี','Industrial Education and Technology',true);
INSERT INTO faculty (thainame, engname, isdisabled) VALUES ('เทคโนโลยีสารสนเทศ','Information Technology',true);
INSERT INTO faculty (thainame, engname, isdisabled) VALUES ('สถาปัตยกรรมศาสตร์และการออกแบบ','Architecture and Design ',true);
INSERT INTO faculty (thainame, engname, isdisabled) VALUES ('สถาบันวิทยาการหุ่นยนต์ภาคสนาม','Institute of field robotics',true);

INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('ไม่ระบุ','Not Specified',null ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิศวกรรมคอมพิวเตอร์','computer engineering',1 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิศวกรรมเคมี','chemical engineering',1 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิศวกรรมโยธา','civil engineering',1 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิศวกรรมระบบควบคุมและเครื่องมือวัด','control systems instrumentation engineering',1 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิศวกรรมสิ่งแวดล้อม','environmental engineering',1 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิศวกรรมสิ่งแวดล้อม','environmental engineering',1 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิศวกรรมเครื่องกล','mechanica engineering',1 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิศวกรรมอุตสาหการและเมคคาทรอนิกส์','production mechatronics engineering',1 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิศวกรรมเครื่องมือและวัสดุ','tool materials engineering',1 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิศวกรรมอาหาร','food engineering',1 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิศวกรรมชีวภาพ','biological engineering',1 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิชาคณิตศาสตร์','mathematics',2 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิชาเคมี','chemistry',2 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิชาจุลชีววิทยา','microbiology',2 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิชาคณิตศาสตร์','mathematics',2 ,false);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('วิชาฟิสิกส์','physics',2 ,true);
INSERT INTO department  (thainame, engname, faculty_id, isdisabled) VALUES ('ศูนย์เครื่องมือวิทยาศาสตร์ฯ','Scientific Instrument Center for Standard and Industry',2 ,true);


INSERT INTO documentstatus (code,thainame,engname,note,isdisabled) VALUES ('DRAFT','แบบร่าง','Draft','TQF',false);
INSERT INTO documentstatus (code,thainame,engname,note,isdisabled) VALUES ('PRE','อยู่ระหว่างจัดทำ','Preparation','TQF',false);
INSERT INTO documentstatus (code,thainame,engname,note,isdisabled) VALUES ('FINISH','เสร็จสิ้น','Finish','TQF',false);

INSERT INTO termyear (code,thainame,engname,note, isdisabled) VALUES ('all','ทั้งหมด','All','',false);
INSERT INTO termyear (code,thainame,engname,note, isdisabled) VALUES ('1/2020','ภาคเรียน 1 ปีการศึกษา 2563','Semester 1, Academic Year 2020','',false);
INSERT INTO termyear (code,thainame,engname,note, isdisabled) VALUES ('2/2020','ภาคเรียน 2 ปีการศึกษา 2563','Semester 2, Academic Year 2020','',false);


INSERT INTO photo(id, name, path, mimetype, thumbnail) VALUES (2, 'thumbnail-avatar.jpg', 'http://167.99.70.72:55011/public/images/thumbnail-avatar.jpg', 'image/jpeg', null);
INSERT INTO photo(id, name, path, mimetype, thumbnail) VALUES (1, 'img-avatar.jpg', 'http://167.99.70.72:55011/public/images/img-avatar.jpg', 'image/jpeg', 2);

