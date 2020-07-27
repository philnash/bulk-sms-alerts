const formidable = require("formidable");
const parse = require("csv-parse");

const csvParser = (req, fileName) => {
  return new Promise((resolve, reject) => {
    const form = formidable();
    const parser = parse({
      columns: true,
    });
    const records = [];
    const fields = {};
    parser.on("readable", () => {
      let record;
      while ((record = parser.read())) {
        records.push(record);
      }
    });
    parser.on("error", (error) => {
      reject(error);
    });
    parser.on("end", () => {
      resolve({ records, fields });
    });
    form.onPart = (part) => {
      if (part.name === fileName && part.mime === "text/csv") {
        part.on("data", (data) => {
          parser.write(data);
        });
      } else {
        form.handlePart(part);
      }
    };
    form.on("field", (name, value) => {
      fields[name] = value;
    });
    form.once("end", () => {
      parser.end();
    });
    form.parse(req);
  });
};

module.exports = csvParser;
