import { Platform } from "react-native";
const DOMAIN = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const API_BASE_URL = `http://${DOMAIN}:4000`;

export const request = async <ResponseData>(
  path: string,
  options?: RequestInit
): Promise<ResponseData> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(error?.message ?? "API request failed");
  }

  if (response.status === 204) {
    return undefined as ResponseData;
  }

  return response.json() as Promise<ResponseData>;
};