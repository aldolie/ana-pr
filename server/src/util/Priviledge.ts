import { Subscription } from '../models/Subscription';
import { SubscriptionStatuses } from './SubscriptionStatus';

class Priviledge  {

	static TRADE = 1 << 0;
	static ANALYSIS = 1 << 1;

	getExpiredTime(priviledge: number, expiredTime: Date) {
		let date: Date = new Date();
		if (expiredTime != null  && expiredTime > date) {
			date = expiredTime;
		}
		if (priviledge === Priviledge.TRADE) {
			date.setMonth(date.getMonth() + 1);
		} else if (priviledge === Priviledge.TRADE + Priviledge.ANALYSIS) {
			date.setFullYear(date.getFullYear() + 1);
		}
		return date;
	}

	getPrivildge(priviledge: number) {
		return [
			priviledge & Priviledge.TRADE,
			priviledge & Priviledge.ANALYSIS
		]
	}

}


export let Priviledges = new Priviledge();