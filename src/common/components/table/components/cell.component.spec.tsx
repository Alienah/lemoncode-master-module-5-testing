import * as React from 'react';
import { render } from '@testing-library/react';
import { CellComponent } from './cell.component';

describe('common/table/CellComponent', () => {
  it('should render as expected passing required properties', () => {
    // Arrange
    const tr = document.createElement('tr');
    document.body.appendChild(tr);

    // Act
    const { getByText } = render(
      <CellComponent>
        <h1>Test content</h1>
      </CellComponent>,
      { container: tr }
    );

    // Assert
    expect(getByText('Test content')).toBeInTheDocument();
  });
});
