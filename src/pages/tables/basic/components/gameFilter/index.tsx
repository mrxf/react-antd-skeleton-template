import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import classNames from "classnames";
import moment from "moment";
import React, { useCallback, useEffect, useRef } from "react";
import LoadingSkeleton from "src/components/loadingInput";
import useSWR from "swr";
import { gameTypes } from "../../constants/gameType";

export interface IResult {
  [key: string]: any;
}

interface GameFilterProps {
  onSearch?: (result: IResult) => void;
  onReset?: () => void;
  initialValues?: IResult;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const GameFilter: React.FC<GameFilterProps> = ({
  onSearch,
  onReset,
  initialValues,
}) => {
  const shoudInitForm = useRef<boolean>(true);
  const [form] = Form.useForm();
  const { data: companyRes, isValidating: isValidatingCompany } = useSWR(
    "/antd/company/list"
  );
  /** 表单完成事件，处理一些特殊数据后提交 */
  const onFinish = useCallback(() => {
    form.validateFields().then((values) => {
      // 时间转换
      if (values.publishTime) {
        values.publishTime = +values.publishTime;
      }
      onSearch?.(values);
    });
  }, [onSearch, form]);

  /** 重置表单也通知数据 */
  const onFormReset = useCallback(() => {
    form.resetFields();
    onReset?.();
  }, [onReset, form]);

  /** 初始化搜索数据 */
  useEffect(() => {
    if (initialValues && shoudInitForm.current) {
      if (!!initialValues.publishTime) {
        // 将发布时间格式化
        initialValues.publishTime = moment(initialValues.publishTime);
      }
      shoudInitForm.current = false;
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form {...layout} form={form} name="user_search" onFinish={onFinish}>
      <Row gutter={16}>
        <LoadingSkeleton label="发行公司" isLoading={isValidatingCompany} />
        <Col span={8} className={classNames({ hide: isValidatingCompany })}>
          <Form.Item name="companyId" label="发行公司">
            <Select
              options={companyRes?.data?.list.map((item: any) => ({
                label: item.companyName,
                value: item.id,
              }))}
              placeholder="请选择发行公司"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="gameName" label="游戏名称">
            <Input placeholder="请输入游戏名称" allowClear />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="type" label="游戏类型">
            <Select
              options={gameTypes}
              placeholder="请选择游戏类型"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="publishTime" label="发布时间">
            <DatePicker allowClear style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="published" label="是否已发布">
            <Radio.Group defaultValue="all" buttonStyle="solid">
              <Radio.Button value="all">全部</Radio.Button>
              <Radio.Button value="no">未发布</Radio.Button>
              <Radio.Button value="yes">已发布</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Space>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              查询
            </Button>
            <Button htmlType="reset" onClick={onFormReset}>
              重置
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default GameFilter;
