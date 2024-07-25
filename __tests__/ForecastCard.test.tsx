import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { icBookmark, icBookmarkActive } from '../src/assets/icons';
import ForecastCard from '../src/components/ForecastCard';

describe('ForecastCard', () => {
  const mockProps = {
    area: 'Test Area',
    forecast: 'Sunny',
    latitude: 1.3521,
    longitude: 103.8198,
    isFavourite: false,
    onToggleFavourite: jest.fn(),
  };

  it('renders correctly with given props', () => {
    const { getByText, getByTestId } = render(<ForecastCard {...mockProps} />);

    expect(getByText('Test Area')).toBeTruthy();
    expect(getByText('Sunny')).toBeTruthy();
    expect(getByText('latitude: 1.3521')).toBeTruthy();
    expect(getByText('longitude: 103.8198')).toBeTruthy();
    expect(getByTestId('bookmark-icon')).toHaveProperty('props.source', icBookmark);
  });

  it('calls onToggleFavourite when bookmark is pressed', () => {
    const { getByTestId } = render(<ForecastCard {...mockProps} />);
    const bookmarkIcon = getByTestId('bookmark-icon');

    fireEvent.press(bookmarkIcon);

    expect(mockProps.onToggleFavourite).toHaveBeenCalled();
  });

  it('displays the active bookmark icon when isFavourite is true', () => {
    const { getByTestId, rerender } = render(
      <ForecastCard {...mockProps} isFavourite={true} />
    );

    expect(getByTestId('bookmark-icon')).toHaveProperty('props.source', icBookmarkActive);

    rerender(<ForecastCard {...mockProps} isFavourite={false} />);

    expect(getByTestId('bookmark-icon')).toHaveProperty('props.source', icBookmark);
  });
});
