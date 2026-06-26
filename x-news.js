window.LUS_X_NEWS = {
  "updatedAt": "2026-06-26T21:04:57.961Z",
  "items": [
    {
      "time": "23:57",
      "title": "台風ピークは2回 雨に終日警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585812?source=rss",
      "publishedAt": "2026-06-26T14:57:13.000Z",
      "xQuery": "台風ピークは2回 雨に終日警戒を"
    },
    {
      "time": "01:28",
      "title": "地震で土砂災害恐れ 今後の雨注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585821?source=rss",
      "publishedAt": "2026-06-26T16:28:54.000Z",
      "xQuery": "地震で土砂災害恐れ 今後の雨注意"
    },
    {
      "time": "00:53",
      "title": "家に土砂流入1人行方不明 山口県",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585818?source=rss",
      "publishedAt": "2026-06-26T15:53:01.000Z",
      "xQuery": "家に土砂流入1人行方不明 山口県"
    },
    {
      "time": "00:36",
      "title": "地震 識者「斜面崩壊の可能性も」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585816?source=rss",
      "publishedAt": "2026-06-26T15:36:31.000Z",
      "xQuery": "地震 識者「斜面崩壊の可能性も」"
    },
    {
      "time": "23:46",
      "title": "富士山の火山活動 特段の変化なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585811?source=rss",
      "publishedAt": "2026-06-26T14:46:07.000Z",
      "xQuery": "富士山の火山活動 特段の変化なし"
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
