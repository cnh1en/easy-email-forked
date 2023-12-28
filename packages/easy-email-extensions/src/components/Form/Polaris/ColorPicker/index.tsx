import {
  BlockStack,
  Box,
  Checkbox,
  ColorPicker as PolarisColorPicker,
  Icon,
  InlineStack,
  Popover,
  Text,
  TextField,
  hsbToHex,
  hslToRgb,
  rgbToHsb,
  HSBColor,
} from '@shopify/polaris';
import React, { useCallback, useMemo, useState } from 'react';
import convert from 'color-convert';
import { InfoMinor } from '@shopify/polaris-icons';
import useModal from '@extensions/hooks/useModal';

export type ColorPickerProps = {
  value: string;
  onChange: (value: string, id?: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  helpText?: string;
  placeholder?: string;
  id?: string;
  isTransparent?: boolean;
};

export default function ColorPicker({
  value,
  onChange,
  label,
  error,
  disabled,
  helpText,
  placeholder,
  id,
  isTransparent,
}: ColorPickerProps) {
  const { open: isPopoverOpen, toggle: togglePopover } = useModal();

  const [color, setColor] = useState(() => {
    if (value === 'transparent') {
      return value;
    }
    const hsl = convert.hex.hsl(value);
    if (!hsl) {
      return null;
    }
    return rgbToHsb(
      hslToRgb({
        hue: hsl[0],
        saturation: hsl[1],
        lightness: hsl[2],
      }),
    );
  });

  const handleChange = useCallback(
    (hsbColor: HSBColor) => {
      setColor(hsbColor);
      onChange(hsbToHex(hsbColor), id);
    },
    [id, onChange],
  );

  const handleTransparentChecked = useCallback(
    (isChecked: boolean) => {
      const newValue = isChecked ? 'transparent' : '#000000';
      setColor(newValue);
      onChange(newValue, id);
    },
    [id, onChange],
  );

  const activator = useMemo(
    () => (
      <Box
        style={{
          cursor: disabled ? 'inherit' : 'pointer',
          marginTop: 'var(--p-space-050)',
          opacity: disabled ? '0.4' : '1',
        }}
        paddingBlockStart='050'
        onClick={disabled ? undefined : togglePopover}
      >
        <InlineStack
          gap='200'
          blockAlign='center'
          wrap={false}
        >
          <Box
            style={{
              background: value || placeholder || '#AAA',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              boxShadow: 'inset 0 0 0 0.0625rem #00000030',
            }}
          />
          <BlockStack gap='0'>
            <Text
              as='p'
              variant='bodySm'
              fontWeight='semibold'
            >
              {label}
            </Text>
            <Text
              as='p'
              variant='bodySm'
              alignment='start'
            >
              {value}
            </Text>
            {error && (
              <InlineStack
                blockAlign='start'
                gap='050'
              >
                <Box width='16px'>
                  <Icon
                    source={InfoMinor}
                    tone='textCritical'
                  />
                </Box>
                <Text
                  tone='critical'
                  variant='bodySm'
                >
                  {error}
                </Text>
              </InlineStack>
            )}
          </BlockStack>
        </InlineStack>
      </Box>
    ),
    [disabled, error, label, placeholder, togglePopover, value],
  );

  return (
    <Popover
      active={isPopoverOpen}
      activator={activator}
      autofocusTarget='first-node'
      onClose={togglePopover}
    >
      <Popover.Pane fixed>
        <Box padding='200'>
          <BlockStack gap='200'>
            <PolarisColorPicker
              fullWidth
              onChange={handleChange}
              color={color}
              disabled={disabled}
            />
            <InlineStack gap='200'>
              <Box
                style={{
                  background: value || placeholder || '#AAA',
                  width: '2rem',
                  height: '2rem',
                  borderRadius: 'var(--p-border-radius-100)',
                  boxShadow: 'inset 0 0 0 0.0625rem #00000030',
                }}
              />
              <Box width='148px'>
                <TextField
                  id={id}
                  value={value}
                  onChange={onChange}
                  error={error}
                  disabled={disabled}
                  helpText={helpText}
                  placeholder={placeholder}
                  autoComplete='off'
                />
              </Box>
            </InlineStack>
            {isTransparent && (
              <Checkbox
                label={t('display.transparent')}
                onChange={handleTransparentChecked}
                checked={color === 'transparent'}
              />
            )}
          </BlockStack>
        </Box>
      </Popover.Pane>
    </Popover>
  );
}
