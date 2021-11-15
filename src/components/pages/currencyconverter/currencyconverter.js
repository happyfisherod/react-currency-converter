import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function CurrencyConverter({ toData, fromData, rate, balance, isLoading, isLoadingReverse, countryOptions, handleCurrencySwap, handleCurrencyChanged, handleCurrencyConversion, handleCurrencyConversionReverse, handleExchange }) {
        
    return (
        <div className="main">

            {/**BEGIN Currency Converter */}
            <div className="converter">
                
                {/** BEGIN FROM CURRENCY CONTAINER */}
                <div className="from__container">
                    <div className="top_title">Balance: {fromData.symbol}{balance[fromData.currency]}</div>
                    <div className="converter__select">
                        <Dropdown
                            placeholder='Choose your currency'
                            fluid
                            search
                            selection
                            loading={isLoading}
                            value={fromData.currency}
                            onChange={ (e, data) => handleCurrencyChanged("fromData", data.value)}
                            options={countryOptions}
                        />
                    </div>
                    <div className="coverter__input">
                        <span className="currency">-</span>
                        <input className="" placeholder="0" value={fromData.value} onChange={e => {
                            const amount = e.target.value;
                            handleCurrencyConversion(fromData.currency, toData.currency, amount);
                        }} />
                        {fromData.value > balance[fromData.currency]
                            ? <span className="balance__error">Exceeds balance</span>
                            : null
                        }
                    </div>
                </div>
                {/** END FROM CURRENCY CONTAINER */}


                {/** BEGIN CURRENCY SWAP CONTAINER */}
                <div className="swap__container">
                    <div className="swap__container__mini" onClick={() => handleCurrencySwap()}>
                        <i className="icon ion-md-swap"></i>
                    </div>
                    <div className="rate__text">{fromData.symbol}1 = {toData.symbol}{rate}</div>
                    <button className="exchange__button" onClick={() => {
                        if (fromData.value > balance[fromData.currency]) return;
                        handleExchange(fromData.currency, fromData.value, toData.currency, toData.value);
                    }}>Exchange</button>
                </div>
                {/** END CURRENCY SWAP CONTAINER */}


                {/** BEGIN TO CURRENCY CONTAINER */}
                <div className="to__container">
                    <div className="top_title">Balance: {toData.symbol}{balance[toData.currency]}</div>
                    <div className="converter__select">
                        <Dropdown
                            placeholder='Choose your currency'
                            fluid
                            search
                            selection
                            loading={isLoadingReverse}
                            value={toData.currency}
                            onChange={ (e, data) => handleCurrencyChanged("toData", data.value)}
                            options={countryOptions}
                        />
                    </div>
                    <div className="coverter__input">
                        <span className="currency">+</span>
                        <input className="" placeholder="0" value={toData.value} onChange={e => {
                            const amount = e.target.value;
                            handleCurrencyConversionReverse(fromData.currency, toData.currency, amount);
                        }} />
                    </div>
                </div>
                {/** END TO CURRENCY CONTAINER */}

            </div>
            {/**END Currency Converter */}

        </div>
    );
}

//get props from container
CurrencyConverter.propTypes = {
    fromData: PropTypes.object.isRequired,
    toData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    isLoadingReverse: PropTypes.bool,
    balance: PropTypes.object.isRequired,
    conversion: PropTypes.object.isRequired,
    countryOptions: PropTypes.array.isRequired,
    handleCurrencySwap: PropTypes.func.isRequired,
    handleCurrencyChanged: PropTypes.func.isRequired,
    handleCurrencyConversion: PropTypes.func.isRequired
}