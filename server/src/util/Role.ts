
class Role  {

	static ADMIN = 1;
	static USER = 2;

	isAdmin(role: number) {
		return Role.ADMIN === role;
	}

}


export let Roles = new Role();