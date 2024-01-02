import React from 'react';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { VerticalAlign } from '@extensions/AttributePanel/components/attributes/VerticalAlign';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import Collapsible from '../../UI/Collapsible';
import { BackgroundColor } from '../../attributes';
import { InlineGrid } from '@shopify/polaris';

export function Column() {
  return (
    <AttributesPanelWrapper>
      <Collapsible title='Dimension'>
        <InlineGrid
          columns={2}
          gap='300'
        >
          <Width
            suffix='px'
            min={10}
            max={300}
            showTextField={false}
          />
          <VerticalAlign />
        </InlineGrid>
        <Padding />
      </Collapsible>
      <Collapsible title='Background'>
        <BackgroundColor />
      </Collapsible>
      <Collapsible title='Border'>
        <Border />
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
