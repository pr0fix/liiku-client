import axios, { AxiosError } from "axios";
import { API_URL } from "../utils/constants";
import {
  type ApiResponse,
  type TransitDataResult,
  type Vehicle,
} from "../utils/types";

export const fetchTransitData = async (): Promise<TransitDataResult> => {
  // IMPLEMENT: fetch with cookie or token and then check and limit the API access
  try {
    const response = await axios.get<ApiResponse<Vehicle[]>>(
      `${API_URL}/transit`
    );

    if (!response.data.success) {
      console.error(
        "Server error:",
        response.data.message || response.data.error
      );
      return {
        vehicles: [],
        error:
          response.data.message ||
          response.data.error ||
          "Unknown error occurred",
      };
    }

    const vehicles = (response.data.data || []).map((item: Vehicle) => ({
      vehicleId: item.vehicleId,
      timestamp: item.timestamp,
      stopName: item.stopName,
      stopId: item.stopId,
      startTime: item.startTime,
      speed: item.speed,
      routeDesc: item.routeDesc,
      routeName: item.routeName,
      routeLongName: item.routeLongName,
      routeId: item.routeId,
      occupancyStatus: item.occupancyStatus,
      latitude: item.latitude,
      longitude: item.longitude,
      headsign: item.headsign,
      directionId: item.directionId,
      currentStatus: item.currentStatus,
      bearing: item.bearing,
    }));

    return { vehicles };
  } catch (error) {
    let errorMessage = "Failed to fetch transit data";

    if (error instanceof AxiosError) {
      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response from server. Check your connection.";
      } else {
        errorMessage = error.message;
      }
      console.error("API Error:", errorMessage);
    } else {
      console.error("Unexpected error:", error);
    }

    return { vehicles: [], error: errorMessage };
  }
};
