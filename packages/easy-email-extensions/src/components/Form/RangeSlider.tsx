import React from 'react';
import {
  BlockStack,
  InlineStack,
  RangeSlider as PolarisRangeSlider,
  RangeSliderProps as PolarisRangeSliderProps,
  TextField,
  TextFieldProps,
} from '@shopify/polaris';

export type RangeSliderProps = Omit<PolarisRangeSliderProps, 'onChange'> & {
  showTextField?: boolean;
  name?: string;
  type?: string;
  onChange: (value: string) => void;
};

export const RangeSlider = ({
  name,
  suffix,
  type = 'text',
  output,
  showTextField = false,
  ...props
}: RangeSliderProps) => {
  if (showTextField) {
    return (
      <InlineStack
        wrap={false}
        blockAlign='center'
        gap='300'
      >
        <div
          style={{
            width: '70%',
          }}
        >
          <BlockStack align='center'>
            <PolarisRangeSlider
              {...props}
              label=''
              onChange={value => props.onChange(`${value}`)}
              output
            />
          </BlockStack>
        </div>

        <div
          style={{
            width: '30%',
          }}
        >
          <TextField
            autoComplete='off'
            label=''
            name={name}
            suffix={suffix}
            type={type as TextFieldProps['type']}
            onChange={value => {
              props.onChange(value);
            }}
            value={`${props.value}`}
          />
        </div>
      </InlineStack>
    );
  }

  return (
    <PolarisRangeSlider
      {...props}
      output
      onChange={value => props.onChange(`${value}`)}
      suffix={suffix}
    />
  );
};
