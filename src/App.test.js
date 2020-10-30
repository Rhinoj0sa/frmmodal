import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { MY_DATA } from "./data";
Enzyme.configure({ adapter: new Adapter() });

describe(App, () => {
  const app = shallow(<App />);

  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });
  it("initializes the `state` with initial data", () => {
    expect(app.state().data).toEqual(MY_DATA);
  });
  