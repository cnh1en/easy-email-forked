import { useFocusIdx } from 'easy-email-editor';
import React, { useMemo } from 'react';
import { SelectField } from '../../../components/Form';

const options = [
  {
    value: 'top',
    get label() {
      return t('top');
    },
  },
  // {
  //   value: 'middle',
  //   get label() {
  //     return t('middle');
  //   },
  // },
  {
    value: 'bottom',
    get label() {
      return t('bottom');
    },
  },
];

export function VerticalAlign({
  attributeName = 'vertical-align',
}: {
  attributeName?: string;
}) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <SelectField
        label={t('Vertical align')}
        name={`${focusIdx}.attributes.${attributeName}`}
        options={options}
      />
    );
  }, [attributeName, focusIdx]);
}
