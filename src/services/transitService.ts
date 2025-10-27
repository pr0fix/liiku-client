import axios, { AxiosError } from "axios";
import { API_URL } from "../utils/constants";
import type { BusPosition } from "../utils/types";

export const fetchTransitData = async (): Promise<BusPosition[]> => {
  // fetch with cookie or token check and limit the API
  try {
    const response = await axios.get(`${API_URL}/transit-data`);
    const buses = (response.data.entity || []).map((item: any) => ({
      id: item.id,
      latitude: item.vehicle?.position?.latitude,
      longitude: item.vehicle?.position?.longitude,
      bearing: item.vehicle?.position?.bearing,
      speed: item.vehicle?.position?.speed,
      status: item.vehicle?.currentStatus,
    }));
    return buses;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error:", error.message);
    } else {
      console.log("Error: ", error);
    }
    return [];
  }
};
