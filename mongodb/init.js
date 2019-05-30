var db = connect("mongodb://localhost/admin");
db.grantRolesToUser(
	'app_user'
	,[
		{
			role: "root"
			,db: "admin"
		}
	]
);
use event;
db.createCollection("log");