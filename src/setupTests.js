// https://enzymejs.github.io/enzyme/docs/installation/index.html
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });