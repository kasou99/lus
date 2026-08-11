window.LUS_X_NEWS = {
  "updatedAt": "2026-08-11T15:24:51.290Z",
  "items": [
    {
      "time": "22:12",
      "title": "台風上陸 12日も各地で大雨予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591361?source=rss",
      "publishedAt": "2026-08-11T13:12:11.000Z",
      "xQuery": "台風上陸 12日も各地で大雨予想"
    },
    {
      "time": "22:22",
      "title": "東北道下りで全車線塞ぐ倒木 栃木",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591362?source=rss",
      "publishedAt": "2026-08-11T13:22:53.000Z",
      "xQuery": "東北道下りで全車線塞ぐ倒木 栃木"
    },
    {
      "time": "22:38",
      "title": "イオン 爆発事故で遺族に補償方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591365?source=rss",
      "publishedAt": "2026-08-11T13:38:51.000Z",
      "xQuery": "イオン 爆発事故で遺族に補償方針"
    },
    {
      "time": "23:43",
      "title": "砂浜に遺体 近くで22歳男性が不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591374?source=rss",
      "publishedAt": "2026-08-11T14:43:55.000Z",
      "xQuery": "砂浜に遺体 近くで22歳男性が不明"
    },
    {
      "time": "21:22",
      "title": "子供2人死亡 海の流れに識者驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591355?source=rss",
      "publishedAt": "2026-08-11T12:22:54.000Z",
      "xQuery": "子供2人死亡 海の流れに識者驚き"
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
