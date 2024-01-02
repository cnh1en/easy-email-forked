import { Layout } from '@arco-design/web-react';
import { FullHeightOverlayScrollbars } from '@extensions/components/FullHeightOverlayScrollbars';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';
import { useEditorProps } from 'easy-email-editor';
import React, { useState } from 'react';
import { Blocks } from './Blocks';
import { ConfigurationDrawer } from './ConfigurationDrawer';
import styles from './index.module.scss';
import { Tabs } from '@shopify/polaris';
import { BlockLayer } from '@extensions/BlockLayer';

export function EditPanel({
  showSourceCode,
  jsonReadOnly,
  mjmlReadOnly,
}: {
  showSourceCode: boolean;
  jsonReadOnly: boolean;
  mjmlReadOnly: boolean;
}) {
  const { height } = useEditorProps();
  const { compact = true } = useExtensionProps();

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Layout.Sider
      className={styles.blocksPanel}
      style={{ paddingRight: 0, minWidth: 360 }}
      // collapsed={collapsed}
      collapsible
      trigger={null}
      breakpoint='xl'
      collapsedWidth={60}
      width={360}
    >
      <Tabs
        selected={selectedTab}
        fitted
        tabs={[
          {
            content: 'Block',
            id: 'block',
            onAction: () => setSelectedTab(0),
          },
          {
            content: 'Layer',
            id: 'layer',
            onAction: () => setSelectedTab(1),
          },
        ]}
      >
        {selectedTab === 0 ? (
          <FullHeightOverlayScrollbars height={height}>
            <Blocks />
          </FullHeightOverlayScrollbars>
        ) : (
          <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
            <div style={{ padding: 20 }}>
              <BlockLayer />
            </div>
          </FullHeightOverlayScrollbars>
        )}
      </Tabs>
      {!compact && (
        <ConfigurationDrawer
          height={height}
          showSourceCode={showSourceCode}
          compact={Boolean(compact)}
          jsonReadOnly={jsonReadOnly}
          mjmlReadOnly={mjmlReadOnly}
        />
      )}
    </Layout.Sider>
  );
}
