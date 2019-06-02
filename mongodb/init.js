db.createUser(
	{
		user: "app_user",
		pwd: "password",
		roles: [
			{
				role: "dbOwner",
				db: "app"
			}
		]
	}
);