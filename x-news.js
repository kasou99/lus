window.LUS_X_NEWS = {
  "updatedAt": "2026-07-28T12:12:08.917Z",
  "items": [
    {
      "time": "21:08",
      "title": "熊本県で震度7 最新情報まとめ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589694?source=rss",
      "publishedAt": "2026-07-28T12:08:03.000Z",
      "xQuery": "熊本県で震度7 最新情報まとめ"
    },
    {
      "time": "20:09",
      "title": "電気ガス停止 安全優先でどう対応",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583459?source=rss",
      "publishedAt": "2026-07-28T11:09:00.000Z",
      "xQuery": "電気ガス停止 安全優先でどう対応"
    },
    {
      "time": "18:51",
      "title": "避難中の熱中症警戒 蒸し暑さ続く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589666?source=rss",
      "publishedAt": "2026-07-28T09:51:12.000Z",
      "xQuery": "避難中の熱中症警戒 蒸し暑さ続く"
    },
    {
      "time": "21:00",
      "title": "イオンモール熊本 複数人が死亡か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589690?source=rss",
      "publishedAt": "2026-07-28T12:00:28.000Z",
      "xQuery": "イオンモール熊本 複数人が死亡か"
    },
    {
      "time": "21:08",
      "title": "地震時のイオンモール 従業員語る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589689?source=rss",
      "publishedAt": "2026-07-28T12:08:10.000Z",
      "xQuery": "地震時のイオンモール 従業員語る"
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
