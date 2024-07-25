export interface LabelLocation {
    latitude: number;
    longitude: number;
  }
  
  export interface AreaMetadata {
    name: string;
    label_location: LabelLocation;
  }
  
  export interface Forecast {
    area: string;
    forecast: string;
  }
  
  export interface Item {
    update_timestamp: string;
    timestamp: string;
    valid_period: {
      start: string;
      end: string;
    };
    forecasts: Forecast[];
  }
  
  export interface WeatherResponse {
    api_info: {
      status: string;
    };
    area_metadata: AreaMetadata[];
    items: Item[];
  }
  