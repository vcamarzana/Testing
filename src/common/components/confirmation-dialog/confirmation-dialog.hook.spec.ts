import { act, renderHook } from '@testing-library/react';
import { createEmptyLookup } from 'common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('useConfirmationDialog specs', () => {
  it('should initialize with default values', () => {
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should set isOpen to true and set itemToDelete when onOpenDialog is called', () => {
    // Arrange
    const item = { id: '1', name: 'test name' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('should reset itemToDelete with empty values when onAccept is called', () => {
    // Arrange
    const item = { id: '1', name: 'test name' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
    });
    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should close the dialog and set isOpen to false when onClose is called', () => {
    const item = { id: '1', name: 'test name' };
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(item);
    });

    act(() => {
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
