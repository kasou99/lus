window.LUS_X_NEWS = {
  "updatedAt": "2026-07-27T22:28:06.523Z",
  "items": [
    {
      "time": "22:39",
      "title": "食品消費税1% 政府・与党が方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589556?source=rss",
      "publishedAt": "2026-07-27T13:39:24.000Z",
      "xQuery": "食品消費税1% 政府・与党が方針"
    },
    {
      "time": "06:51",
      "title": "トランプ氏 FRBに利下げを要求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589565?source=rss",
      "publishedAt": "2026-07-27T21:51:24.000Z",
      "xQuery": "トランプ氏 FRBに利下げを要求"
    },
    {
      "time": "23:08",
      "title": "海保が同志社国際高校を家宅捜索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589555?source=rss",
      "publishedAt": "2026-07-27T14:08:53.000Z",
      "xQuery": "海保が同志社国際高校を家宅捜索"
    },
    {
      "time": "06:34",
      "title": "車と衝突 ミニバイクの高校生死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589564?source=rss",
      "publishedAt": "2026-07-27T21:34:56.000Z",
      "xQuery": "車と衝突 ミニバイクの高校生死亡"
    },
    {
      "time": "07:19",
      "title": "東野圭吾さん 今年初めには車いす",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589566?source=rss",
      "publishedAt": "2026-07-27T22:19:25.000Z",
      "xQuery": "東野圭吾さん 今年初めには車いす"
    }
  ]
};

(function renderLusXNews() {
  const data = window.LUS_X_NEWS || { items: [] };

  function escapeX(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => {
      if (char === "&") return "&amp;";
      if (char === "<") return "&lt;";
      if (char === ">") return "&gt;";
      if (char === '"') return "&quot;";
      return "&#039;";
    });
  }

  function xSearchUrl(item) {
    const query = item.xQuery || item.originalTitle || item.title || "";
    return "https://x.com/search?q=" + encodeURIComponent(query + " lang:ja") + "&src=typed_query&f=live";
  }

  function render() {
    const grid = document.querySelector(".news-grid.headline-mode");
    if (!grid) return false;

    let card = document.querySelector("#xTrendCard");
    if (!card) {
      card = document.createElement("article");
      card.className = "headline-card x-trend-card";
      card.id = "xTrendCard";
      grid.prepend(card);
    }

    const items = (data.items || []).slice(0, 5);
    card.innerHTML = `
      <div class="headline-top"><h3>Xで追う人気ニュースTop5</h3><span>新着順</span></div>
      <div id="xTrendHeadlines">
        ${items.length ? items.map((item) => `
          <a class="headline-item" href="${xSearchUrl(item)}" target="_blank" rel="noopener">
            <span class="headline-time">${escapeX(item.time || "速報")}</span>
            <span><strong class="headline-title">${escapeX(item.title)}</strong><span class="headline-source">${item.translated ? "自動翻訳 / " : ""}Xの新着投稿を開く / ${escapeX(item.source || "ニュース")}</span></span>
          </a>
        `).join("") : `<p class="headline-error">Xで追う見出しを準備中です。</p>`}
      </div>
    `;
    return true;
  }

  function scheduleRender() {
    let count = 0;
    const tick = () => {
      render();
      count += 1;
      if (count < 10) setTimeout(tick, 450);
    };
    tick();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleRender);
  } else {
    scheduleRender();
  }

  document.addEventListener("change", (event) => {
    if (event.target && event.target.id === "newsRegionSelect") setTimeout(render, 700);
  });
})();
