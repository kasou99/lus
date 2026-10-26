window.LUS_X_NEWS = {
  "updatedAt": "2026-10-26T23:39:02.506Z",
  "items": [
    {
      "time": "07:20",
      "title": "イスラエル総選挙 政権維持が焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600247?source=rss",
      "publishedAt": "2026-10-26T22:20:32.000Z",
      "xQuery": "イスラエル総選挙 政権維持が焦点"
    },
    {
      "time": "07:43",
      "title": "米大統領 ブラジル大統領選は不正",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600251?source=rss",
      "publishedAt": "2026-10-26T22:43:14.000Z",
      "xQuery": "米大統領 ブラジル大統領選は不正"
    },
    {
      "time": "06:08",
      "title": "GMOに予告 正午に顧客情報公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600241?source=rss",
      "publishedAt": "2026-10-26T21:08:19.000Z",
      "xQuery": "GMOに予告 正午に顧客情報公開"
    },
    {
      "time": "07:55",
      "title": "油圧ショベルにひかれ作業員死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600253?source=rss",
      "publishedAt": "2026-10-26T22:55:01.000Z",
      "xQuery": "油圧ショベルにひかれ作業員死亡"
    },
    {
      "time": "06:58",
      "title": "iPhone Duo画面不具合 交換対応",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600246?source=rss",
      "publishedAt": "2026-10-26T21:58:24.000Z",
      "xQuery": "iPhone Duo画面不具合 交換対応"
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
