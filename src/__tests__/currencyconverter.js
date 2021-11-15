import React from 'react';
import { shallow } from "enzyme";
import CurrencyConverter from '../components/pages/currencyconverter/currencyconverter';
import { CURRENCY_OPTIONS } from '../static/currenciesData';

describe('CurrencyConverter', () => {
    //define the initial props
    const initProps = {
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
        countryOptions: CURRENCY_OPTIONS,
        handleCurrencySwap: jest.fn(),
        handleCurrencyChanged: jest.fn(),
        handleCurrencyConversion: jest.fn(),
        handleCurrencyConversionReverse: jest.fn(),
        handleExchange: jest.fn()
    };

    const comp = shallow(<CurrencyConverter {...initProps} />);

    it ("should render successfully with minimum settings", () => {
        expect(comp.exists()).toBe(true);
        expect(comp.hasClass("main")).toBe(true);

        expect(comp.find(".converter").exists()).toBe(true);
        expect(comp.find(".from__container").exists()).toBe(true);
        expect(comp.find(".swap__container").exists()).toBe(true);
        expect(comp.find(".to__container").exists()).toBe(true);
    });

    it ("should not explode from__container without given props", () => {
        expect(comp.find(".from__container .top_title").exists()).toBe(true);
        expect(comp.find(".from__container .converter__select").exists()).toBe(true);
        const dropdown = comp.find(".from__container .converter__select Dropdown");
        expect(dropdown.exists()).toBe(true);
        expect(dropdown.prop("placeholder")).toEqual("Choose your currency");
        expect(comp.find(".from__container .coverter__input").exists()).toBe(true);
        const currency = comp.find(".from__container .coverter__input .currency");
        expect(currency.exists()).toBe(true);
        expect(currency.text()).toEqual("-");
        expect(comp.find(".from__container .coverter__input input").exists()).toBe(true);
        expect(comp.find(".from__container .coverter__input .balance__error").exists()).toBe(false);
    });

    it ("should not explode swap__container without given props", () => {
        expect(comp.find(".swap__container .swap__container__mini").exists()).toBe(true);
        expect(comp.find(".swap__container .swap__container__mini i.ion-md-swap").exists()).toBe(true);
        expect(comp.find(".swap__container .rate__text").exists()).toBe(true);
        const exchangeButton = comp.find(".swap__container .exchange__button");
        expect(exchangeButton.exists()).toBe(true);
        expect(exchangeButton.text()).toEqual("Exchange");
    });

    it ("should not explode to__container without given props", () => {
        expect(comp.find(".to__container .top_title").exists()).toBe(true);
        expect(comp.find(".to__container .converter__select").exists()).toBe(true);
        const dropdown = comp.find(".to__container .converter__select Dropdown");
        expect(dropdown.exists()).toBe(true);
        expect(dropdown.prop("placeholder")).toEqual("Choose your currency");
        expect(comp.find(".to__container .coverter__input").exists()).toBe(true);
        const currency = comp.find(".to__container .coverter__input .currency");
        expect(currency.exists()).toBe(true);
        expect(currency.text()).toEqual("+");
        expect(comp.find(".to__container .coverter__input input").exists()).toBe(true);
    });

    it ("should display given props", () => {
        expect(comp.find(".from__container .top_title").text()).toEqual(`Balance: ${initProps.fromData.symbol}${initProps.balance[initProps.fromData.currency]}`);
        expect(comp.find(".from__container .coverter__input input").prop('value')).toEqual(`${initProps.fromData.value}`);
        expect(comp.find(".swap__container .rate__text").text()).toEqual(`${initProps.fromData.symbol}1 = ${initProps.toData.symbol}${initProps.rate}`);
        expect(comp.find(".to__container .top_title").text()).toEqual(`Balance: ${initProps.toData.symbol}${initProps.balance[initProps.toData.currency]}`);
    });

    it ("should display hint when the input value to be converted is greater than the balance of the same currency", () => {
        const props = {
            ...initProps,
            fromData: {
                ...initProps.fromData,
                value: 200
            }
        };
        const otherComp = shallow(<CurrencyConverter {...props} />);
        const balanceDanger = otherComp.find('.balance__error');
        expect(balanceDanger.exists()).toEqual(true);
        expect(balanceDanger.text()).toEqual("Exceeds balance");
    });

    it ("should use given onChange", () => {
        comp.find(".from__container Dropdown").invoke("onChange")({}, {value: 1});
        expect(initProps.handleCurrencyChanged).toHaveBeenCalledTimes(1);

        comp.find(".from__container .coverter__input input").invoke("onChange")({target: {value: 1}});
        expect(initProps.handleCurrencyConversion).toHaveBeenCalledTimes(1);

        comp.find(".swap__container__mini").simulate("click");
        expect(initProps.handleCurrencySwap).toHaveBeenCalledTimes(1);

        comp.find(".exchange__button").simulate("click");
        expect(initProps.handleExchange).toHaveBeenCalledTimes(1);

        comp.find(".to__container Dropdown").invoke("onChange")({}, {value: 1});
        expect(initProps.handleCurrencyChanged).toHaveBeenCalledTimes(2);

        comp.find(".to__container .coverter__input input").invoke("onChange")({target: {value: 1}});
        expect(initProps.handleCurrencyConversionReverse).toHaveBeenCalledTimes(1);
    });
});