# congress

## Release 0
Pada halaman menu utama ('/'), tampilkan menu berupa link:
  * Top 5 : akan menuju routing GET /results/top5
  * Voters : akan menuju routing GET /voters
  * Analisa Kecurangan : akan menuju routing GET /results/analyzed

Requirement:
  * Harus MVC
  * Menggunakan Callback / Promise

## Release 1
Pada saat memilih menu Top 5, maka tampilkanlah top 5 anggota kongres yang mendapatkan vote terbanyak.
Tampilkan nama Politikus, jumlah suaranya dan orang-orang yang memilih politikus tersebut.

Requirement:
  * Query hanya boleh 1 (subquery / view)