window.LUS_X_NEWS = {
  "updatedAt": "2026-05-24T01:10:42.315Z",
  "items": [
    {
      "time": "09:21",
      "title": "ホワイトハウス近くで警官に発砲",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581456?source=rss",
      "publishedAt": "2026-05-24T00:21:52.000Z",
      "xQuery": "ホワイトハウス近くで警官に発砲"
    },
    {
      "time": "08:03",
      "title": "米中会談 習主席が高市首相を非難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581446?source=rss",
      "publishedAt": "2026-05-23T23:03:20.000Z",
      "xQuery": "米中会談 習主席が高市首相を非難"
    },
    {
      "time": "09:10",
      "title": "中国炭鉱爆発「企業が違法行為」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581449?source=rss",
      "publishedAt": "2026-05-24T00:10:14.000Z",
      "xQuery": "中国炭鉱爆発「企業が違法行為」"
    },
    {
      "time": "08:51",
      "title": "神戸児童殺傷 区切りを選んだ遺族",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581453?source=rss",
      "publishedAt": "2026-05-23T23:51:59.000Z",
      "xQuery": "神戸児童殺傷 区切りを選んだ遺族"
    },
    {
      "time": "08:53",
      "title": "バインミー専門店が増加 なぜ人気",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581452?source=rss",
      "publishedAt": "2026-05-23T23:53:13.000Z",
      "xQuery": "バインミー専門店が増加 なぜ人気"
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
