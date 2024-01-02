import {
  Bleed,
  BlockStack,
  Box,
  Button,
  Divider,
  InlineStack,
  Text,
} from '@shopify/polaris';
import { HideMinor, ViewMinor } from '@shopify/polaris-icons';
import { BasicType, BlockManager } from 'easy-email-core';
import { useBlock } from 'easy-email-editor';
import React, { useCallback } from 'react';

export interface AttributesPanelWrapper {
  style?: React.CSSProperties;
  extra?: React.ReactNode;
  children: React.ReactNode | React.ReactElement;
  hiddenTitle?: boolean;
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
    <Box paddingInline='500'>
      <BlockStack>
        <Box paddingBlock='300'>
          <InlineStack
            blockAlign='center'
            align='space-between'
          >
            <span />
            <Text
              as='p'
              alignment='center'
              variant='headingMd'
            >
              {block.name}
            </Text>
            <EyeIcon />
          </InlineStack>
        </Box>
        <Bleed marginInline='500'>
          <Divider />
        </Bleed>
        {props.children}
      </BlockStack>
    </Box>
  );
};

const EyeIcon = () => {
  const { setFocusBlock, focusBlock } = useBlock();

  const onToggleVisible = useCallback(() => {
    if (!focusBlock) return null;
    // e.stopPropagation();
    setFocusBlock({
      ...focusBlock,
      data: {
        ...focusBlock.data,
        hidden: !focusBlock.data.hidden,
      },
    });
  }, [focusBlock, setFocusBlock]);

  if (!focusBlock) return null;

  if (focusBlock.type === BasicType.PAGE) return <span />;

  return (
    <Button
      icon={focusBlock.data.hidden ? HideMinor : ViewMinor}
      onClick={onToggleVisible}
      variant='plain'
    />
  );
};
