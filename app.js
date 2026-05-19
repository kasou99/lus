const locations = [
  { name: "広島県福山市常石", lat: 34.3867, lon: 133.3879 },
  { name: "広島県福山市", lat: 34.4859, lon: 133.3623 },
  { name: "広島県尾道市", lat: 34.4089, lon: 133.2050 },
  { name: "広島県三原市", lat: 34.3974, lon: 133.0786 },
  { name: "広島県府中市", lat: 34.5683, lon: 133.2366 },
  { name: "広島県広島市", lat: 34.3853, lon: 132.4553 },
  { name: "岡山県笠岡市", lat: 34.5072, lon: 133.5072 },
  { name: "岡山県倉敷市", lat: 34.5850, lon: 133.7722 },
  { name: "岡山県岡山市", lat: 34.6551, lon: 133.9195 },
  { name: "愛媛県今治市", lat: 34.0660, lon: 132.9978 },
  { name: "香川県高松市", lat: 34.3428, lon: 134.0466 },
  { name: "大阪府大阪市", lat: 34.6937, lon: 135.5023 },
  { name: "愛知県名古屋市", lat: 35.1815, lon: 136.9066 },
  { name: "東京都千代田区", lat: 35.6812, lon: 139.7671 },
  { name: "福岡県福岡市", lat: 33.5902, lon: 130.4017 }
];

const weatherCodes = {
  0: "快晴",
  1: "晴れ",
  2: "一部くもり",
  3: "くもり",
  45: "霧",
  48: "霧",
  51: "弱い霧雨",
  53: "霧雨",
  55: "強い霧雨",
  61: "小雨",
  63: "雨",
  65: "強い雨",
  71: "小雪",
  73: "雪",
  75: "強い雪",
  80: "にわか雨",
  81: "強いにわか雨",
  82: "激しいにわか雨",
  95: "雷雨"
};

const eventTypeLabels = {
  repair: "修理",
  inspection: "点検",
  estimate: "見積",
  contact: "連絡",
  move: "移動"
};

const state = {
  events: loadEvents(),
  selectedDate: formatDate(new Date()),
  locationIndex: Number(localStorage.getItem("lus-location-index") || 0),
  syncUrl: localStorage.getItem("lus-sync-url") || "",
  weather: null
};

const el = {
  todayLabel: document.querySelector("#todayLabel"),
  locationSelect: document.querySelector("#locationSelect"),
  locationName: document.querySelector("#locationName"),
  currentTemp: document.querySelector("#currentTemp"),
  weatherSummary: document.querySelector("#weatherSummary"),
  maxTemp: document.querySelector("#maxTemp"),
  minTemp: document.querySelector("#minTemp"),
  humidity: document.querySelector("#humidity"),
  rainChance: document.querySelector("#rainChance"),
  windSpeed: document.querySelector("#windSpeed"),
  heatAlert: document.querySelector("#heatAlert"),
  forecastStrip: document.querySelector("#forecastStrip"),
  months: document.querySelector("#months"),
  agendaList: document.querySelector("#agendaList"),
  selectedDateTitle: document.querySelector("#selectedDateTitle"),
  selectedEvents: document.querySelector("#selectedEvents"),
  eventForm: document.querySelector("#eventForm"),
  eventTime: document.querySelector("#eventTime"),
  eventType: document.querySelector("#eventType"),
  eventTitle: document.querySelector("#eventTitle"),
  eventMemo: document.querySelector("#eventMemo"),
  goTodayButton: document.querySelector("#goTodayButton"),
  syncUrl: document.querySelector("#syncUrl"),
  saveSyncUrl: document.querySelector("#saveSyncUrl"),
  pullEvents: document.querySelector("#pullEvents"),
  pushEvents: document.querySelector("#pushEvents"),
  syncStatus: document.querySelector("#syncStatus"),
  promptOutput: document.querySelector("#promptOutput")
};

init();

function init() {
  el.todayLabel.textContent = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short"
  }).format(new Date());

  renderLocationOptions();
  renderCalendar();
  renderSelectedDate();
  renderAgenda();
  renderSyncStatus();
  bindEvents();
  fetchWeather();
}

function bindEvents() {
  el.locationSelect.addEventListener("change", () => {
    state.locationIndex = Number(el.locationSelect.value);
    localStorage.setItem("lus-location-index", String(state.locationIndex));
    fetchWeather();
  });

  el.goTodayButton.addEventListener("click", () => {
    state.selectedDate = formatDate(new Date());
    renderCalendar();
    renderSelectedDate();
  });

  el.eventForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const now = new Date().toISOString();
    const item = {
      id: String(Date.now()),
      date: state.selectedDate,
      time: el.eventTime.value,
      type: el.eventType.value,
      title: el.eventTitle.value.trim(),
      memo: el.eventMemo.value.trim(),
      createdAt: now,
      updatedAt: now
    };
    if (!item.title) return;
    state.events.push(item);
    saveEvents();
    renderSyncStatus("この端末に保存しました。同期するにはGoogle Sheetsの保存も押してください。");
    el.eventForm.reset();
    el.eventType.value = "repair";
    renderCalendar();
    renderAgenda();
    renderSelectedDate();
  });

  el.saveSyncUrl.addEventListener("click", () => {
    state.syncUrl = el.syncUrl.value.trim();
    localStorage.setItem("lus-sync-url", state.syncUrl);
    renderSyncStatus(state.syncUrl ? "同期URLをこの端末に保存しました。" : "同期URLを削除しました。");
  });

  el.pullEvents.addEventListener("click", pullEventsFromSheet);
  el.pushEvents.addEventListener("click", pushEventsToSheet);

  document.querySelectorAll("[data-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      el.promptOutput.value = buildPrompt(button.dataset.prompt);
      el.promptOutput.focus();
      el.promptOutput.select();
    });
  });
}

function renderLocationOptions() {
  el.locationSelect.innerHTML = locations
    .map((location, index) => `<option value="${index}">${location.name}</option>`)
    .join("");
  el.locationSelect.value = String(state.locationIndex);
}

async function fetchWeather() {
  const location = locations[state.locationIndex] || locations[0];
  el.locationName.textContent = location.name;
  el.weatherSummary.textContent = "天気を取得しています";

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.search = new URLSearchParams({
    latitude: location.lat,
    longitude: location.lon,
    timezone: "Asia/Tokyo",
    current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code",
    forecast_days: "7"
  }).toString();

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("weather response error");
    const data = await response.json();
    state.weather = data;
    renderWeather(data);
  } catch (error) {
    el.weatherSummary.textContent = "天気を取得できませんでした";
    el.heatAlert.className = "alert-band warning";
    el.heatAlert.innerHTML = "<span>通信</span><strong>未取得</strong><p>ネット接続を確認してから再読み込みしてください。</p>";
  }
}

function renderWeather(data) {
  const current = data.current;
  const daily = data.daily;
  const currentTemp = Math.round(current.temperature_2m);
  const humidity = Math.round(current.relative_humidity_2m);
  const rain = daily.precipitation_probability_max[0] ?? 0;
  const windMs = (current.wind_speed_10m / 3.6).toFixed(1);

  el.currentTemp.textContent = `${currentTemp}℃`;
  el.weatherSummary.textContent = weatherCodes[current.weather_code] || "天気";
  el.maxTemp.textContent = `${Math.round(daily.temperature_2m_max[0])}℃`;
  el.minTemp.textContent = `${Math.round(daily.temperature_2m_min[0])}℃`;
  el.humidity.textContent = `${humidity}%`;
  el.rainChance.textContent = `${rain}%`;
  el.windSpeed.textContent = `${windMs}m/s`;

  renderHeatAlert(currentTemp, humidity);
  renderForecast(daily);
}

function renderHeatAlert(temp, humidity) {
  const heatScore = temp + humidity * 0.08;
  let level = "低";
  let className = "alert-band";
  let message = "通常の現場対応でOK。移動前に水分だけ確認。";

  if (heatScore >= 37 || temp >= 35) {
    level = "危険";
    className = "alert-band danger";
    message = "屋外作業と制御盤内の熱にかなり注意。作業を短い時間で区切る。";
  } else if (heatScore >= 34 || temp >= 31) {
    level = "高";
    className = "alert-band warning";
    message = "午後の現場、エアコンなし工場、制御盤、電装部品まわりは熱トラブルに注意。";
  } else if (heatScore >= 30 || temp >= 28) {
    level = "中";
    className = "alert-band warning";
    message = "長時間作業は水分と風通しを確認。制御盤ファンの状態も見たい日。";
  }

  el.heatAlert.className = className;
  el.heatAlert.innerHTML = `<span>暑さ注意</span><strong>${level}</strong><p>${message}</p>`;
}

function renderForecast(daily) {
  el.forecastStrip.innerHTML = daily.time
    .map((date, index) => {
      const label = new Intl.DateTimeFormat("ja-JP", {
        month: "numeric",
        day: "numeric",
        weekday: "short"
      }).format(new Date(`${date}T00:00:00`));
      const max = Math.round(daily.temperature_2m_max[index]);
      const min = Math.round(daily.temperature_2m_min[index]);
      const rain = daily.precipitation_probability_max[index] ?? 0;
      return `<div class="forecast-day"><span>${label}</span><strong>${max}/${min}℃</strong><span>降水 ${rain}%</span></div>`;
    })
    .join("");
}

function renderCalendar() {
  const start = new Date();
  start.setDate(1);
  el.months.innerHTML = "";

  for (let offset = 0; offset < 3; offset += 1) {
    const monthDate = new Date(start.getFullYear(), start.getMonth() + offset, 1);
    el.months.appendChild(createMonth(monthDate));
  }
}

function createMonth(monthDate) {
  const month = document.createElement("article");
  month.className = "month";

  const title = document.createElement("div");
  title.className = "month-title";
  title.textContent = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long"
  }).format(monthDate);

  const weekdays = document.createElement("div");
  weekdays.className = "weekdays";
  weekdays.innerHTML = ["日", "月", "火", "水", "木", "金", "土"]
    .map((day) => `<span>${day}</span>`)
    .join("");

  const days = document.createElement("div");
  days.className = "days";
  const firstDay = monthDate.getDay();
  const lastDate = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();

  for (let i = 0; i < firstDay; i += 1) {
    const blank = document.createElement("button");
    blank.className = "day blank";
    blank.type = "button";
    blank.disabled = true;
    days.appendChild(blank);
  }

  for (let day = 1; day <= lastDate; day += 1) {
    const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
    const dateKey = formatDate(date);
    const button = document.createElement("button");
    const events = getEventsForDate(dateKey);
    button.type = "button";
    button.className = [
      "day",
      dateKey === formatDate(new Date()) ? "today" : "",
      dateKey === state.selectedDate ? "selected" : ""
    ].join(" ");
    button.innerHTML = `<span>${day}</span>${renderDots(events)}`;
    button.addEventListener("click", () => {
      state.selectedDate = dateKey;
      renderCalendar();
      renderSelectedDate();
      document.querySelector(".day-editor").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    days.appendChild(button);
  }

  month.append(title, weekdays, days);
  return month;
}

function renderDots(events) {
  if (!events.length) return "";
  const dots = events
    .slice(0, 4)
    .map((event) => `<span class="dot ${event.type}"></span>`)
    .join("");
  return `<span class="event-dots">${dots}</span>`;
}

function renderAgenda() {
  const today = new Date(formatDate(new Date()));
  const limit = new Date(today);
  limit.setDate(today.getDate() + 14);

  const upcoming = state.events
    .filter((event) => {
      const date = new Date(`${event.date}T00:00:00`);
      return date >= today && date <= limit;
    })
    .sort(sortEvents);

  if (!upcoming.length) {
    el.agendaList.innerHTML = `<div class="empty-note">向こう14日の予定はまだありません。</div>`;
    return;
  }

  el.agendaList.innerHTML = upcoming.map(renderEventItem).join("");
}

function renderSelectedDate() {
  el.selectedDateTitle.textContent = formatDisplayDate(state.selectedDate);
  const events = getEventsForDate(state.selectedDate).sort(sortEvents);
  if (!events.length) {
    el.selectedEvents.innerHTML = `<div class="empty-note">この日の予定はまだありません。</div>`;
    return;
  }
  el.selectedEvents.innerHTML = events.map((event) => renderEventItem(event, true)).join("");
  el.selectedEvents.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      state.events = state.events.filter((event) => event.id !== button.dataset.delete);
      saveEvents();
      renderSyncStatus("この端末から削除しました。同期先にも反映するにはGoogle Sheetsの保存を押してください。");
      renderCalendar();
      renderAgenda();
      renderSelectedDate();
    });
  });
}

function renderEventItem(event, withDelete = false) {
  const time = event.time ? `${event.time} ` : "";
  const date = formatDisplayDate(event.date, true);
  const label = eventTypeLabels[event.type] || "予定";
  return `
    <article class="event-item ${event.type}">
      <span>${date} ${time}${label}</span>
      <strong>${escapeHtml(event.title)}</strong>
      ${event.memo ? `<p>${escapeHtml(event.memo)}</p>` : ""}
      ${withDelete ? `<button class="delete-event" type="button" data-delete="${event.id}">削除</button>` : ""}
    </article>
  `;
}

function renderSyncStatus(message) {
  if (el.syncUrl) {
    el.syncUrl.value = state.syncUrl;
  }
  if (!el.syncStatus) return;
  if (message) {
    el.syncStatus.textContent = message;
    return;
  }
  el.syncStatus.textContent = state.syncUrl
    ? "同期URLあり。保存でSheetsへ送信、読み込みでSheetsから取得します。"
    : "Apps Script URLを入れると、iPhone・PC間で予定を同期できます。";
}

async function pullEventsFromSheet() {
  state.syncUrl = el.syncUrl.value.trim() || state.syncUrl;
  if (!state.syncUrl) {
    renderSyncStatus("先にApps Script URLを入れてください。");
    return;
  }

  renderSyncStatus("Google Sheetsから読み込み中です...");
  try {
    const response = await fetch(`${state.syncUrl}?action=getEvents&ts=${Date.now()}`);
    if (!response.ok) throw new Error("sync response error");
    const data = await response.json();
    if (!data.ok) throw new Error(data.error || "sync data error");
    state.events = normalizeEvents(data.events || []);
    saveEvents();
    localStorage.setItem("lus-sync-url", state.syncUrl);
    renderCalendar();
    renderAgenda();
    renderSelectedDate();
    renderSyncStatus(`${state.events.length}件の予定を読み込みました。`);
  } catch (error) {
    renderSyncStatus("読み込みできませんでした。Apps Scriptの公開設定とURLを確認してください。");
  }
}

async function pushEventsToSheet() {
  state.syncUrl = el.syncUrl.value.trim() || state.syncUrl;
  if (!state.syncUrl) {
    renderSyncStatus("先にApps Script URLを入れてください。");
    return;
  }

  renderSyncStatus("Google Sheetsへ保存中です...");
  try {
    const response = await fetch(state.syncUrl, {
      method: "POST",
      body: JSON.stringify({ action: "syncEvents", events: normalizeEvents(state.events) })
    });
    if (!response.ok) throw new Error("sync response error");
    const data = await response.json();
    if (!data.ok) throw new Error(data.error || "sync data error");
    localStorage.setItem("lus-sync-url", state.syncUrl);
    renderSyncStatus(`${state.events.length}件の予定をGoogle Sheetsに保存しました。`);
  } catch (error) {
    renderSyncStatus("保存できませんでした。Apps Scriptの公開設定とURLを確認してください。");
  }
}

function normalizeEvents(events) {
  return events
    .filter((event) => event && event.date && event.title)
    .map((event) => ({
      id: String(event.id || Date.now()),
      date: String(event.date || ""),
      time: String(event.time || ""),
      type: eventTypeLabels[event.type] ? event.type : "repair",
      title: String(event.title || ""),
      memo: String(event.memo || ""),
      createdAt: String(event.createdAt || ""),
      updatedAt: String(event.updatedAt || new Date().toISOString())
    }))
    .sort(sortEvents);
}

function getEventsForDate(dateKey) {
  return state.events.filter((event) => event.date === dateKey);
}

function sortEvents(a, b) {
  return `${a.date} ${a.time || "99:99"}`.localeCompare(`${b.date} ${b.time || "99:99"}`);
}

function buildPrompt(type) {
  const location = locations[state.locationIndex]?.name || "自分の地域";
  const temp = el.currentTemp.textContent;
  const humidity = el.humidity.textContent;
  const weather = el.weatherSummary.textContent;

  const prompts = {
    weather: `工作機械修理業者として、X向けの自然な投稿文を3案作ってください。地域は${location}、天気は${weather}、気温は${temp}、湿度は${humidity}です。工場内の暑さ、制御盤、電装部品、作業者の休憩に触れて、営業っぽすぎない文章にしてください。`,
    news: "製造業、工作機械、設備保全、工場の暑さ対策に関する今日の話題を、工作機械修理業者の営業ネタとして使える形で5つに整理してください。X投稿案もそれぞれ1つずつください。",
    case: "次の修理事例を、お客さんに伝わる説明文とX投稿文に変換してください。専門用語は必要最低限にして、点検提案につながる内容にしてください。\n\n修理事例:\n- 機械:\n- 症状:\n- 原因:\n- 処置:\n- 次回提案:"
  };

  return prompts[type] || "";
}

function loadEvents() {
  try {
    return JSON.parse(localStorage.getItem("lus-events") || "[]");
  } catch (error) {
    return [];
  }
}

function saveEvents() {
  localStorage.setItem("lus-events", JSON.stringify(state.events));
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateKey, short = false) {
  const date = new Date(`${dateKey}T00:00:00`);
  return new Intl.DateTimeFormat("ja-JP", {
    month: short ? "numeric" : "long",
    day: "numeric",
    weekday: "short"
  }).format(date);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return map[char];
  });
}
