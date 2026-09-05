window.LUS_X_NEWS = {
  "updatedAt": "2026-09-05T08:40:11.405Z",
  "items": [
    {
      "time": "14:52",
      "title": "7日にかけ関東・東海も大雨おそれ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594303?source=rss",
      "publishedAt": "2026-09-05T05:52:50.000Z",
      "xQuery": "7日にかけ関東・東海も大雨おそれ"
    },
    {
      "time": "16:24",
      "title": "水道代の値上げ相次ぐ 家計を圧迫",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594315?source=rss",
      "publishedAt": "2026-09-05T07:24:06.000Z",
      "xQuery": "水道代の値上げ相次ぐ 家計を圧迫"
    },
    {
      "time": "17:32",
      "title": "母が水中に沈む7歳発見 意識不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594326?source=rss",
      "publishedAt": "2026-09-05T08:32:24.000Z",
      "xQuery": "母が水中に沈む7歳発見 意識不明"
    },
    {
      "time": "15:10",
      "title": "死亡の高2 車に1km以上追跡される",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594308?source=rss",
      "publishedAt": "2026-09-05T06:10:52.000Z",
      "xQuery": "死亡の高2 車に1km以上追跡される"
    },
    {
      "time": "16:20",
      "title": "家買う若者と3畳住む若者 共通点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594316?source=rss",
      "publishedAt": "2026-09-05T07:20:27.000Z",
      "xQuery": "家買う若者と3畳住む若者 共通点"
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
