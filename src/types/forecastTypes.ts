import { LabelLocation } from "./weatherTypes";

export interface ForecastData {
    label_location: LabelLocation | null;
    area: string;
    forecast: string;
}

export interface ForecastPeriod{
    start?: string;
    end?: string;
}