import { Badge, Card, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { isEqual, omit } from "lodash";
import React, { useMemo } from "react";
import { http } from "src/utils/http";
import useSWR from "swr";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import GameFilter from "./components/gameFilter";
import { gameTypes } from "./constants/gameType";

interface BasicFormProps {}

const BasicForm: React.FC<BasicFormProps> = () => {
  /** 使用与queryParam关联的参数 */
  const [query, setQuery] = useQueryParams<any>({
    page: withDefault(NumberParam, 1),
    size: withDefault(NumberParam, 10),
    companyId: StringParam,
    gameName: StringParam,
    type: StringParam,
    publishTime: NumberParam,
    published: withDefault(StringParam, "all"),
  });

  /** 依赖query的变化，发起查询请求 */
  const { isValidating, data, mutate } = useSWR(
    ["/mock/game/list", query],
    http.get
  );

  const tableColumn: ColumnsType<any> = useMemo(() => {
    return [
      {
        title: "游戏名称",
        key: "title",
        dataIndex: "title",
      },
      {
        title: "游戏类型",
        key: "type",
        dataIndex: "type",
        render: (data) => {
          const typeItem = gameTypes.find((item) => item.value === data);
          return <Tag color={typeItem?.color}>{typeItem?.label}</Tag>;
        },
      },
      {
        title: "发行公司",
        key: "company",
        dataIndex: "title",
      },
      {
        title: "发布时间",
        key: "publishTime",
        dataIndex: "publishTime",
      },
      {
        title: "是否已上市",
        key: "published",
        dataIndex: "published",
        render: (published) =>
          published ? (
            <Badge color="blue" text="已上市" />
          ) : (
            <Badge color="gray" text="未上市" />
          ),
      },
    ];
  }, []);

  return (
    <>
      <Card className="mb-16">
        <GameFilter
          initialValues={omit(query, "page", "size")}
          onSearch={(values) => {
            const newQuery = { ...query, ...values, page: 1 };
            const needUpdate = isEqual(newQuery, query);
            setQuery(newQuery);
            // 参数未改变可能无法引起查询，主动发起查询
            if (needUpdate) {
              mutate();
            }
          }}
        />
      </Card>
      <Card>
        <Table
          columns={tableColumn}
          rowKey="id"
          dataSource={data?.data.list}
          loading={isValidating}
          pagination={{
            total: data?.data.total,
            current: query.page,
            pageSize: query.size,
            onChange(page, size) {
              setQuery({ ...query, page, size });
            },
            showQuickJumper: true,
          }}
        />
      </Card>
    </>
  );
};

export default BasicForm;
