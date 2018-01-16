You need to  install
- Go 
- MySQL
on your local machine.

In "backend/main.go" at line 14 (sql.Open) enter credentials to connect your local Db in format "Username:password/DbName"

In db  execute next script to create table:
'CREATE TABLE `new_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(145) DEFAULT NULL,
  `src` varchar(145) DEFAULT NULL,
  `lft` int(11) DEFAULT NULL,
  `rgt` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1'


Open one instance of terminal "your_path/client" and type:
npm install
npm run


Open another instance of terminal "your_path/backend" and type:
go run main.go
If you see message "I am working" in your console - server is working ;)