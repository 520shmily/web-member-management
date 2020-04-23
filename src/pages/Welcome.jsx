import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text >{children}</Typography.Text>
    </code>
  </pre>
);

export default () => (
  <PageHeaderWrapper>
    <Card>
      <Alert
        message="欢迎使用社团会员管理系统！你可以利用它，更好的管理会员、管理社团。（Tips：有任何问题请及时联系系统管理员）"
        // type="success"
        // showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Typography.Text strong className={styles.titleText}>
          我的社团
      </Typography.Text>
      <CodePreview> 在这个板块里，你可以发布社团简介信息，发布社团风采墙照片</CodePreview>
      <Typography.Text strong className={styles.titleText}>
          社团活动
      </Typography.Text>
      <CodePreview> 在这个板块里，你可以发布社团新活动，查看活动信息，修改活动信息等</CodePreview>
      <Typography.Text strong className={styles.titleText}>
          社团会员
      </Typography.Text>
      <CodePreview> 在这个板块里，你可以导入会员信息，查看会员信息，考评会员等</CodePreview>
      <Typography.Text strong className={styles.titleText}>
          会员建议
      </Typography.Text>
      <CodePreview> 在这个板块里，你可以导查看会员给到社团的所有建议</CodePreview>
      <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
        className={styles.titleText}
      >
          社团负责人
      </Typography.Text>
      <CodePreview> 在这个板块里，你可以查看社团负责人信息、修改社团负责人信息</CodePreview>
    </Card>
    <p
      style={{
        textAlign: 'center',
        marginTop: 24,
      }}
    >
      右侧导航栏查看使用社团会员管理系统的这些功能，快去试试吧
    </p>
  </PageHeaderWrapper>
);
