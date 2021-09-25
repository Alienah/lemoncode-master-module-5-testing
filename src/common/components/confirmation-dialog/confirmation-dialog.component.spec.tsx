import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';

describe('common/components/ConfirmationDialogComponent', () => {
  it('should render a dialog when isOpen prop is true', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: "The title",
      labels: {
        closeButton: "Close",
        acceptButton: "Accept",
      }
    }

    // Act
    const {baseElement} = render(<ConfirmationDialogComponent {...props} />);
    const dialog = screen.getByRole('dialog')

    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(dialog).toBeInTheDocument();
  });
  it('should not exists a dialog when isOpen prop is false', () => {
    // Arrange
    const props = {
      isOpen: false,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: "The title",
      labels: {
        closeButton: "Close",
        acceptButton: "Accept",
      }
    }

    // Act
    const {baseElement} = render(<ConfirmationDialogComponent {...props} />);
    const dialog = screen.queryByRole('dialog');

    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(dialog).not.toBeInTheDocument();
  });

  describe('content display', () => {
    it('should display the title specified in title prop', () => {
      // Arrange
      const props = {
        isOpen: true,
        onAccept: jest.fn(),
        onClose: jest.fn(),
        title: "The title",
        labels: {
          closeButton: "Close",
          acceptButton: "Accept",
        }
      }

      // Act
      render(<ConfirmationDialogComponent {...props} />);
      const dialog = screen.getByRole('dialog');
      const title = within(dialog).getByRole('heading', {level:2})

      // Assert
      expect(title).toHaveTextContent(props.title);
    });
    it('should display the label specified by props for accept button', () => {
      // Arrange
      const props = {
        isOpen: true,
        onAccept: jest.fn(),
        onClose: jest.fn(),
        title: "The title",
        labels: {
          closeButton: "Close",
          acceptButton: "Accept",
        }
      }

      // Act
      render(<ConfirmationDialogComponent {...props} />);
      const dialog = screen.getByRole('dialog');
      const acceptButton = within(dialog).getByRole('button', {name: props.labels.acceptButton})

      // Assert
      expect(acceptButton).toBeInTheDocument();
    });
    it('should display the label specified by props for close button', () => {
      // Arrange
      const props = {
        isOpen: true,
        onAccept: jest.fn(),
        onClose: jest.fn(),
        title: "The title",
        labels: {
          closeButton: "Close",
          acceptButton: "Accept",
        }
      }

      // Act
      render(<ConfirmationDialogComponent {...props} />);
      const dialog = screen.getByRole('dialog');
      const closeButton = within(dialog).getByRole('button', {name: props.labels.closeButton})

      // Assert
      expect(closeButton).toBeInTheDocument();
    });
    it('should display the content specified inside component', () => {
      // Arrange
      const props = {
        isOpen: true,
        onAccept: jest.fn(),
        onClose: jest.fn(),
        title: 'The title',
        labels: {
          closeButton: 'Close',
          acceptButton: 'Accept',
        },
      };
      const content = 'The content';

      // Act
      render(
        <ConfirmationDialogComponent {...props}>
          {content}
        </ConfirmationDialogComponent>
      );
      const dialog = screen.getByRole('dialog');
      const contentDisplayed = within(dialog).getByText(content)

      // Assert
      expect(contentDisplayed).toBeInTheDocument();
    });
  });

  describe('events', () => {
    it('should call onAccept when click in acceptButton', () => {
      // Arrange
      const props = {
        isOpen: true,
        onAccept: jest.fn(),
        onClose: jest.fn(),
        title: "The title",
        labels: {
          closeButton: "Close",
          acceptButton: "Accept",
        }
      }

      // Act
      render(<ConfirmationDialogComponent {...props} />);
      const dialog = screen.getByRole('dialog');
      const acceptButton = within(dialog).getByRole('button', {name: props.labels.acceptButton})
      userEvent.click(acceptButton)

      // Assert
      expect(props.onAccept).toHaveBeenCalled();
    });
    it('should call onClose when click in closeButton', () => {
      // Arrange
      const props = {
        isOpen: true,
        onAccept: jest.fn(),
        onClose: jest.fn(),
        title: "The title",
        labels: {
          closeButton: "Close",
          acceptButton: "Accept",
        }
      }

      // Act
      render(<ConfirmationDialogComponent {...props} />);
      const dialog = screen.getByRole('dialog');
      const closeButton = within(dialog).getByRole('button', {name: props.labels.closeButton})
      userEvent.click(closeButton)

      // Assert
      expect(props.onClose).toHaveBeenCalled();
    });
  });
});
