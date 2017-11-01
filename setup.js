


/*CREATE TABLE Students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name varchar(50), last_name varchar(50), gender varchar(10), age integer);

CREATE TABLE MataKuliah(id INTEGER PRIMARY KEY AUTOINCREMENT, nama_mk varchar(50), sks integer);

CREATE TABLE AmbilMataKuliah(id INTEGER PRIMARY KEY AUTOINCREMENT, StudentId INTEGER, MkId INTEGER, FOREIGN KEY (StudentId) REFERENCES Students(id), FOREIGN KEY (MkId) REFERENCES MataKuliah(id));

INSERT INTO Students (first_name, last_name,gender,age) VALUES ('septian', 'fujianto','undefined',15),
('Alang', 'Mahendra','male',20),('Ayunda', 'Hamzah','female',21),('Azhari', 'Amry','male',19),('Amelia', 'Rahman','female',20);


INSERT INTO MataKuliah(nama_mk,sks) VALUES ('Express', 12), ('Rekursif', 2), ('SQL', 4);

INSERT INTO AmbilMataKuliah(StudentId, MkId, score) VALUES (1, 1, 50),(1, 2, 70),(1, 3, 20),(2, 1, 100), (2, 3, 50),(3, 2, 80),(4, 1, 70),(4, 2, 50),(4, 3, 90),(5, 2, 90);

SELECT COUNT(A.MkId), S.first_name
FROM AmbilMataKuliah AS A
INNER JOIN Students AS S ON S.id = A.StudentId
WHERE A.MkId = 1
GROUP BY S.first_name;

//AmbilMataKuliah A === AmbilMataKuliah AS A
//S.first_name || ' ' || S.last_name as fullname,

//TAMPILKAN SEMUA STUDENT DAN MATAKULIAHNYA YANG NILAINYA LEBIH BESAR 80
SELECT CASE
         WHEN A.score <= 94 THEN 'B'
         WHEN A.score > 94 THEN 'A'
       END as score,
       S.first_name as name,
       M.nama_mk
FROM AmbilMataKuliah A
INNER JOIN Students S ON S.id = A.StudentId
INNER JOIN MataKuliah M ON M.id = A.MkId
WHERE A.score > 80;


//VIEW
CREATE VIEW lulus AS
SELECT CASE
         WHEN A.score <= 94 THEN 'B'
         WHEN A.score > 94 THEN 'A'
       END as score,
       S.first_name as name,
       M.nama_mk
FROM AmbilMataKuliah A
INNER JOIN Students S ON S.id = A.StudentId
INNER JOIN MataKuliah M ON M.id = A.MkId
WHERE A.score > 80;

//SUBQUERY

SELECT F.score, F.name, AVG(F.score)
FROM
  (SELECT SUM(A.score) as score,
         MAX(S.first_name) as name
  FROM AmbilMataKuliah A
  INNER JOIN Students S ON S.id = A.StudentId
  INNER JOIN MataKuliah M ON M.id = A.MkId
  GROUP BY S.first_name) AS F
GROUP BY F.score, F.name;*/
