import { Card, Row } from 'antd';
import React from 'react';
import LoadingSkeleton from '../loadingInput';

interface ContentSkeletonProps {
  
}

/** 主Body区域的骨架屏 */
const ContentSkeleton: React.FC<ContentSkeletonProps> = () => {
  return (
    <div>
      <Card className="mb-16">
        <Row gutter={16}>
          <LoadingSkeleton colSpan={8} isLoading/>
          <LoadingSkeleton colSpan={8} isLoading/>
          <LoadingSkeleton colSpan={8} isLoading/>
          <LoadingSkeleton colSpan={8} isLoading/>
          <LoadingSkeleton colSpan={8} isLoading/>
        </Row>
        <Row gutter={16}>
          <LoadingSkeleton colSpan={2} isLoading/>
          <LoadingSkeleton colSpan={2} isLoading/>
        </Row>
      </Card>
      <Card>
        <Row gutter={16}>
          <LoadingSkeleton colSpan={24} isLoading/>
          <LoadingSkeleton colSpan={24} size="small" isLoading/>
          <LoadingSkeleton colSpan={24} size="small" isLoading/>
          <LoadingSkeleton colSpan={24} size="small" isLoading/>
          <LoadingSkeleton colSpan={24} size="small" isLoading/>
        </Row>
      </Card>
    </div>
  );
};

export default ContentSkeleton;