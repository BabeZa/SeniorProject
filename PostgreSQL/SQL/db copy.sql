CREATE TABLE tqf3(
    id int default pseudo_encrypt(nextval('seq')::int),
    code character varying(10),
    thainame character varying(100),
    engname character varying(100),
    program character varying(100),
    credit character varying(10),
    termyear_code character varying(10),
    pre_requisites_st character varying(100),
    pre_requisites_nd character varying(100),
    co_requisites character varying(100),
    place character varying(20),
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
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE tqf3outcome(
    tqf3_id int,
    no int,
    text character varying(511),
    PRIMARY KEY (tqf3_id,no),
    CONSTRAINT fk__tqf3outcome__tqf3_id__tqf3__id FOREIGN KEY (tqf3_id)
        REFERENCES tqf3 (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE tqf3teachplan(
    tqf3_id int,
    week int,
    title character varying(511),
    hour int,
    activity character varying(511),
    professorweek character varying(511),
    PRIMARY KEY (tqf3_id,week),
    CONSTRAINT fk__tqf3outcome__tqf3_id__tqf3__id FOREIGN KEY (tqf3_id)
        REFERENCES tqf3 (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE tqf3evaluationplan(
    tqf3_id int,
    evaactivity int,
    evaoutcome character varying(511),
    howeva character varying(511),
    evaweek character varying(511),
    evaratio character varying(511),
    PRIMARY KEY (tqf3_id,evaactivity),
    CONSTRAINT fk__tqf3outcome__tqf3_id__tqf3__id FOREIGN KEY (tqf3_id)
        REFERENCES tqf3 (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);


CREATE TABLE tqf3_employee_match (
    tqf3_id int NOT NULL,
    employee_id int NOT NULL,
    role character varying(20),
    PRIMARY KEY(tqf3_id,employee_id),
    CONSTRAINT fk__t3mp__tqf3_id__tqf3__id FOREIGN KEY (tqf3_id)
        REFERENCES tqf3 (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk__t3mp__employee_id__employee__id FOREIGN KEY (employee_id)
        REFERENCES employee (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);