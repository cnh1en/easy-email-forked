import { Grid } from '@arco-design/web-react';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { ColorPickerField } from '@extensions/components/Form';
import { BlockStack, InlineGrid } from '@shopify/polaris';
import { useFocusIdx } from 'easy-email-editor';
import React from 'react';
import { FontFamily } from '../../attributes/FontFamily';
import {
  PolarisColorPicker,
  PolarisTextField,
  PolarisTextFieldWithUnit,
} from '@extensions/components/Form/Polaris/Form';
import ColorPicker from '@extensions/components/Form/Polaris/ColorPicker';

interface PageProps {
  hideSubTitle?: boolean;
  hideSubject?: boolean;
}
export function Page({ hideSubTitle, hideSubject }: PageProps) {
  const { focusIdx } = useFocusIdx();

  if (!focusIdx) return null;

  return (
    <AttributesPanelWrapper
      style={{ padding: 0 }}
      title='Page attributes'
    >
      <BlockStack>
        <>
          <BlockStack gap='200'>
            {!hideSubject && (
              <PolarisTextField
                label='Subject'
                name='subject'
                autoComplete='off'
              />
            )}
            {!hideSubTitle && (
              <PolarisTextField
                label='Subtitle'
                name={'subTitle'}
                autoComplete='off'
                multiline={4}
                maxHeight='160px'
              />
            )}
            <PolarisTextFieldWithUnit
              unit='px'
              type='number'
              suffix='px'
              autoComplete='off'
              label='Width'
              name={`${focusIdx}.attributes.width`}
            />

            {/* TODO */}
            {/* <InputWithUnitField
                label={t('Breakpoint')}
                helpText={t(
                  'Allows you to control on which breakpoint the layout should go desktop/mobile.',
                )}
                name={`${focusIdx}.data.value.breakpoint`}
                inline
              /> */}
          </BlockStack>
        </>

        <BlockStack>
          <InlineGrid
            columns={2}
            gap='300'
          >
            <FontFamily name={`${focusIdx}.data.value.font-family`} />

            <PolarisTextFieldWithUnit
              label='Font size'
              suffix='px'
              name={`${focusIdx}.data.value.font-size`}
              autoComplete='off'
              unit='px'
              type='number'
              max={30}
              min={10}
            />
          </InlineGrid>

          <InlineGrid
            columns={2}
            gap='300'
          >
            <PolarisTextField
              label={t('Line height')}
              name={`${focusIdx}.data.value.line-height`}
              autoComplete='off'
              type='number'
              max={5}
              min={1}
            />

            <PolarisTextField
              label={t('Font weight')}
              name={`${focusIdx}.data.value.font-weight`}
              autoComplete='off'
              type='number'
            />
          </InlineGrid>

          <InlineGrid
            columns={2}
            gap='300'
          >
            <PolarisColorPicker
              label='Text color'
              name={`${focusIdx}.data.value.text-color`}
            />

            <PolarisColorPicker
              label='Content background'
              name={`${focusIdx}.attributes.background-color`}
            />
          </InlineGrid>

          {/* <TextAreaField
            autoSize
            label={t('User style')}
            name={`${focusIdx}.data.value.user-style.content`}
          /> */}
          {/* <AddFont /> */}
        </BlockStack>
      </BlockStack>
    </AttributesPanelWrapper>
  );
}
