window.LUS_X_NEWS = {
  "updatedAt": "2026-08-20T13:48:29.878Z",
  "items": [
    {
      "time": "22:03",
      "title": "首相 7月就任の英首相と電話会談",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592461?source=rss",
      "publishedAt": "2026-08-20T13:03:03.000Z",
      "xQuery": "首相 7月就任の英首相と電話会談"
    },
    {
      "time": "21:41",
      "title": "21日 関東など急な雨や雷雨に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592458?source=rss",
      "publishedAt": "2026-08-20T12:41:53.000Z",
      "xQuery": "21日 関東など急な雨や雷雨に注意"
    },
    {
      "time": "22:32",
      "title": "4人死亡 退避完了と見張りが合図",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592465?source=rss",
      "publishedAt": "2026-08-20T13:32:34.000Z",
      "xQuery": "4人死亡 退避完了と見張りが合図"
    },
    {
      "time": "20:57",
      "title": "時間外労働 一律抑制見直しに反発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592452?source=rss",
      "publishedAt": "2026-08-20T11:57:01.000Z",
      "xQuery": "時間外労働 一律抑制見直しに反発"
    },
    {
      "time": "19:51",
      "title": "メガネにコスメ的な機能 各社注力",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592448?source=rss",
      "publishedAt": "2026-08-20T10:51:26.000Z",
      "xQuery": "メガネにコスメ的な機能 各社注力"
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
