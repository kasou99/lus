window.LUS_X_NEWS = {
  "updatedAt": "2026-10-02T06:32:27.774Z",
  "items": [
    {
      "time": "12:53",
      "title": "農相 報道巡り「回答控える」連発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597264?source=rss",
      "publishedAt": "2026-10-02T03:53:09.000Z",
      "xQuery": "農相 報道巡り「回答控える」連発"
    },
    {
      "time": "14:00",
      "title": "ニデック会見 異例の監査法人同席",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597273?source=rss",
      "publishedAt": "2026-10-02T05:00:14.000Z",
      "xQuery": "ニデック会見 異例の監査法人同席"
    },
    {
      "time": "14:15",
      "title": "焼け跡から遺体 消防隊員も死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597274?source=rss",
      "publishedAt": "2026-10-02T05:15:34.000Z",
      "xQuery": "焼け跡から遺体 消防隊員も死亡"
    },
    {
      "time": "15:21",
      "title": "喫煙所に車突っ込む 男女7人けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597279?source=rss",
      "publishedAt": "2026-10-02T06:21:03.000Z",
      "xQuery": "喫煙所に車突っ込む 男女7人けが"
    },
    {
      "time": "12:49",
      "title": "もう辞めたい「フキハラ」の実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597263?source=rss",
      "publishedAt": "2026-10-02T03:49:11.000Z",
      "xQuery": "もう辞めたい「フキハラ」の実態"
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
