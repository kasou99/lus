window.LUS_X_NEWS = {
  "updatedAt": "2026-09-30T23:17:17.562Z",
  "items": [
    {
      "time": "07:43",
      "title": "ニデック極まる混乱 再生不透明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597129?source=rss",
      "publishedAt": "2026-09-30T22:43:59.000Z",
      "xQuery": "ニデック極まる混乱 再生不透明"
    },
    {
      "time": "06:42",
      "title": "台風が関東接近へ 千葉は大雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597124?source=rss",
      "publishedAt": "2026-09-30T21:42:46.000Z",
      "xQuery": "台風が関東接近へ 千葉は大雨恐れ"
    },
    {
      "time": "07:33",
      "title": "高性能AI普及へ 年内に行動計画",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597128?source=rss",
      "publishedAt": "2026-09-30T22:33:31.000Z",
      "xQuery": "高性能AI普及へ 年内に行動計画"
    },
    {
      "time": "07:17",
      "title": "テルアビブ便 副操縦士が機長刺す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597126?source=rss",
      "publishedAt": "2026-09-30T22:17:08.000Z",
      "xQuery": "テルアビブ便 副操縦士が機長刺す"
    },
    {
      "time": "00:02",
      "title": "神戸発砲事件 死亡男性は会社役員",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597119?source=rss",
      "publishedAt": "2026-09-30T15:02:19.000Z",
      "xQuery": "神戸発砲事件 死亡男性は会社役員"
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
