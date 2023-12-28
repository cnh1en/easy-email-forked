import { Autocomplete as ShopifyAutocomplete, Icon } from '@shopify/polaris';
import { SearchMinor } from '@shopify/polaris-icons';
import React, { useState, useCallback, useMemo } from 'react';

export type AutocompleteProps = {
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

const Autocomplete = ({ onChange, options: opts }: AutocompleteProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(opts);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(opts);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = opts.filter(option => option.label.match(filterRegex));
      setOptions(resultOptions);
    },
    [opts],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      const selectedValue = selected.map(selectedItem => {
        const matchedOption = options.find(option => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0] || '');
      onChange(selectedValue[0]);
    },
    [onChange, options],
  );

  const textField = (
    <ShopifyAutocomplete.TextField
      onChange={updateText}
      label='Tags'
      value={inputValue}
      prefix={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <Icon
          source={SearchMinor}
          tone='base'
        />
      }
      placeholder='Search'
      autoComplete='off'
    />
  );

  return (
    <div style={{ height: '225px' }}>
      <ShopifyAutocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  );
};

export default Autocomplete;
