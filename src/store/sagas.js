import { all, fork, take, select } from 'redux-saga/effects';

import * as navbar from './navbar/sagas';
import * as user from './user/sagas';
import * as filters from './filters/sagas';
import * as marketing from './marketing/sagas';
import * as planFact from './plan-fact/sagas';
import * as bankEff from './bank-efficiency/sagas';
import * as emplPerf from './employee-performance/sagas';
import * as profit from './profit/sagas';
import * as salesPerformance from './sales-performance/sagas';
import * as salesReconciliation from './sales-reconciliation/sagas';
import * as reports from './reports/sagas';
import * as app from './app/sagas';
import * as appdop from './appdop/sagas'

const sagas = {
	...navbar,
	...user,
	...filters,
	...marketing,
	...planFact,
	...bankEff,
	...emplPerf,
	...profit,
	...salesPerformance,
	...salesReconciliation,
	...reports,
	...app,
	...appdop
};
const forkedSagas = Object.values(sagas).map(saga => fork(saga))

export default function* saga() {
	yield all(forkedSagas);
}
