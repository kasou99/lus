window.LUS_X_NEWS = {
  "updatedAt": "2026-11-17T16:13:07.084Z",
  "items": [
    {
      "time": "23:00",
      "title": "日米豪印が共同文書 中国念頭",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602965?source=rss",
      "publishedAt": "2026-11-17T14:00:52.000Z",
      "xQuery": "日米豪印が共同文書 中国念頭"
    },
    {
      "time": "22:02",
      "title": "ASEAN 米大統領へ「特別待遇」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602954?source=rss",
      "publishedAt": "2026-11-17T13:02:27.000Z",
      "xQuery": "ASEAN 米大統領へ「特別待遇」"
    },
    {
      "time": "22:57",
      "title": "米大統領 冗談交じりに高市氏評す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602960?source=rss",
      "publishedAt": "2026-11-17T13:57:09.000Z",
      "xQuery": "米大統領 冗談交じりに高市氏評す"
    },
    {
      "time": "00:15",
      "title": "韓国野党前代表 日本で入国拒否",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602969?source=rss",
      "publishedAt": "2026-11-17T15:15:40.000Z",
      "xQuery": "韓国野党前代表 日本で入国拒否"
    },
    {
      "time": "22:48",
      "title": "交際1人でも子宮頸がん 子供諦め",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602962?source=rss",
      "publishedAt": "2026-11-17T13:48:07.000Z",
      "xQuery": "交際1人でも子宮頸がん 子供諦め"
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
