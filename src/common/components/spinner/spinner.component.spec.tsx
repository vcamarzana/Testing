import React from 'react';
import { render, screen } from '@testing-library/react';
import * as trackerHook from 'react-promise-tracker/lib/trackerHook';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent specs', () => {
  it('should render with loader when promiseInProgress is true', () => {
    jest
      .spyOn(trackerHook, 'usePromiseTracker')
      .mockReturnValue({ promiseInProgress: true });

    render(<SpinnerComponent />);

    const spinner = screen.getByRole('presentation');

    expect(spinner).toBeInTheDocument();
  });

  it('should not render when promiseInProgress is false', () => {
    jest
      .spyOn(trackerHook, 'usePromiseTracker')
      .mockReturnValue({ promiseInProgress: false });

    render(<SpinnerComponent />);

    const spinner = screen.queryByRole('presentation');

    expect(spinner).not.toBeInTheDocument();
  });
});
