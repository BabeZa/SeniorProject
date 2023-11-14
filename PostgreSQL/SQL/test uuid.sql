CREATE OR REPLACE FUNCTION generate_uid2(size INT) RETURNS TEXT AS $$
DECLARE
  characters TEXT := '0123456789';
  bytes BYTEA := gen_random_bytes(size);
  l INT := length(characters);
  i INT := 0;
  output TEXT := '';
BEGIN
  WHILE i < size LOOP
    output := output || substr(characters, get_byte(bytes, i) % l + 1, 1);
    i := i + 1;
  END LOOP;
  RETURN output;
END;
$$ LANGUAGE plpgsql VOLATILE;


CREATE TABLE collections (
  id INT PRIMARY KEY DEFAULT generate_uid(10),
  name TEXT ,
)

INSERT INTO collections2 (name) VALUES ('TQF3');




CREATE OR REPLACE FUNCTION pseudo_encrypt(VALUE int) returns int AS $$
DECLARE
l1 int;
l2 int;
r1 int;
r2 int;
i int:=0;
BEGIN
 l1:= (VALUE >> 16) & 65535;
 r1:= VALUE & 65535;
 WHILE i < 3 LOOP
   l2 := r1;
   r2 := l1 # ((((1366 * r1 + 150889) % 714025) / 714025.0) * 32767)::int;
   l1 := l2;
   r1 := r2;
   i := i + 1;
 END LOOP;
 RETURN ((r1 << 16) + l1);
END;
$$ LANGUAGE plpgsql strict immutable;


create sequence seq maxvalue 2147483647;

create table tablename(
 id int default pseudo_encrypt(nextval('seq')::int),
 name TEXT 
);

SELECT pseudo_encrypt(nextval('seq')::int)





CREATE OR REPLACE FUNCTION stringify_bigint(n bigint) RETURNS text
    LANGUAGE plpgsql IMMUTABLE STRICT AS $$
DECLARE
 alphabet text:='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
 base int:=length(alphabet); 
 _n bigint:=abs(n);
 output text:='';
BEGIN
 LOOP
   output := output || substr(alphabet, 1+(_n%base)::int, 1);
   _n := _n / base; 
   EXIT WHEN _n=0;
 END LOOP;
 RETURN output;
END $$

select stringify_bigint(pseudo_encrypt(0))


create function f() returns text language sql as $$
  SELECT string_agg (substr('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', ceil (random() * 62)::integer, 1), '')
  FROM generate_series(1, 20)
$$;

SELECT f()

-- https://medium.com/@emerson_lackey/postgres-randomized-primary-keys-123cb8fcdeaf
CREATE FUNCTION pseudo_encrypt_12(VALUE int) returns int AS $$
DECLARE
l1 int;
l2 int;
r1 int;
r2 int;
i int:=0;
BEGIN
  l1:= (VALUE >> 12) & (4096-1);
  r1:= VALUE & (4096-1);
  WHILE i < 3 LOOP
    l2 := r1;
    r2 := l1 # ((((1366 * r1 + 150889) % 714025) / 714025.0) * (4096-1))::int;
    l1 := l2;
    r1 := r2;
    i := i + 1;
  END LOOP;
  RETURN ((l1 << 12) + r1);
END;
$$ LANGUAGE plpgsql strict immutable;

-- https://stackoverflow.com/questions/22908499/how-to-generate-random-unique-number-in-postgresql-using-function
CREATE OR REPLACE FUNCTION pseudo_encrypt_16(VALUE int) returns int AS $$
DECLARE
l1 int;
l2 int;
r1 int;
r2 int;
i int:=0;
BEGIN
 l1:= (VALUE >> 16) & 65535;
 r1:= VALUE & 65535;
 WHILE i < 3 LOOP
   l2 := r1;
   r2 := l1 # ((((1366 * r1 + 150889) % 714025) / 714025.0) * 32767)::int;
   l1 := l2;
   r1 := r2;
   i := i + 1;
 END LOOP;
 RETURN ((r1 << 16) + l1);
END;
$$ LANGUAGE plpgsql strict immutable;

create sequence seq maxvalue 2147483647;

create table tablename(
 id int default pseudo_encrypt(nextval('seq')::int),
 name TEXT 
);

SELECT pseudo_encrypt(nextval('seq')::int)

-- https://stackoverflow.com/questions/12761346/pseudo-encrypt-function-in-plpgsql-that-takes-bigint
CREATE OR REPLACE FUNCTION pseudo_encrypt_32(VALUE bigint) returns bigint AS $$
DECLARE
l1 bigint;
l2 bigint;
r1 bigint;
r2 bigint;
i int:=0;
BEGIN
    l1:= (VALUE >> 32) & 4294967295::bigint;
    r1:= VALUE & 4294967295;
    WHILE i < 3 LOOP
        l2 := r1;
        r2 := l1 # ((((1366.0 * r1 + 150889) % 714025) / 714025.0) * 32767*32767)::int;
        l1 := l2;
        r1 := r2;
        i := i + 1;
    END LOOP;
RETURN ((l1::bigint << 32) + r1);
END;
$$ LANGUAGE plpgsql strict immutable;

create sequence seq2 maxvalue 4294967294;

select pseudo_encrypt(0), pseudo_encrypt_24(0), pseudo_encrypt_32(0)


CREATE OR REPLACE FUNCTION generate_uid6(size INT) RETURNS TEXT AS $$
DECLARE
  characters TEXT := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  bytes BYTEA := random()*100000;
  l INT := length(characters);
  i INT := 0;
  output TEXT := '';
BEGIN
  WHILE i < size LOOP
    output := output || substr(characters, get_byte(bytes, i) % l + 1, 1);
    i := i + 1;
  END LOOP;
  RETURN output;
END;
$$ LANGUAGE plpgsql VOLATILE;

select generate_uid4(12), generate_uid5(12), generate_uid6(12) FROM generate_series(1,500) ;
select random()
SELECT random() FROM generate_series(1,20);


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
SELECT DISTINCT get_random_string(30) FROM generate_series(1,100);

CREATE FUNCTION get_random_number(
        IN string_length INTEGER,
        IN possible_chars TEXT DEFAULT '0123456789'
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
SELECT DISTINCT get_random_number(9) FROM generate_series(1,100);

-- https://www.depesz.com/2017/02/06/generate-short-random-textual-ids/



-- tqf3_id             OJmHpufCqiEuYCJ8jCm2uweUCn46JC
-- tqf3clo_id          Hmj3I9xXgu1cioM2neWiWqOKPw5M9K
-- tqf3teachplan_id    rOtpbXni3fiMIBuWNjgeOB3mTTEdwo
-- tqf3teachplan_id    r7hyJ9oSb2qWbwueprHRA1SmW7Hymc
          

