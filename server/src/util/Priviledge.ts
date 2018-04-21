
class Priviledge  {

	static TRADE = 1 << 0;
	static ANALYSIS = 1 << 1;

	getExpiredTime(priviledge: number) {
		let expiredTime = new Date();
		if (priviledge === 0) {
			expiredTime.setMonth(expiredTime.getMonth() + 1);
		} else if (priviledge === 1) {
			expiredTime.setFullYear(expiredTime.getFullYear() + 1);
		}
		return expiredTime;
	}

	getPrivildge(priviledge: number) {
		return [
			priviledge & Priviledge.TRADE,
			priviledge & Priviledge.ANALYSIS
		]
	}

}


export let Priviledges = new Priviledge();