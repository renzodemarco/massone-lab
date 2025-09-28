import { getLastReportNumber } from "../services/reports";

export default async function getNextReportNumber() {
  try {
    const last = await getLastReportNumber();
    return String(parseInt(last, 10) + 1).padStart(5, "0");
  } catch (err) {
    console.error(err);
    return "00001"
  }
}