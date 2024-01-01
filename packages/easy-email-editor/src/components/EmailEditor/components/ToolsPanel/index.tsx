import { Button } from '@/components/UI/Button';
import { useBlock } from '@/hooks/useBlock';
import { ButtonGroup } from '@shopify/polaris';
import { RedoMajor, UndoMajor } from '@shopify/polaris-icons';
import React from 'react';

export function ToolsPanel() {
  const { redo, undo, redoable, undoable } = useBlock();

  return (
    <ButtonGroup variant='segmented'>
      <Button
        icon={UndoMajor}
        disabled={!undoable}
        onClick={undo}
      />
      <Button
        icon={RedoMajor}
        disabled={!redoable}
        onClick={redo}
      />
    </ButtonGroup>
  );
}
