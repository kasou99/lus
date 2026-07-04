window.LUS_X_NEWS = {
  "updatedAt": "2026-07-04T10:17:47.251Z",
  "items": [
    {
      "time": "18:50",
      "title": "九州豪雨6年 村全体が限界集落化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586724?source=rss",
      "publishedAt": "2026-07-04T09:50:12.000Z",
      "xQuery": "九州豪雨6年 村全体が限界集落化"
    },
    {
      "time": "14:48",
      "title": "転覆事故後初の大規模集会 辺野古",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586699?source=rss",
      "publishedAt": "2026-07-04T05:48:34.000Z",
      "xQuery": "転覆事故後初の大規模集会 辺野古"
    },
    {
      "time": "15:29",
      "title": "不明の10歳死亡 父が声震わせ訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586704?source=rss",
      "publishedAt": "2026-07-04T06:29:41.000Z",
      "xQuery": "不明の10歳死亡 父が声震わせ訴え"
    },
    {
      "time": "17:21",
      "title": "無煙たばこ 口腔学会トップが警告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586715?source=rss",
      "publishedAt": "2026-07-04T08:21:44.000Z",
      "xQuery": "無煙たばこ 口腔学会トップが警告"
    },
    {
      "time": "18:31",
      "title": "「仮面夫婦」会話ほぼゼロの男性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586723?source=rss",
      "publishedAt": "2026-07-04T09:31:39.000Z",
      "xQuery": "「仮面夫婦」会話ほぼゼロの男性"
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
