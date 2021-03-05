import { Card } from "antd";
import React from "react";
import BreadCrumbShow from "./components/breadcrumb";
import Buttons from "./components/buttons";
import DropDownShow from "./components/dropdown";
import FormShow from "./components/form";
import SliderShow from "./components/slider";
import TypographyShow from "./components/typographyShow";

const Show: React.FC = () => {
  return (
    <Card>
      <Buttons />
      <DropDownShow />
      <BreadCrumbShow />
      <FormShow />
      <SliderShow />
      <TypographyShow />
    </Card>
  );
};

export default Show;
