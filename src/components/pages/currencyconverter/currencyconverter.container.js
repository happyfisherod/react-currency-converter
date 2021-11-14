import { connect } from 'react-redux';
import CurrencyConverter from './currencyconverter';

//import the actions that need to be dispatched here
import { newConversion, newConversionReverse, performCurrencyConversion, performCurrencyConversionReverse, currencyChanged, currencySwapped, performCurrencyExchange } from '../../../../actions/currencyconverter';

function mapStateToProps(state){
    return {
        fromData: state.currency.fromData,
        toData: state.currency.toData,
        rate: state.currency.rate,
        conversion: state.currency.conversion,
        balance: state.currency.balance,
        isLoading: state.currency.isLoading,
        isLoadingReverse: state.currency.isLoadingReverse,
        countryOptions: state.currency.countryOptions
    }
}

function mapDispatchToProps(dispatch){
    return {
        handleCurrencyConversion: (fromCurrency, toCurrency, amount) => {
            dispatch(newConversion(fromCurrency, toCurrency, amount));
            dispatch(performCurrencyConversion());
        },

        handleCurrencyChanged: (selection, currency) => {
            dispatch(currencyChanged(selection, currency));
            dispatch(performCurrencyConversion());
        },

        handleCurrencySwap: () => {
            dispatch(currencySwapped());
            dispatch(performCurrencyConversion());
        },

        handleCurrencyConversionReverse: (fromCurrency, toCurrency, amount) => {
            dispatch(newConversionReverse(fromCurrency, toCurrency, amount));
            dispatch(performCurrencyConversionReverse());
        },

        handleExchange: (fromCurrency, fromAmount, toCurrency, toAmount) => {
            dispatch(performCurrencyExchange(fromCurrency, fromAmount, toCurrency, toAmount));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter);