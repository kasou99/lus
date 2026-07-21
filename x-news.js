window.LUS_X_NEWS = {
  "updatedAt": "2026-07-21T13:00:46.038Z",
  "items": [
    {
      "time": "20:40",
      "title": "22日は関東も40℃の酷暑日予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588807?source=rss",
      "publishedAt": "2026-07-21T11:40:30.000Z",
      "xQuery": "22日は関東も40℃の酷暑日予想"
    },
    {
      "time": "21:38",
      "title": "「夜の熱中症」潜む危険と対策",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588818?source=rss",
      "publishedAt": "2026-07-21T12:38:38.000Z",
      "xQuery": "「夜の熱中症」潜む危険と対策"
    },
    {
      "time": "21:48",
      "title": "霧島市遺体 身元特定に数日見込み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588821?source=rss",
      "publishedAt": "2026-07-21T12:48:44.000Z",
      "xQuery": "霧島市遺体 身元特定に数日見込み"
    },
    {
      "time": "17:00",
      "title": "首相の「0～3時間睡眠」投稿 波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588770?source=rss",
      "publishedAt": "2026-07-21T08:00:03.000Z",
      "xQuery": "首相の「0～3時間睡眠」投稿 波紋"
    },
    {
      "time": "18:52",
      "title": "脊髄iPS移植4年観察 副作用なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588797?source=rss",
      "publishedAt": "2026-07-21T09:52:15.000Z",
      "xQuery": "脊髄iPS移植4年観察 副作用なし"
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
