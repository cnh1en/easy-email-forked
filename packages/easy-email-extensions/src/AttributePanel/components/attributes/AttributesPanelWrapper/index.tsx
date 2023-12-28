import { IconEye, IconEyeInvisible } from '@arco-design/web-react/icon';
import React, { useCallback } from 'react';
import { Stack, TextStyle, useBlock } from 'easy-email-editor';
import { BasicType, BlockManager } from 'easy-email-core';
import { Box } from '@shopify/polaris';

export interface AttributesPanelWrapper {
  style?: React.CSSProperties;
  extra?: React.ReactNode;
  children: React.ReactNode | React.ReactElement;
  title?: string;
}
export const AttributesPanelWrapper: React.FC<AttributesPanelWrapper> = props => {
  const { focusBlock, setFocusBlock } = useBlock();
  const block = focusBlock && BlockManager.getBlockByType(focusBlock.type);

  const onChangeHidden = useCallback(
    (val: string | boolean) => {
      if (!focusBlock) return;
      focusBlock.data.hidden = val as any;
      setFocusBlock({ ...focusBlock });
    },
    [focusBlock, setFocusBlock],
  );

  if (!focusBlock || !block) return null;

  return (
    <Box padding='500'>
      <Stack vertical>
        <Stack.Item fill>
          <Stack
            wrap={false}
            distribution='equalSpacing'
            alignment='center'
          >
            <Stack
              spacing='extraTight'
              alignment='center'
            >
              <EyeIcon />
              <TextStyle
                variation='strong'
                size='large'
              >
                {props?.title || `${block.name} ${t('attributes')}`}
              </TextStyle>
            </Stack>
            <Stack.Item>{props.extra}</Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>
      {props.children}
    </Box>
  );
};

function EyeIcon() {
  const { setFocusBlock, focusBlock } = useBlock();

  const onToggleVisible = useCallback(
    (e: React.MouseEvent) => {
      if (!focusBlock) return null;
      e.stopPropagation();
      setFocusBlock({
        ...focusBlock,
        data: {
          ...focusBlock.data,
          hidden: !focusBlock.data.hidden,
        },
      });
    },
    [focusBlock, setFocusBlock],
  );

  if (!focusBlock) return null;

  if (focusBlock.type === BasicType.PAGE) return null;

  return focusBlock.data.hidden ? (
    <IconEyeInvisible
      style={{ cursor: 'pointer', fontSize: 18 }}
      onClick={onToggleVisible}
    />
  ) : (
    <IconEye
      style={{ cursor: 'pointer', fontSize: 18 }}
      onClick={onToggleVisible}
    />
  );
}
