const locations = [
  { name: "Tokyo", lat: 35.6812, lon: 139.7671 },
  { name: "Osaka", lat: 34.6937, lon: 135.5023 },
  { name: "Nagoya", lat: 35.1815, lon: 136.9066 },
  { name: "Fukuoka", lat: 33.5902, lon: 130.4017 },
  { name: "Sapporo", lat: 43.0618, lon: 141.3545 },
  { name: "Sendai", lat: 38.2682, lon: 140.8694 },
  { name: "Niigata", lat: 37.9161, lon: 139.0364 },
  { name: "Kanazawa", lat: 36.5613, lon: 136.6562 },
  { name: "Hiroshima", lat: 34.3853, lon: 132.4553 },
  { name: "Takamatsu", lat: 34.3428, lon: 134.0466 },
  { name: "Naha", lat: 26.2124, lon: 127.6809 }
];

const weatherCodes = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Showers",
  81: "Heavy showers",
  82: "Violent showers",
  95: "Thunderstorm"
};

const eventTypeLabels = {
  repair: "Repair",
  inspection: "Inspection",
  estimate: "Estimate",
  contact: "Contact",
  move: "Move"
};

const state = {
  events: loadEvents(),
  selectedDate: formatDate(new Date()),
  locationIndex: Number(localStorage.getItem("lus-location-index") || 2),
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
    const item = {
      id: String(Date.now()),
      date: state.selectedDate,
      time: el.eventTime.value,
      type: el.eventType.value,
      title: el.eventTitle.value.trim(),
      memo: el.eventMemo.value.trim()
    };
    if (!item.title) return;
    state.events.push(item);
    saveEvents();
    el.eventForm.reset();
    el.eventType.value = "repair";
    renderCalendar();
    renderAgenda();
    renderSelectedDate();
  });

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
  el.weatherSummary.textContent = "Fetching weather";

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
    el.weatherSummary.textContent = "Weather fetch failed";
    el.heatAlert.className = "alert-band warning";
    el.heatAlert.innerHTML = "<span>Network</span><strong>Offline</strong><p>Reload after the internet connection is available.</p>";
  }
}

function renderWeather(data) {
  const current = data.current;
  const daily = data.daily;
  const currentTemp = Math.round(current.temperature_2m);
  const humidity = Math.round(current.relative_humidity_2m);
  const rain = daily.precipitation_probability_max[0] ?? 0;
  const windMs = (current.wind_speed_10m / 3.6).toFixed(1);

  el.currentTemp.textContent = `${currentTemp} C`;
  el.weatherSummary.textContent = weatherCodes[current.weather_code] || "Weather";
  el.maxTemp.textContent = `${Math.round(daily.temperature_2m_max[0])} C`;
  el.minTemp.textContent = `${Math.round(daily.temperature_2m_min[0])} C`;
  el.humidity.textContent = `${humidity}%`;
  el.rainChance.textContent = `${rain}%`;
  el.windSpeed.textContent = `${windMs}m/s`;

  renderHeatAlert(currentTemp, humidity);
  renderForecast(daily);
}

function renderHeatAlert(temp, humidity) {
  const heatScore = temp + humidity * 0.08;
  let level = "Low";
  let className = "alert-band";
  let message = "Normal field work. Check water before moving to the next site.";

  if (heatScore >= 37 || temp >= 35) {
    level = "Danger";
    className = "alert-band danger";
    message = "High risk for outdoor work and hot control panels. Split the job into short blocks.";
  } else if (heatScore >= 34 || temp >= 31) {
    level = "High";
    className = "alert-band warning";
    message = "Watch afternoon work, non-air-conditioned factories, control cabinets, and electrical parts.";
  } else if (heatScore >= 30 || temp >= 28) {
    level = "Medium";
    className = "alert-band warning";
    message = "For long jobs, check airflow and hydration. A good day to inspect cabinet fans.";
  }

  el.heatAlert.className = className;
  el.heatAlert.innerHTML = `<span>Heat risk</span><strong>${level}</strong><p>${message}</p>`;
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
      return `<div class="forecast-day"><span>${label}</span><strong>${max}/${min} C</strong><span>Rain ${rain}%</span></div>`;
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
  weekdays.innerHTML = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
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
    el.agendaList.innerHTML = `<div class="empty-note">No plans in the next 14 days.</div>`;
    return;
  }

  el.agendaList.innerHTML = upcoming.map(renderEventItem).join("");
}

function renderSelectedDate() {
  el.selectedDateTitle.textContent = formatDisplayDate(state.selectedDate);
  const events = getEventsForDate(state.selectedDate).sort(sortEvents);
  if (!events.length) {
    el.selectedEvents.innerHTML = `<div class="empty-note">No plans on this date.</div>`;
    return;
  }
  el.selectedEvents.innerHTML = events.map((event) => renderEventItem(event, true)).join("");
  el.selectedEvents.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      state.events = state.events.filter((event) => event.id !== button.dataset.delete);
      saveEvents();
      renderCalendar();
      renderAgenda();
      renderSelectedDate();
    });
  });
}

function renderEventItem(event, withDelete = false) {
  const time = event.time ? `${event.time} ` : "";
  const date = formatDisplayDate(event.date, true);
  return `
    <article class="event-item ${event.type}">
      <span>${date} ${time}${eventTypeLabels[event.type]}</span>
      <strong>${escapeHtml(event.title)}</strong>
      ${event.memo ? `<p>${escapeHtml(event.memo)}</p>` : ""}
      ${withDelete ? `<button class="delete-event" type="button" data-delete="${event.id}">Delete</button>` : ""}
    </article>
  `;
}

function getEventsForDate(dateKey) {
  return state.events.filter((event) => event.date === dateKey);
}

function sortEvents(a, b) {
  return `${a.date} ${a.time || "99:99"}`.localeCompare(`${b.date} ${b.time || "99:99"}`);
}

function buildPrompt(type) {
  const location = locations[state.locationIndex]?.name || "my area";
  const temp = el.currentTemp.textContent;
  const humidity = el.humidity.textContent;
  const weather = el.weatherSummary.textContent;

  const prompts = {
    weather: `Write 3 natural Japanese X posts from the viewpoint of a machine-tool repair technician. Area: ${location}. Weather: ${weather}. Temperature: ${temp}. Humidity: ${humidity}. Mention factory heat, control cabinets, electrical parts, and worker breaks. Keep it useful, not too salesy.`,
    news: "Find today's topics around manufacturing, machine tools, factory maintenance, and heat countermeasures. Turn them into 5 sales angles for a machine-tool repair business. Add one Japanese X post draft for each angle.",
    case: "Turn the following repair case into a customer-friendly Japanese explanation and a Japanese X post. Keep technical terms simple and connect it to a maintenance suggestion.\n\nRepair case:\n- Machine:\n- Symptom:\n- Cause:\n- Fix:\n- Next suggestion:"
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
