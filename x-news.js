window.LUS_X_NEWS = {
  "updatedAt": "2026-07-15T05:50:25.708Z",
  "items": [
    {
      "time": "12:16",
      "title": "皇室典範改正案 参院で審議始まる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588014?source=rss",
      "publishedAt": "2026-07-15T03:16:19.000Z",
      "xQuery": "皇室典範改正案 参院で審議始まる"
    },
    {
      "time": "14:46",
      "title": "狙われる従業員 次の詐欺手口は?",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588033?source=rss",
      "publishedAt": "2026-07-15T05:46:09.000Z",
      "xQuery": "狙われる従業員 次の詐欺手口は?"
    },
    {
      "time": "14:25",
      "title": "6歳死亡 集団登校中にはねられる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588031?source=rss",
      "publishedAt": "2026-07-15T05:25:58.000Z",
      "xQuery": "6歳死亡 集団登校中にはねられる"
    },
    {
      "time": "14:13",
      "title": "万博「2億円トイレ」移設に1億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588030?source=rss",
      "publishedAt": "2026-07-15T05:13:35.000Z",
      "xQuery": "万博「2億円トイレ」移設に1億円"
    },
    {
      "time": "13:10",
      "title": "「顔パス」の改札 都内で初運用",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588022?source=rss",
      "publishedAt": "2026-07-15T04:10:15.000Z",
      "xQuery": "「顔パス」の改札 都内で初運用"
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
