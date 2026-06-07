window.LUS_X_NEWS = {
  "updatedAt": "2026-06-07T02:25:17.264Z",
  "items": [
    {
      "time": "11:14",
      "title": "関東甲信・東海地方が梅雨入り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583275?source=rss",
      "publishedAt": "2026-06-07T02:14:39.000Z",
      "xQuery": "関東甲信・東海地方が梅雨入り"
    },
    {
      "time": "09:16",
      "title": "独移民政策 1年で3.6万人入国拒否",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583262?source=rss",
      "publishedAt": "2026-06-07T00:16:24.000Z",
      "xQuery": "独移民政策 1年で3.6万人入国拒否"
    },
    {
      "time": "10:14",
      "title": "秋葉原殺傷でPTSD 男性の現在",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583269?source=rss",
      "publishedAt": "2026-06-07T01:14:56.000Z",
      "xQuery": "秋葉原殺傷でPTSD 男性の現在"
    },
    {
      "time": "09:48",
      "title": "工事中に死亡 高さ3mから落ちたか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583266?source=rss",
      "publishedAt": "2026-06-07T00:48:17.000Z",
      "xQuery": "工事中に死亡 高さ3mから落ちたか"
    },
    {
      "time": "07:55",
      "title": "死亡ひき逃げ 女性引きずられたか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583251?source=rss",
      "publishedAt": "2026-06-06T22:55:50.000Z",
      "xQuery": "死亡ひき逃げ 女性引きずられたか"
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
