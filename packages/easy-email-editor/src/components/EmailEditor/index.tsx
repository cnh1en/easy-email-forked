import React, { useMemo, useCallback } from 'react';
import { Stack } from '../UI/Stack';
import { ToolsPanel } from './components/ToolsPanel';
import { createPortal } from 'react-dom';
import { EASY_EMAIL_EDITOR_ID, FIXED_CONTAINER_ID } from '@/constants';
import { useActiveTab } from '@/hooks/useActiveTab';
import { ActiveTabKeys } from '../Provider/BlocksProvider';
import { DesktopEmailPreview } from './components/DesktopEmailPreview';
import { MobileEmailPreview } from './components/MobileEmailPreview';
import { EditEmailPreview } from './components/EditEmailPreview';
import { TabPane, Tabs } from '@/components/UI/Tabs';
import { useEditorProps } from '@/hooks/useEditorProps';
import './index.scss';
import '@/assets/font/iconfont.css';
import { EventManager, EventType } from '@/utils/EventManager';
import { Icon, AppProvider } from '@shopify/polaris';
import { MobileMajor, DesktopMajor, DragDropMajor } from '@shopify/polaris-icons';
import translations from '@shopify/polaris/locales/en.json';

(window as any).global = window; // react-codemirror

export const EmailEditor = () => {
  const { height: containerHeight } = useEditorProps();
  const { setActiveTab, activeTab } = useActiveTab();

  const fixedContainer = useMemo(() => {
    return createPortal(<div id={FIXED_CONTAINER_ID} />, document.body);
  }, []);

  const onBeforeChangeTab = useCallback((currentTab: any, nextTab: any) => {
    return EventManager.exec(EventType.ACTIVE_TAB_CHANGE, { currentTab, nextTab });
  }, []);

  const onChangeTab = useCallback(
    (nextTab: string) => {
      setActiveTab(nextTab as any);
    },
    [setActiveTab],
  );

  return useMemo(
    () => (
      <AppProvider i18n={translations}>
        <div
          id={EASY_EMAIL_EDITOR_ID}
          style={{
            display: 'flex',
            flex: '1',
            overflow: 'hidden',
            justifyContent: 'center',
            minWidth: 640,
            height: containerHeight,
          }}
        >
          <Tabs
            activeTab={activeTab}
            onBeforeChange={onBeforeChangeTab}
            onChange={onChangeTab}
            style={{ height: '100%', width: '100%' }}
            tabBarExtraContent={<ToolsPanel />}
            variant='segmented'
          >
            <TabPane
              style={{ height: 'calc(100% - 50px)' }}
              tab={<Icon source={DragDropMajor} />}
              key={ActiveTabKeys.EDIT}
            >
              <EditEmailPreview />
            </TabPane>
            <TabPane
              style={{ height: 'calc(100% - 50px)' }}
              tab={<Icon source={DesktopMajor} />}
              key={ActiveTabKeys.PC}
            >
              <DesktopEmailPreview />
            </TabPane>
            <TabPane
              style={{ height: 'calc(100% - 50px)' }}
              tab={<Icon source={MobileMajor} />}
              key={ActiveTabKeys.MOBILE}
            >
              <MobileEmailPreview />
            </TabPane>
          </Tabs>
          <>{fixedContainer}</>
        </div>
      </AppProvider>
    ),
    [activeTab, containerHeight, fixedContainer, onBeforeChangeTab, onChangeTab],
  );
};
