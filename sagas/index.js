import { all, call } from 'redux-saga/effects';
import CurrencyConverterSaga from './currencyconverter';

function* watchAll() {
  yield all([
    call(CurrencyConverterSaga)
  ]);
}

export default watchAll;