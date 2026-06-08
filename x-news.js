window.LUS_X_NEWS = {
  "updatedAt": "2026-06-08T13:55:07.633Z",
  "items": [
    {
      "time": "21:43",
      "title": "フィリピンで地震 30人超が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583479?source=rss",
      "publishedAt": "2026-06-08T12:43:34.000Z",
      "xQuery": "フィリピンで地震 30人超が死亡"
    },
    {
      "time": "22:21",
      "title": "内田被告 遺族の訴えに表情変えず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583487?source=rss",
      "publishedAt": "2026-06-08T13:21:58.000Z",
      "xQuery": "内田被告 遺族の訴えに表情変えず"
    },
    {
      "time": "22:04",
      "title": "KADOKAWAに公取委が勧告へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583484?source=rss",
      "publishedAt": "2026-06-08T13:04:13.000Z",
      "xQuery": "KADOKAWAに公取委が勧告へ"
    },
    {
      "time": "22:28",
      "title": "商業施設で目や喉の痛み 8人搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583486?source=rss",
      "publishedAt": "2026-06-08T13:28:04.000Z",
      "xQuery": "商業施設で目や喉の痛み 8人搬送"
    },
    {
      "time": "20:15",
      "title": "腹部と目に刃物刺さった男性 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583475?source=rss",
      "publishedAt": "2026-06-08T11:15:55.000Z",
      "xQuery": "腹部と目に刃物刺さった男性 死亡"
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
