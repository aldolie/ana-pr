
class Role  {

	public static ADMIN = 1;
	public static USER = 2;

	isAdmin(role: number) {
		return Role.ADMIN === role;
	}

	getUserRole() {
		return Role.USER;
	}

	getAdminRole() {
		return Role.ADMIN;
	}

}


export let Roles = new Role();