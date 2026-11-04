window.LUS_X_NEWS = {
  "updatedAt": "2026-11-04T12:36:49.397Z",
  "items": [
    {
      "time": "20:49",
      "title": "米中間選挙 日本経済への影響は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601343?source=rss",
      "publishedAt": "2026-11-04T11:49:29.000Z",
      "xQuery": "米中間選挙 日本経済への影響は"
    },
    {
      "time": "15:25",
      "title": "ISSの米宇宙飛行士も中間選挙投票",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601302?source=rss",
      "publishedAt": "2026-11-04T06:25:46.000Z",
      "xQuery": "ISSの米宇宙飛行士も中間選挙投票"
    },
    {
      "time": "18:32",
      "title": "無印良品 クレカ番号など流出か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601331?source=rss",
      "publishedAt": "2026-11-04T09:32:09.000Z",
      "xQuery": "無印良品 クレカ番号など流出か"
    },
    {
      "time": "19:59",
      "title": "列車事故で死亡の邦人 20代男女か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601338?source=rss",
      "publishedAt": "2026-11-04T10:59:54.000Z",
      "xQuery": "列車事故で死亡の邦人 20代男女か"
    },
    {
      "time": "20:34",
      "title": "警官の拳銃奪い自らに発砲 重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601342?source=rss",
      "publishedAt": "2026-11-04T11:34:45.000Z",
      "xQuery": "警官の拳銃奪い自らに発砲 重体"
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
