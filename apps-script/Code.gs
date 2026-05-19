const SPREADSHEET_ID = "1P9p70g7GOFgJJ6bhSjicx-k3BM6TTHkfCGGzScl0N7I";
const EVENTS_SHEET = "予定";
const EVENT_HEADERS = ["id", "date", "time", "type", "title", "memo", "createdAt", "updatedAt"];

function doGet(e) {
  const action = e && e.parameter && e.parameter.action;
  if (action === "getEvents" || !action) {
    return jsonResponse({ ok: true, events: readEvents_() });
  }
  return jsonResponse({ ok: false, error: "unknown action" });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    if (body.action === "syncEvents") {
      writeEvents_(body.events || []);
      return jsonResponse({ ok: true, count: (body.events || []).length });
    }
    if (body.action === "getEvents") {
      return jsonResponse({ ok: true, events: readEvents_() });
    }
    return jsonResponse({ ok: false, error: "unknown action" });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function readEvents_() {
  const sheet = getSheet_(EVENTS_SHEET, EVENT_HEADERS);
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  const headers = values[0];
  return values.slice(1)
    .filter(row => row.some(value => value !== ""))
    .map(row => {
      const item = {};
      headers.forEach((header, index) => {
        item[header] = row[index] instanceof Date
          ? Utilities.formatDate(row[index], "Asia/Tokyo", "yyyy-MM-dd")
          : String(row[index] || "");
      });
      return item;
    });
}

function writeEvents_(events) {
  const sheet = getSheet_(EVENTS_SHEET, EVENT_HEADERS);
  sheet.clearContents();
  sheet.getRange(1, 1, 1, EVENT_HEADERS.length).setValues([EVENT_HEADERS]);
  if (!events.length) return;

  const rows = events.map(event => EVENT_HEADERS.map(header => String(event[header] || "")));
  sheet.getRange(2, 1, rows.length, EVENT_HEADERS.length).setValues(rows);
}

function getSheet_(name, headers) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) sheet = spreadsheet.insertSheet(name);
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeaders = headers.every((header, index) => firstRow[index] === header);
  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return sheet;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
