window.LUS_X_NEWS = {
  "updatedAt": "2026-06-21T11:56:53.229Z",
  "items": [
    {
      "time": "18:22",
      "title": "6月猛暑日地点 前年比1%の可能性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585109?source=rss",
      "publishedAt": "2026-06-21T09:22:52.000Z",
      "xQuery": "6月猛暑日地点 前年比1%の可能性"
    },
    {
      "time": "20:10",
      "title": "指定ごみ袋不足 中東情勢の余波",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585119?source=rss",
      "publishedAt": "2026-06-21T11:10:01.000Z",
      "xQuery": "指定ごみ袋不足 中東情勢の余波"
    },
    {
      "time": "20:48",
      "title": "内閣支持率が発足以来最低 共同",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585122?source=rss",
      "publishedAt": "2026-06-21T11:48:27.000Z",
      "xQuery": "内閣支持率が発足以来最低 共同"
    },
    {
      "time": "13:47",
      "title": "小学校火事 火元から燃えた衣類",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585079?source=rss",
      "publishedAt": "2026-06-21T04:47:31.000Z",
      "xQuery": "小学校火事 火元から燃えた衣類"
    },
    {
      "time": "16:37",
      "title": "大学サイトが詐欺の入口 識者解説",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585097?source=rss",
      "publishedAt": "2026-06-21T07:37:45.000Z",
      "xQuery": "大学サイトが詐欺の入口 識者解説"
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
