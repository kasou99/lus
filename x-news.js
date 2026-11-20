window.LUS_X_NEWS = {
  "updatedAt": "2026-11-20T11:36:13.795Z",
  "items": [
    {
      "time": "18:36",
      "title": "政府内部資料流出か 不正アクセス",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603320?source=rss",
      "publishedAt": "2026-11-20T09:36:38.000Z",
      "xQuery": "政府内部資料流出か 不正アクセス"
    },
    {
      "time": "18:41",
      "title": "今年のインフル「だらだら流行」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603316?source=rss",
      "publishedAt": "2026-11-20T09:41:50.000Z",
      "xQuery": "今年のインフル「だらだら流行」"
    },
    {
      "time": "19:13",
      "title": "横浜市長 市長公舎の廃止方針表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603326?source=rss",
      "publishedAt": "2026-11-20T10:13:05.000Z",
      "xQuery": "横浜市長 市長公舎の廃止方針表明"
    },
    {
      "time": "19:35",
      "title": "ココイチ売却 米KKRに優先交渉権",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603327?source=rss",
      "publishedAt": "2026-11-20T10:35:37.000Z",
      "xQuery": "ココイチ売却 米KKRに優先交渉権"
    },
    {
      "time": "18:38",
      "title": "公認会計士 14歳が史上最年少合格",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603321?source=rss",
      "publishedAt": "2026-11-20T09:38:47.000Z",
      "xQuery": "公認会計士 14歳が史上最年少合格"
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
