import { Card, Table } from "antd";
import React from "react";
import useSWR from "swr";

interface BasicFormProps {}

const BasicForm: React.FC<BasicFormProps> = () => {
  const { isValidating } = useSWR("/mock/game/list");

  return <Card loading={isValidating}></Card>;
};

export default BasicForm;
