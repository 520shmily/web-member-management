import React, { useState, useEffect } from 'react';
import { Empty, Button } from 'antd';

class EmptyItem extends React.Component {

  render () {

    return (
      <Empty 
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={
          <span>
            还没有导入社团简介信息哦
          </span>
        }
      >
        <Button type="primary" onClick={this.props.handleonClik}>点击导入</Button>
      </Empty>
    );
  }
};

export default EmptyItem;