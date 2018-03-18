
class Priviledge  {

	static TRADE = 1 << 0;
	static ANALYSIS = 1 << 1;

	getPrivildge(priviledge: number) {
		return [
			priviledge & Priviledge.TRADE,
			priviledge & Priviledge.ANALYSIS
		]
	}

}


export let Priviledges = new Priviledge();