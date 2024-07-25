import React from 'react';
import { render } from '@testing-library/react-native';
import { icBookmarkMap } from '../src/assets/icons';
import WeatherMap from '../src/components/WeatherMap';
import { useAppSelector } from '../src/store';
import { ForecastData } from '../src/types/forecastTypes';

// Mocking useAppSelector
jest.mock('../src/store/index.tsx', () => ({
  useAppSelector: jest.fn(),
}));

const mockForecastList: ForecastData[] = [
  {
    area: 'Area 1',
    forecast: 'Sunny',
    label_location: {
      latitude: 1.3521,
      longitude: 103.8198,
    },
  },
  {
    area: 'Area 2',
    forecast: 'Rainy',
    label_location: {
      latitude: 1.3621,
      longitude: 103.8298,
    },
  },
];

const mockFavourite = ['Area 1'];
const mockLocation = {
  latitude: 1.3521,
  longitude: 103.8198,
};

describe('WeatherMap', () => {
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === require('../src/store/user/selector.tsx').favouriteSelector) {
        return mockFavourite;
      }
      if (selector === require('../src/store/user/selector.tsx').locationSelector) {
        return mockLocation;
      }
      return [];
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<WeatherMap forecastList={mockForecastList} />);
    expect(getByTestId('map-view')).toBeTruthy();
  });

  it('renders markers correctly', () => {
    const { getByTestId } = render(<WeatherMap forecastList={mockForecastList} />);

    const marker1 = getByTestId('marker-0');
    const marker2 = getByTestId('marker-1');

    expect(marker1.props.coordinate).toEqual(mockForecastList[0].label_location);
    expect(marker2.props.coordinate).toEqual(mockForecastList[1].label_location);
  });

  it('renders bookmark icon for favourite locations', () => {
    const { getByTestId, queryByTestId } = render(<WeatherMap forecastList={mockForecastList} />);

    const bookmarkIcon1 = getByTestId('bookmark-icon-0');
    const bookmarkIcon2 = queryByTestId('bookmark-icon-1');

    expect(bookmarkIcon1).toBeTruthy();
    expect(bookmarkIcon1.props.source).toEqual(icBookmarkMap);
    expect(bookmarkIcon2).toBeNull(); // Marker 2 should not have the bookmark icon
  });
});
