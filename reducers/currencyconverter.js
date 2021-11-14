//get component actions
import { 
    CONVERT_CURRENCY_SUCCESS, 
    CONVERT_CURRENCY_REVERSE_SUCCESS, 
    CONVERT_CURRENCY_ERROR, 
    PERFORM_CURRENCY_CONVERSION, 
    PERFORM_CURRENCY_CONVERSION_REVERSE, 
    NEW_CONVERSION, 
    NEW_CONVERSION_REVERSE, 
    CURRENCY_CHANGED, 
    CURRENCY_SWAPPED, 
    PERFORM_CURRENCY_EXCHANGE 
} from '../actions/currencyconverter';

//get list of all currencies
import { CURRENCY_OPTIONS } from '../src/static/currenciesData';

//we need this to reset state to initial state when the page is changed
import { LOCATION_CHANGE  } from 'react-router-redux'; 

//define the initial state of the action before any actions are dispatched
const initialState = {
    fromData: {
        currency: 'EUR',
        symbol: "€",
        value: ''
    },
    toData: {
        currency: 'USD',
        symbol: "$",
        value: ''
    },
    rate: 1,
    conversion: {},
    balance: {
        USD: 200,
        EUR: 150,
        GBP: 10
    },
    isLoading: false,
    isLoadingReverse: false,
    countryOptions: CURRENCY_OPTIONS
};

export default (state, action) => {
    if(state === undefined){
        return initialState;
    }

    //implement switch case on each actions
    switch(action.type){
        case CONVERT_CURRENCY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                toData: {
                    ...state.toData,
                    value: action.conversion
                },
                rate: action.rate
            }

        case CONVERT_CURRENCY_REVERSE_SUCCESS:
            return {
                ...state,
                isLoadingReverse: false,
                fromData: {
                    ...state.fromData,
                    value: action.conversion
                },
                rate: action.rate
            }

        case NEW_CONVERSION:
            return {
                ...state,
                conversion: {},
                isLoading: true,
                fromData: {
                    ...state.fromData,
                    currency: action.fromCurrency,
                    value: action.amount
                },
                toData: {
                    ...state.toData,
                    currency: action.toCurrency
                }
            }

        case NEW_CONVERSION_REVERSE:
            return {
                ...state,
                conversion: {},
                isLoadingReverse: true,
                fromData: {
                    ...state.fromData,
                    currency: action.fromCurrency
                },
                toData: {
                    ...state.toData,
                    currency: action.toCurrency,
                    value: action.amount
                }
            }

        case CURRENCY_CHANGED:
            
            //get the currency symbol from array of all currencies
            const filterCurrencies = CURRENCY_OPTIONS.filter(cur => cur.value == action.currency);
            const symbol = filterCurrencies.length > 0 && filterCurrencies[0].symbol;
        
            return {
                ...state,
                [action.selection]: {
                    ...state[action.selection],
                    currency: action.currency,
                    symbol,
                }
            }

        case CURRENCY_SWAPPED:
            return {
                ...state,
                fromData: {
                    ...state.toData,
                    value: state.fromData.value
                },
                toData: {
                    ...state.fromData,
                    value: state.fromData.toData
                },
            }

        case PERFORM_CURRENCY_CONVERSION:
            return {
                ...state,
                isLoading: true
            }

        case PERFORM_CURRENCY_CONVERSION_REVERSE:
            return {
                ...state,
                isLoadingReverse: true
            }

        case CONVERT_CURRENCY_ERROR: 
            return {
                ...state,
                isLoading: false,
                isLoadingReverse: false
            }

        case PERFORM_CURRENCY_EXCHANGE:
            return {
                ...state,
                balance: {
                    ...state.balance,
                    [action.fromCurrency]: Number((state.balance[action.fromCurrency] - parseFloat(action.fromAmount)).toFixed(2)),
                    [action.toCurrency]: Number((state.balance[action.toCurrency] + parseFloat(action.toAmount)).toFixed(2))
                },
                fromData: {
                    ...state.fromData,
                    value: ''
                },
                toData: {
                    ...state.toData,
                    value: ''
                },
            }

        case LOCATION_CHANGE:
            return initialState;

        default:
            return state;

    }
}