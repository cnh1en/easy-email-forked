import { Tabs, TabsProps } from '@arco-design/web-react';
import { classnames } from '@extensions/utils/classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  LegacyCard,
  Tabs as PolarisTabs,
  TabsProps as PolarisTabsProp,
} from '@shopify/polaris';
import styles from './index.module.scss';
import enhancer from './enhancer';

const { TabPane } = Tabs;

export interface EditTabProps<T extends any = any> extends Omit<TabsProps, 'onChange'> {
  value: Array<T>;
  renderItem: (item: T, index: number) => React.ReactNode;
  onChange: (vals: Array<T>) => any;
  additionItem: T;
  label: string;
}
export function EditTab<T extends any = any>(props: EditTabProps<T>) {
  const { value, additionItem } = props;
  const [activeTab, setActiveTab] = useState('0');

  const onAddTab = () => {
    setActiveTab(value.length.toString());
    props.onChange([...value, additionItem]);
  };

  const onDeleteTab = (index: string) => {
    if (index < activeTab) {
      setActiveTab((Number(activeTab) - 1).toString());
    }
    if (index === activeTab) {
      setActiveTab(Number(index) > 0 ? `${Number(index) - 1}` : '0');
    }
    props.onChange(value.filter((_, vIndex) => Number(index) !== vIndex));
  };

  return (
    <Tabs
      destroyOnHide
      className={classnames(styles.editTab)}
      style={{ border: 'none' }}
      type='card'
      activeTab={activeTab}
      tabPosition={props.tabPosition}
      editable
      onAddTab={onAddTab}
      onDeleteTab={onDeleteTab}
      onChange={setActiveTab}
    >
      {(Array.isArray(value) ? value : []).map((item, index) => (
        <TabPane
          style={{ paddingLeft: 12 }}
          title={`${props.label || t('Tab')} ${index + 1}`}
          key={index}
        >
          {props.renderItem(item, index)}
        </TabPane>
      ))}
    </Tabs>
  );
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type NavLinkProps = {
  href?: string;
  content: string;
  color?: string;
  padding?: string;
  target?: '_blank' | '_self';
  src?: string;
  'font-size'?: string;
};

type AppTabsProps = {
  renderItem: (item: NavLinkProps, index: number) => React.ReactNode;
  value: NavLinkProps[];
  additionItem: NavLinkProps;
  onChange: (values: NavLinkProps[]) => any;
};

export const AppTabs = <T extends any>({
  value,
  additionItem,
  ...props
}: AppTabsProps) => {
  const [selected, setSelected] = useState(0);

  const [itemStrings, setItemStrings] = useState(['No link']);

  const deleteView = useCallback(
    (index: number) => {
      const newItemStrings = [...itemStrings];
      newItemStrings.splice(index, 1);
      setItemStrings(newItemStrings);
      props.onChange(value.filter((_, vIndex) => Number(index) !== vIndex));
      setSelected(0);
    },
    [itemStrings, props, value],
  );

  const tabs = useMemo(() => {
    return itemStrings.map((item, index) => ({
      content: item,
      index,
      onAction: () => {
        setSelected(index);
      },
      id: `${item}-${index}`,

      actions:
        index === 0
          ? []
          : [
              {
                type: 'delete',
                onPrimaryAction: async () => {
                  await sleep(1);
                  deleteView(index);
                  return true;
                },
              },
            ],
    }));
  }, [deleteView, itemStrings]);

  const onCreateNewView = useCallback(
    async (viewName: string) => {
      setItemStrings([...itemStrings, viewName]);
      await sleep(500);
      props.onChange([...value, { ...additionItem, content: viewName }]);
      setSelected(itemStrings.length);
      return true;
    },
    [additionItem, itemStrings, props, value],
  );

  const renderContent = useMemo(() => {
    return (Array.isArray(value) ? value : []).map((item, index) => {
      if (selected !== index) {
        return null;
      }
      return <Box key={index}>{props.renderItem(item, index)}</Box>;
    });
  }, [props, selected, value]);

  useEffect(() => {
    if (value) {
      setItemStrings(value.map(item => item.content ?? 'undefined'));
    }
  }, [value]);

  return (
    <PolarisTabs
      tabs={tabs}
      selected={selected}
      onSelect={setSelected}
      canCreateNewView
      onCreateNewView={onCreateNewView}
    >
      {renderContent}
    </PolarisTabs>
  );
};

export const AppTabsEnhancer = enhancer<AppTabsProps>(AppTabs, v => v);
