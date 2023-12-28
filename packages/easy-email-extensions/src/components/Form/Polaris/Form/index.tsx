import { CheckboxProps } from '@arco-design/web-react';
import {
  Autocomplete,
  AutocompleteProps,
  Checkbox,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@shopify/polaris';
import enhancer from '../../enhancer';
import TextFieldWithUnit, { TextFieldWithUnitProps } from '../TextFieldWithUnit';
import ColorPicker, { ColorPickerProps } from '../ColorPicker';

export const PolarisTextField = enhancer<TextFieldProps>(TextField, v => v);

export const PolarisSelect = enhancer<SelectProps>(Select, v => v);

export const PolarisCheckbox = enhancer<CheckboxProps>(Checkbox, v => v);

export const PolarisTextFieldWithUnit = enhancer<TextFieldWithUnitProps>(
  TextFieldWithUnit,
  v => v,
);

export const PolarisColorPicker = enhancer<ColorPickerProps>(ColorPicker, v => {
  return v;
});
