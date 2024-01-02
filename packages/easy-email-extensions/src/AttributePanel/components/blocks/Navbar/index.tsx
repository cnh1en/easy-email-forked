import { IconLink } from '@arco-design/web-react/icon';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { NavbarLinkPadding } from '@extensions/AttributePanel/components/attributes/NavbarLinkPadding';
import { ColorPickerField, SelectField, TextField } from '@extensions/components/Form';
import { AppTabsEnhancer } from '@extensions/components/Form/EditTab';
import { BlockStack } from '@shopify/polaris';
import { INavbar } from 'easy-email-core';
import { Stack, useFocusIdx } from 'easy-email-editor';
import React from 'react';
import Collapsible from '../../UI/Collapsible';
import { pixelAdapter } from '../../adapter';
import {
  FontFamily,
  FontStyle,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TextDecoration,
  TextTransform,
} from '../../attributes';

export const Navbar = () => {
  const { focusIdx } = useFocusIdx();

  return (
    <AttributesPanelWrapper>
      <Collapsible title='Layout'>
        <Stack
          vertical
          spacing='tight'
        >
          <Align />
        </Stack>
      </Collapsible>

      <Collapsible title='Nav links'>
        {/* <Space
          direction='vertical'
          style={{ width: '100%' }}
        >
          <EditTabField
            tabPosition='top'
            name={`${focusIdx}.data.value.links`}
            label={t('Links')}
            labelHidden
            renderItem={(item, index) => (
              <NavbarLink
                item={item}
                index={index}
              />
            )}
            additionItem={{
              src: 'https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg',
              target: '_blank',
              content: 'New link',
              color: '#1890ff',
              'font-size': '13px',
            }}
          />
          <div />
        </Space> */}
        <AppTabsEnhancer
          name={`${focusIdx}.data.value.links`}
          renderItem={(item, index) => (
            <NavbarLink
              item={item}
              index={index}
            />
          )}
          additionItem={{
            src: 'https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg',
            target: '_blank',
            content: 'DM',
            color: '#1890ff',
            'font-size': '13px',
          }}
        />
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
};

const NavbarLink = ({
  item,
  index,
}: {
  item: INavbar['data']['value']['links'];
  index: number;
}) => {
  const { focusIdx } = useFocusIdx();
  return (
    <div className='NavbarLink'>
      <BlockStack gap='300'>
        <TextField
          label={t('Content')}
          name={`${focusIdx}.data.value.links.[${index}].content`}
        />

        <ColorPickerField
          label={t('Color')}
          name={`${focusIdx}.data.value.links.[${index}].color`}
        />

        <FontFamily name={`${focusIdx}.data.value.links.[${index}].font-family`} />

        <TextField
          label={t('Font size (px)')}
          name={`${focusIdx}.data.value.links.[${index}].font-size`}
          config={pixelAdapter}
          autoComplete='off'
        />

        <LineHeight name={`${focusIdx}.data.value.links.[${index}].line-height`} />

        <LetterSpacing name={`${focusIdx}.data.value.links.[${index}].letter-spacing`} />

        <TextDecoration
          name={`${focusIdx}.data.value.links.[${index}].text-decoration`}
        />

        <FontWeight name={`${focusIdx}.data.value.links.[${index}].font-weight`} />

        <TextTransform name={`${focusIdx}.data.value.links.[${index}].text-transform`} />

        <FontStyle name={`${focusIdx}.data.value.links.[${index}].font-style`} />

        <TextField
          prefix={<IconLink />}
          label={<span>{t('Url')}</span>}
          name={`${focusIdx}.data.value.links.[${index}].href`}
        />

        <SelectField
          style={{ minWidth: 65 }}
          label={t('Target')}
          name={`${focusIdx}.data.value.links.[${index}].target`}
          options={[
            {
              value: '_blank',
              label: t('_blank'),
            },
            {
              value: '_self',
              label: t('_self'),
            },
          ]}
        />
        <NavbarLinkPadding
          key={index}
          name={`${focusIdx}.data.value.links.[${index}].padding`}
        />
        <div />
      </BlockStack>
    </div>
  );
};
