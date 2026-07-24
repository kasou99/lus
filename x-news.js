window.LUS_X_NEWS = {
  "updatedAt": "2026-07-24T20:36:45.726Z",
  "items": [
    {
      "time": "22:12",
      "title": "「副首都構想」関連法が成立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589183?source=rss",
      "publishedAt": "2026-07-24T13:12:07.000Z",
      "xQuery": "「副首都構想」関連法が成立"
    },
    {
      "time": "23:32",
      "title": "首相 内閣改造と党役員人事検討へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589193?source=rss",
      "publishedAt": "2026-07-24T14:32:24.000Z",
      "xQuery": "首相 内閣改造と党役員人事検討へ"
    },
    {
      "time": "23:30",
      "title": "植松死刑囚に刺され 被害者の歩み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589192?source=rss",
      "publishedAt": "2026-07-24T14:30:58.000Z",
      "xQuery": "植松死刑囚に刺され 被害者の歩み"
    },
    {
      "time": "22:45",
      "title": "霧島市の遺体は不明男児 父親胸中",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589185?source=rss",
      "publishedAt": "2026-07-24T13:45:18.000Z",
      "xQuery": "霧島市の遺体は不明男児 父親胸中"
    },
    {
      "time": "22:29",
      "title": "6月に児童50分放置 学校バス車内",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589184?source=rss",
      "publishedAt": "2026-07-24T13:29:48.000Z",
      "xQuery": "6月に児童50分放置 学校バス車内"
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
