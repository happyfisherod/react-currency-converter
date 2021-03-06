import axios from 'axios';

import { 
    put, 
    call, 
    takeLatest, 
    takeEvery,
    select 
} from 'redux-saga/effects';

import { 
    PERFORM_CURRENCY_CONVERSION, 
    PERFORM_CURRENCY_CONVERSION_REVERSE, 
    currencyConversionSuccess, 
    currencyConversionReverseSuccess, 
    currencyConversionError 
} from '../actions/currencyconverter';

import { LOCATION_CHANGE  } from 'react-router-redux'; 

//set exchangeratesapi Base URL
const API_URL = process.env.API_URL;

//get component state
const getCurrencyState = (state) => state.currency;

//perform rate checker
function* getLatestRate(){

    //get current state of currency component.
    const { toData, fromData } = yield select(getCurrencyState);
    const toCurrency = toData.currency;
    const fromCurrency = fromData.currency;
    const amount = fromData.value;

    try {

        //the call() function does not run axios directly. As generators work, it only returns the object for which you will run next() on.
        const getLatest = yield call(
            axios.get,
            `${API_URL}`,
            {
                params: {
                    base: fromCurrency,
                    symbols: toCurrency,
                }
            }
        );

        //getLatest.data is the response from the AXIOS call. From there onwards, you can parse the response from the API itself
        var result = getLatest.data;
        var rate = result.rates[toCurrency];
        var convertedAmount = new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(rate * amount);
        rate = new Intl.NumberFormat('en-GB', { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(rate);
        yield put(currencyConversionSuccess(convertedAmount, rate));
        
    } catch (error) {

        //put is Saga's middleware function for dispatching actions to the redux store
        yield put(currencyConversionError());
        
    }

}

//perform rate checker
function* getLatestRateReverse(){

    //get current state of currency component.
    const { toData, fromData } = yield select(getCurrencyState);
    const toCurrency = fromData.currency;
    const fromCurrency = toData.currency;
    const amount = toData.value;

    try {

        //the call() function does not run axios directly. As generators work, it only returns the object for which you will run next() on.
        const getLatest = yield call(
            axios.get,
            `${API_URL}`,
            {
                params: {
                    base: fromCurrency,
                    symbols: toCurrency,
                }
            }
        );

        //getLatest.data is the response from the AXIOS call. From there onwards, you can parse the response from the API itself
        var result = getLatest.data;
        var rate = result.rates[toCurrency];
        var convertedAmount = new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(rate * amount);
        rate = new Intl.NumberFormat('en-GB', { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(1 / rate);
        yield put(currencyConversionReverseSuccess(convertedAmount, rate));
        
    } catch (error) {

        //put is Saga's middleware function for dispatching actions to the redux store
        yield put(currencyConversionError());
        
    }

}

export default function* (){
    //takeLatest basically takes the latest action that was called, and performs the function specified
    yield takeLatest(PERFORM_CURRENCY_CONVERSION, getLatestRate);

    //takeLatest basically takes the latest action that was called, and performs the function specified
    yield takeLatest(PERFORM_CURRENCY_CONVERSION_REVERSE, getLatestRateReverse);
    
    //on page load, get latest currency rate
    yield takeEvery(LOCATION_CHANGE, getLatestRate);
}