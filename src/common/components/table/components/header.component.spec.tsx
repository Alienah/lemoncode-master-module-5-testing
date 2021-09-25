import * as React from 'react';
import { HeaderGroup } from 'react-table';
import { render } from '@testing-library/react';
import { HeaderComponent } from './header.component';

describe('common/table/HeaderComponent', () => {
  it('should be rendered as expected passing required properties', () => {
    // Arrange
    const props = {
      headerGroups: ([
        {
          getHeaderGroupProps: jest.fn().mockReturnValue({
            key: Math.floor(Math.random() * 999999),
            role: "row"
          }),
          headers: [
            {
              getHeaderProps: jest.fn().mockReturnValue({
                key: Math.floor(Math.random() * 999999),
                role: "columnheader"
              }),
              render: jest.fn().mockReturnValue('Test label'),
            },
          ],
        },
      ] as unknown) as HeaderGroup[],
    };
    const table = document.createElement('table');
    document.body.appendChild(table);

    // Act
    const { getByText } = render(<HeaderComponent {...props} />, { container: table });

    // Assert
    expect(getByText('Test label')).toBeInTheDocument();
  });

  it('should render two columns passing two columns', () => {
    // Arrange
    const props = {
      headerGroups: ([
        {
          getHeaderGroupProps: jest.fn().mockReturnValue({
            key: Math.floor(Math.random() * 999999),
            role: "row"
          }),
          headers: [
            {
              getHeaderProps: jest.fn().mockReturnValue({
                key: Math.floor(Math.random() * 999999),
                role: "columnheader"
              }),
              render: jest.fn().mockReturnValue('Test label 1'),
            },
          ],
        },
        {
          getHeaderGroupProps: jest.fn().mockReturnValue({
            key: Math.floor(Math.random() * 999999),
            role: "row"
          }),
          headers: [
            {
              getHeaderProps: jest.fn().mockReturnValue({
                key: Math.floor(Math.random() * 999999),
                role: "columnheader"
              }),
              render: jest.fn().mockReturnValue('Test label 2'),
            },
          ],
        },
      ] as unknown) as HeaderGroup[],
    };
    const table = document.createElement('table');
    document.body.appendChild(table);

    // Act
    const { getByText } = render(<HeaderComponent {...props} />, { container: table });

    // Assert
    expect(getByText('Test label 1')).toBeInTheDocument();
    expect(getByText('Test label 2')).toBeInTheDocument();
  });
});
