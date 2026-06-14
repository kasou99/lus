window.LUS_X_NEWS = {
  "updatedAt": "2026-06-14T10:36:07.831Z",
  "items": [
    {
      "time": "17:24",
      "title": "米イラン覚書 オンライン署名計画",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584221?source=rss",
      "publishedAt": "2026-06-14T08:24:32.000Z",
      "xQuery": "米イラン覚書 オンライン署名計画"
    },
    {
      "time": "18:29",
      "title": "メキシコでまた市長殺害 抗争激化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584232?source=rss",
      "publishedAt": "2026-06-14T09:29:57.000Z",
      "xQuery": "メキシコでまた市長殺害 抗争激化"
    },
    {
      "time": "14:34",
      "title": "ボビー容疑者逮捕 事実違うと否認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584202?source=rss",
      "publishedAt": "2026-06-14T05:34:25.000Z",
      "xQuery": "ボビー容疑者逮捕 事実違うと否認"
    },
    {
      "time": "18:22",
      "title": "給食にカビ 保護者通知は3週間後",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584231?source=rss",
      "publishedAt": "2026-06-14T09:22:21.000Z",
      "xQuery": "給食にカビ 保護者通知は3週間後"
    },
    {
      "time": "18:04",
      "title": "増える「ホビ垢」女子 実態は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584224?source=rss",
      "publishedAt": "2026-06-14T09:04:25.000Z",
      "xQuery": "増える「ホビ垢」女子 実態は"
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
