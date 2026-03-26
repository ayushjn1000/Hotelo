import * as XLSX from "xlsx";
import { parseSheet } from "../utils/parseExcel";

export default function FileUpload({ setHotels }) {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      let allHotels = [];

      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const parsed = parseSheet(json, sheetName);
        allHotels = [...allHotels, ...parsed];
      });

      setHotels(allHotels);
    };

    reader.readAsArrayBuffer(file);
  };

  return <input type="file" accept=".xlsx" onChange={handleUpload} />;
}