window.LUS_X_NEWS = {
  "updatedAt": "2026-11-16T10:38:14.182Z",
  "items": [
    {
      "time": "18:40",
      "title": "マンション短期売買 課税強化検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602817?source=rss",
      "publishedAt": "2026-11-16T09:40:24.000Z",
      "xQuery": "マンション短期売買 課税強化検討"
    },
    {
      "time": "18:17",
      "title": "タイムズカーの会員数 1.4万人減",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602816?source=rss",
      "publishedAt": "2026-11-16T09:17:39.000Z",
      "xQuery": "タイムズカーの会員数 1.4万人減"
    },
    {
      "time": "17:40",
      "title": "尖圭コンジローマ 男性患者が増加",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602812?source=rss",
      "publishedAt": "2026-11-16T08:40:46.000Z",
      "xQuery": "尖圭コンジローマ 男性患者が増加"
    },
    {
      "time": "17:55",
      "title": "どう思う 夫婦のセパレート帰省",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602815?source=rss",
      "publishedAt": "2026-11-16T08:55:28.000Z",
      "xQuery": "どう思う 夫婦のセパレート帰省"
    },
    {
      "time": "17:53",
      "title": "X-GUNさがね・まさひろ氏市議に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602808?source=rss",
      "publishedAt": "2026-11-16T08:53:49.000Z",
      "xQuery": "X-GUNさがね・まさひろ氏市議に"
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
