// code/line-calendar.js
// 「今日の予定教えて」に応答する最小サンプル（表示用）
// ※ 実運用では Google Apps Script (GAS) で UrlFetchApp などを使用して
//   LINE Messaging API と連携します。ここでは“構造の見本”として記載。

function doPost(e) {
  const json = JSON.parse(e.postData.contents);
  const message = json.events[0].message.text;
  const replyToken = json.events[0].replyToken;

  const replyText = handleMessage_(message);
  replyToLine_(replyToken, replyText);
}

function handleMessage_(text) {
  if (text.includes("今日の予定")) {
    return getTodayEvents_();
  } else if (text.includes("明日")) {
    return getTomorrowEvents_();
  } else {
    return "こんにちは。ご用件をどうぞ。\n例）今日の予定教えて";
  }
}

function getTodayEvents_() {
  const cal = CalendarApp.getDefaultCalendar();
  const events = cal.getEventsForDay(new Date());
  if (events.length === 0) return "今日は予定がありません。";
  return events.map(e => "・" + e.getTitle()).join("\n");
}

function getTomorrowEvents_() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const cal = CalendarApp.getDefaultCalendar();
  const events = cal.getEventsForDay(d);
  if (events.length === 0) return "明日の予定はありません。";
  return events.map(e => "・" + e.getTitle()).join("\n");
}

// 実運用では LINE のチャネルアクセストークンを使用して返信します。
// ここでは構造例のみ。
function replyToLine_(replyToken, text) {
  // UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", { ... })
  Logger.log("[reply]", text);
}
