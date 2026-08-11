window.LUS_X_NEWS = {
  "updatedAt": "2026-08-11T11:19:38.138Z",
  "items": [
    {
      "time": "17:18",
      "title": "台風が関東上陸へ 大雨に厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591338?source=rss",
      "publishedAt": "2026-08-11T08:18:31.000Z",
      "xQuery": "台風が関東上陸へ 大雨に厳重警戒"
    },
    {
      "time": "19:53",
      "title": "シリア裁判所 前大統領に死刑判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591351?source=rss",
      "publishedAt": "2026-08-11T10:53:09.000Z",
      "xQuery": "シリア裁判所 前大統領に死刑判決"
    },
    {
      "time": "18:29",
      "title": "理想のママ像 追い詰められた女性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591344?source=rss",
      "publishedAt": "2026-08-11T09:29:35.000Z",
      "xQuery": "理想のママ像 追い詰められた女性"
    },
    {
      "time": "19:39",
      "title": "アスベスト影響 半蔵門線運転再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591350?source=rss",
      "publishedAt": "2026-08-11T10:39:32.000Z",
      "xQuery": "アスベスト影響 半蔵門線運転再開"
    },
    {
      "time": "17:49",
      "title": "家族と体験ダイビング中溺れ 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591340?source=rss",
      "publishedAt": "2026-08-11T08:49:18.000Z",
      "xQuery": "家族と体験ダイビング中溺れ 死亡"
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
