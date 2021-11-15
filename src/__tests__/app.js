import React from 'react';
import dayjs from 'dayjs';
import { shallow } from "enzyme";
import App from '../components/app/app';

describe("App", () => {
    const comp = shallow(<App />);

    it ("should render without crashing", () => {
        expect(comp.exists()).toBe(true);
        expect(comp.hasClass("main__content")).toBe(true);
    });

    it ("should render header", () => {
        const pageTitle = comp.find(".page__title");
        expect(pageTitle.exists()).toBe(true);
        expect(pageTitle.text()).toEqual("Currency Converter");

        const pageTitleSmall = comp.find(".page__title__small");
        expect(pageTitleSmall.exists()).toBe(true);
        expect(pageTitleSmall.text()).toEqual(`Today, ${dayjs().format('YYYY-MM-DD HH:mm')}`);
    });
});