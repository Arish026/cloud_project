
import { ZakatCalculation } from "../types";

// The base URL for your EC2-hosted backend
const API_BASE_URL = "/api"; 

export const saveCalculationToDb = async (calculation: ZakatCalculation) => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(calculation),
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to persist calculation to RDS:", error);
    return null;
  }
};

export const fetchHistoryFromDb = async (): Promise<ZakatCalculation[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculations`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch history from RDS:", error);
    return [];
  }
};
