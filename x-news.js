window.LUS_X_NEWS = {
  "updatedAt": "2026-07-29T11:20:23.546Z",
  "items": [
    {
      "time": "19:44",
      "title": "週末の熊本は40℃迫る酷暑か 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589811?source=rss",
      "publishedAt": "2026-07-29T10:44:14.000Z",
      "xQuery": "週末の熊本は40℃迫る酷暑か 警戒"
    },
    {
      "time": "18:11",
      "title": "熱中症に注意 避難生活のポイント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589803?source=rss",
      "publishedAt": "2026-07-29T09:11:37.000Z",
      "xQuery": "熱中症に注意 避難生活のポイント"
    },
    {
      "time": "17:38",
      "title": "爆発受けイオン社長 深くおわび",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589795?source=rss",
      "publishedAt": "2026-07-29T08:38:24.000Z",
      "xQuery": "爆発受けイオン社長 深くおわび"
    },
    {
      "time": "15:55",
      "title": "雲仙普賢岳の溶岩ドーム 一部崩落",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589785?source=rss",
      "publishedAt": "2026-07-29T06:55:24.000Z",
      "xQuery": "雲仙普賢岳の溶岩ドーム 一部崩落"
    },
    {
      "time": "19:06",
      "title": "イオン爆発 猫カフェの全25匹救出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589806?source=rss",
      "publishedAt": "2026-07-29T10:06:35.000Z",
      "xQuery": "イオン爆発 猫カフェの全25匹救出"
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
