import { renderHook, act } from '@testing-library/react-hooks';
import { Lookup } from 'common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('useConfirmationDialog hook', () => {
  const emptyObject: Lookup = {"id": "", "name": ""};

  it('should return the property isOpen with false as the default value', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toEqual(false);
  });
  it('should return the property itemToDelete with an empty object as the default value', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.itemToDelete).toEqual(emptyObject);
  });
  it('should return onAccept, onClose and onOpenDialog type functions', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });
  it('should update the value of isOpen and itemTodelete when onOpenDialog is called with an item', () => {
    // Arrange
    const item: Lookup = {"id": "123", "name": "Aida"};

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(item);
    })

    // Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(item);
  });
  it('should return an empty itemTodelete when onOpenDialog is called with a null', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(null);
    })

    // Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(emptyObject);
  });
  it('should return an empty itemTodelete when onOpenDialog is called with an undefined', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(undefined);
    })

    // Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(emptyObject);
  });
  it('should update the value of itemTodelete  with an empty lookup when onAccept is called after open dialog with an item', () => {
    // Arrange
    const item: Lookup = {"id": "123", "name": "Aida"};

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(item);
      result.current.onAccept();
    })

    // Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(emptyObject);
  });
  it('should update the value of isOpen to false when onClose is called after open dialog with an item', () => {
    // Arrange
    const item: Lookup = {"id": "123", "name": "Aida"};

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(item);
      result.current.onClose();
    })

    // Assert
    expect(result.current.isOpen).toEqual(false);
  });
});
