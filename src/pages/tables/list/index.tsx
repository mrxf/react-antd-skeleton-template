import { Button, Card } from "antd";
import React, { useState } from "react";
import { useHttp } from "./hooks/useHttp";

interface CompanyProps {}

const Company: React.FC<CompanyProps> = () => {
  const [reqParams, setReqParams] = useState<any>({ start: 1, limit: 10 });
  const { data, loading, run } = useHttp("/antd/company", { deps: reqParams, manual: true });
  return (
    <Card loading={loading}>
      <Button onClick={() => run(reqParams)}>请求数据</Button>
      <Button
        type="dashed"
        onClick={() => setReqParams((params: any) => ({ ...params, start: 2 }))}
      >
        第二页
      </Button>
      <ul>
        {data?.data?.result?.companyList.map((item: any) => (
          <h3 key={item.id}>{item.name}</h3>
        ))}
      </ul>
    </Card>
  );
};

export default Company;
