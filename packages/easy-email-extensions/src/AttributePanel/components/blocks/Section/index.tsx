import React, { useCallback } from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Background } from '@extensions/AttributePanel/components/attributes/Background';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space, Switch } from '@arco-design/web-react';
import { Stack, useBlock, useFocusIdx } from 'easy-email-editor';
import { BasicType, BlockManager } from 'easy-email-core';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { BlockStack } from '@shopify/polaris';
import Collapsible from '../../UI/Collapsible';
import { BorderColor, BorderWidth } from '../../attributes';

export function Section() {
  const { focusBlock, setFocusBlock } = useBlock();

  const { focusIdx } = useFocusIdx();

  const noWrap = focusBlock?.data.value.noWrap;

  const onChange = useCallback(
    checked => {
      if (!focusBlock) return;
      focusBlock.data.value.noWrap = checked;
      if (checked) {
        const children = [...focusBlock.children];
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (!child) continue;
          if (child.type === BasicType.GROUP) {
            children.splice(i, 1, ...child.children);
          }
        }
        focusBlock.children = [
          BlockManager.getBlockByType(BasicType.GROUP)!.create({
            children: children,
          }),
        ];
      } else {
        if (
          focusBlock.children.length === 1 &&
          focusBlock.children[0].type === BasicType.GROUP
        ) {
          focusBlock.children = focusBlock.children[0]?.children || [];
        }
      }
      setFocusBlock({ ...focusBlock });
    },
    [focusBlock, setFocusBlock],
  );

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <BlockStack>
        <Collapsible title='Dimension'>
          {/* <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={12}>
                <label style={{ width: '100%', display: 'flex' }}>
                  <div style={{ flex: 1 }}>{t('Group')}</div>
                </label>
                <Switch
                  checked={noWrap}
                  checkedText={t('True')}
                  uncheckedText={t('False')}
                  onChange={onChange}
                />
              </Grid.Col>
              <Grid.Col span={12} />
            </Grid.Row> */}

          {/* </Space> */}
          <Padding showResetAll />
        </Collapsible>
        <Collapsible title='Background'>
          <Background />
        </Collapsible>
        {/* <Collapsible title='Border'>
          <Border />
          <BorderColor />
        </Collapsible> */}
        {/* <Collapse.Item
          name='4'
          header={t('Extra')}
        >
          <Grid.Col span={24}>
            <ClassName />
          </Grid.Col>
        </Collapse.Item> */}
      </BlockStack>
    </AttributesPanelWrapper>
  );
}
