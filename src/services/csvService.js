import fs from "fs";
import csv from "csv-parser";

const parseCSV = (filePath, list) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        const properties = {};
        for (let prop of list.properties) {
          properties[prop.title] = data[prop.title] || prop.fallback;
        }
        results.push({ name: data.name, email: data.email, properties });
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

export default parseCSV;
