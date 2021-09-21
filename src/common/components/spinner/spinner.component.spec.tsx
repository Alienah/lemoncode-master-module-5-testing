import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePromiseTracker } from 'react-promise-tracker';
import { SpinnerComponent } from './spinner.component';

jest.mock('react-promise-tracker', () => {
  const original = jest.requireActual('react-promise-tracker');
  return {
      ...original,
      usePromiseTracker: jest.fn()
  };
});
const mockUsePromiseTracker = usePromiseTracker as jest.MockedFunction<typeof usePromiseTracker>

describe('common/components/SpinnerComponent', () => {
  afterEach(() => {
    jest.resetModules();
  })

  it('should render an empty component when promiseInProgress is false', () => {
    // Arrange
    mockUsePromiseTracker.mockImplementation(() => ({ promiseInProgress: false }));

    // Act
    const {baseElement} = render(<SpinnerComponent />);
    const modal = screen.queryByRole('presentation')

    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(modal).not.toBeInTheDocument();
  });
  it('should render a modal with loader when promiseInProgress is true', () => {
    // Arrange
    mockUsePromiseTracker.mockImplementation(() => ({promiseInProgress: true}));

    // Act
    const {baseElement}= render(<SpinnerComponent />);
    const modal = screen.getByRole('presentation');
    const loader = screen.getByRole('img');
    const loaderContent = loader.querySelectorAll('span')[0];

    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(modal).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
    expect(loaderContent).toBeInTheDocument();
  });
});
