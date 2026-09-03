window.LUS_X_NEWS = {
  "updatedAt": "2026-09-03T11:15:05.453Z",
  "items": [
    {
      "time": "19:28",
      "title": "週明けにかけ大雨続く恐れ 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594126?source=rss",
      "publishedAt": "2026-09-03T10:28:38.000Z",
      "xQuery": "週明けにかけ大雨続く恐れ 警戒を"
    },
    {
      "time": "18:20",
      "title": "北方領土税制優遇は成功 露大統領",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594121?source=rss",
      "publishedAt": "2026-09-03T09:20:43.000Z",
      "xQuery": "北方領土税制優遇は成功 露大統領"
    },
    {
      "time": "18:33",
      "title": "日本製紙八代 解体中に出火と通報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594122?source=rss",
      "publishedAt": "2026-09-03T09:33:12.000Z",
      "xQuery": "日本製紙八代 解体中に出火と通報"
    },
    {
      "time": "19:29",
      "title": "麻布十番まつりで食中毒 店主謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594127?source=rss",
      "publishedAt": "2026-09-03T10:29:09.000Z",
      "xQuery": "麻布十番まつりで食中毒 店主謝罪"
    },
    {
      "time": "18:18",
      "title": "ヤマトとJAL 国内線貨物機終了へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594120?source=rss",
      "publishedAt": "2026-09-03T09:18:02.000Z",
      "xQuery": "ヤマトとJAL 国内線貨物機終了へ"
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
