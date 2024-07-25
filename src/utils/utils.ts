import { ForecastPeriod } from "../types/forecastTypes";
import moment from 'moment-timezone';

/**
 * This function takes in latitude and longitude of two locations
 * and returns the distance between them as the crow flies (in km).
 * 
 * @param lat1 - Latitude of the first location
 * @param lon1 - Longitude of the first location
 * @param lat2 - Latitude of the second location
 * @param lon2 - Longitude of the second location
 * @returns The distance between the two locations in kilometers
 */
export function calcCrow(lat1?: number, lon1?: number, lat2?: number, lon2?: number): number {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const radLat1 = toRad(lat1);
  const radLat2 = toRad(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radLat1) * Math.cos(radLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

/**
 * Converts numeric degrees to radians.
 * 
 * @param value - The degree value to convert
 * @returns The value in radians
 */
function toRad(value: number): number {
  return value * Math.PI / 180;
}

export function formatValidPeriod(validPeriod: ForecastPeriod) {
  const { start, end } = validPeriod;

  // Define timezone (assuming the input timezone is +08:00)
  const timeZone = 'Asia/Singapore';

  // Parse the ISO strings to moment objects in the specified timezone
  const startMoment = moment.tz(start, timeZone);
  const endMoment = moment.tz(end, timeZone);

  // Format the dates
  const formatDate = (date: moment.Moment): string => {
    return date.format(' DD/MM/YY HH:mm ');
  };

  const startFormatted = formatDate(startMoment);
  const endFormatted = formatDate(endMoment);

  return `${startFormatted} to ${endFormatted}`;
}