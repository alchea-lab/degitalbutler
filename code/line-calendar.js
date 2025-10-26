function doPost(e) {
  const json = JSON.parse(e.postData.contents);
  const message = json.events[0].message.text;
  const replyToken = json.events[0].replyToken;

  let replyText = handleMessage(message);
  replyToLine(replyToken, replyText);
}

function handleMessage(text) {
  if (text.includes("今日の予定")) {
    return getTodayEvents();
  } else if (text.includes("明日")) {
    return getTomorrowEvents();
  } else {
    return "こんにちは。ご用件をどうぞ。";
  }
}

function getTodayEvents() {
  const calendar = CalendarApp.getDefaultCalendar();
  const events = calendar.getEventsForDay(new Date());
  if (events.length === 0) return "今日は予定がありません。";
  return events.map(e => "・" + e.getTitle()).join("\\n");
}
