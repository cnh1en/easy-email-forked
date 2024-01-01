import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { BorderColor } from '@extensions/AttributePanel/components/attributes/BorderColor';
import { BorderStyle } from '@extensions/AttributePanel/components/attributes/BorderStyle';
import { BorderWidth } from '@extensions/AttributePanel/components/attributes/BorderWidth';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { InlineGrid } from '@shopify/polaris';
import React from 'react';
import Collapsible from '../../UI/Collapsible';

export function Divider() {
  return (
    <AttributesPanelWrapper>
      <Collapsible title='Dimension'>
        <InlineGrid columns={1}>
          <Width suffix='%' />
          <Align />
          <Padding />
        </InlineGrid>
      </Collapsible>

      <Collapsible title='Border'>
        <InlineGrid columns={1}>
          <BorderWidth />
          <BorderStyle />
        </InlineGrid>
        <BorderColor />
      </Collapsible>

      <Collapsible title='Background'>
        <ContainerBackgroundColor title='Background color' />
      </Collapsible>
      {/* <Collapse.Item
        name='4'
        header={t('Extra')}
      >
        <Grid.Col span={24}>
          <ClassName />
        </Grid.Col>
      </Collapse.Item> */}
    </AttributesPanelWrapper>
  );
}
