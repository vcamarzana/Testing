import React from 'react';
import { render, screen } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import userEvent from '@testing-library/user-event';

describe('ConfirmationDialogComponent', () => {
  const props = {
    isOpen: true,
    onAccept: jest.fn(),
    onClose: jest.fn(),
    title: 'test title',
    labels: {
      closeButton: 'test closeButton',
      acceptButton: 'test acceptButton',
    },
    children: 'test children',
  };

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  it('should not render if isOpen is false', () => {
    //Arrange
    const newProps = {
      ...props,
      isOpen: false,
    };

    //Act
    render(<ConfirmationDialogComponent {...newProps} />);
    const confirmationDialog = screen.queryByRole('dialog');

    //Assert
    expect(confirmationDialog).not.toBeInTheDocument();
  });

  it('should renders correctly with provided props', () => {
    //Arrange

    //Act
    render(<ConfirmationDialogComponent {...props} />);
    const confirmationDialog = screen.queryByRole('dialog');
    const title = screen.getByText(props.title);
    const children = screen.getByText(props.children);
    const closeButton = screen.getByText(props.labels.closeButton);
    const acceptButton = screen.getByText(props.labels.acceptButton);

    //Assert
    expect(confirmationDialog).toBeInTheDocument;
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('test title');
    expect(children).toBeInTheDocument();
    expect(children).toHaveTextContent('test children');
    expect(closeButton).toBeInTheDocument();
    expect(acceptButton).toBeInTheDocument();
  });

  it('should calls onClose, but not onAccept when close button is clicked', async () => {
    //Arrange

    //Act
    render(<ConfirmationDialogComponent {...props} />);
    const closeButton = screen.getByText('test closeButton');
    await userEvent.click(closeButton);

    //Assert
    expect(props.onAccept).not.toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should calls onAccept and onClose when accept button is clicked', async () => {
    //Arrange

    //Act
    render(<ConfirmationDialogComponent {...props} />);
    const acceptButton = screen.getByText('test acceptButton');
    await userEvent.click(acceptButton);

    //Assert
    expect(props.onAccept).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });
});
