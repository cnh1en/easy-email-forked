import React, { useCallback } from 'react';
import {
  TextField as PolarisTextField,
  TextFieldProps as PolarisTextFieldProps,
} from '@shopify/polaris';

export interface InputProps
  extends Omit<PolarisTextFieldProps, 'onChange' | 'autoComplete'> {
  quickchange?: boolean;
  autoComplete?: 'on' | 'off';
  onChange: (val: string) => void;
}

export function Input(props: InputProps) {
  // const onKeyDown = useCallback(
  //   (ev: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (onPropsKeyDown) {
  //       onPropsKeyDown?.(ev);
  //     }

  //     if (quickchange) {
  //       let step = 0;
  //       if (ev.key === 'ArrowUp') {
  //         step = 1;
  //       }
  //       if (ev.key === 'ArrowDown') {
  //         step = -1;
  //       }

  //       if (step) {
  //         if (/^\d+/.test(value)) {
  //           ev.preventDefault();
  //           onChange(
  //             String(value).replace(/^(\d+)/, (_, match) => {
  //               return (Number(match) + step).toString();
  //             }),
  //           );
  //         }
  //       }
  //     }
  //   },
  //   [onPropsKeyDown, quickchange, value, onChange],
  // );

  return (
    <PolarisTextField
      {...props}
      // {...{ ...props, quickchange: undefined }}
      onChange={(value, id) => props.onChange(value)}
      autoComplete='off'
      // onKeyDown={onKeyDown}
    />
  );
}
