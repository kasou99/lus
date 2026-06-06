window.LUS_X_NEWS = {
  "updatedAt": "2026-06-06T10:16:09.426Z",
  "items": [
    {
      "time": "17:30",
      "title": "イランが湾岸地域へ攻撃 米が迎撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583191?source=rss",
      "publishedAt": "2026-06-06T08:30:56.000Z",
      "xQuery": "イランが湾岸地域へ攻撃 米が迎撃"
    },
    {
      "time": "19:06",
      "title": "7日西日本で滝のような雨も 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583204?source=rss",
      "publishedAt": "2026-06-06T10:06:42.000Z",
      "xQuery": "7日西日本で滝のような雨も 警戒"
    },
    {
      "time": "18:25",
      "title": "レアメタルが調達難 中国輸出規制",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583201?source=rss",
      "publishedAt": "2026-06-06T09:25:23.000Z",
      "xQuery": "レアメタルが調達難 中国輸出規制"
    },
    {
      "time": "18:13",
      "title": "タンクローリー海に突っ込む 救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583198?source=rss",
      "publishedAt": "2026-06-06T09:13:55.000Z",
      "xQuery": "タンクローリー海に突っ込む 救助"
    },
    {
      "time": "18:05",
      "title": "アクエリ 青い液色はZ世代支持",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583199?source=rss",
      "publishedAt": "2026-06-06T09:05:34.000Z",
      "xQuery": "アクエリ 青い液色はZ世代支持"
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
