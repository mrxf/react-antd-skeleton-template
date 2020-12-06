import { Col, Form, Skeleton } from "antd";
import { SkeletonInputProps } from "antd/lib/skeleton/Input";
import classNames from "classnames";
import React from "react";
import style from "./index.module.less";

interface LoadingSkeletonProps extends SkeletonInputProps {
  label?: string;
  isLoading: boolean;
  colSpan?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  isLoading,
  label,
  colSpan = 8,
  ...restProps
}) => {
  return (
    <Col
      span={colSpan}
      className={classNames(style.loadingSkeleton, { hide: !isLoading })}
    >
      <Form.Item label={label}>
        <Skeleton.Input active { ...restProps }/>
      </Form.Item>
    </Col>
  );
};

export default LoadingSkeleton;
