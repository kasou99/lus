window.LUS_X_NEWS = {
  "updatedAt": "2026-10-25T14:38:36.355Z",
  "items": [
    {
      "time": "22:45",
      "title": "台風30号は温帯低気圧に 大雨警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600115?source=rss",
      "publishedAt": "2026-10-25T13:45:25.000Z",
      "xQuery": "台風30号は温帯低気圧に 大雨警戒"
    },
    {
      "time": "22:21",
      "title": "ドコモ 「エリアメール」完全再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600114?source=rss",
      "publishedAt": "2026-10-25T13:21:19.000Z",
      "xQuery": "ドコモ 「エリアメール」完全再開"
    },
    {
      "time": "23:05",
      "title": "不正アクセス GMO代表が謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600119?source=rss",
      "publishedAt": "2026-10-25T14:05:35.000Z",
      "xQuery": "不正アクセス GMO代表が謝罪"
    },
    {
      "time": "20:11",
      "title": "イオン爆発犠牲者7人 南側で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600100?source=rss",
      "publishedAt": "2026-10-25T11:11:59.000Z",
      "xQuery": "イオン爆発犠牲者7人 南側で発見"
    },
    {
      "time": "21:17",
      "title": "事故で脚切断 25歳諦めていた恋愛",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600106?source=rss",
      "publishedAt": "2026-10-25T12:17:50.000Z",
      "xQuery": "事故で脚切断 25歳諦めていた恋愛"
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
