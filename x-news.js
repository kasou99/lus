window.LUS_X_NEWS = {
  "updatedAt": "2026-11-04T11:11:15.711Z",
  "items": [
    {
      "time": "18:09",
      "title": "米大統領 民主党に「おめでとう」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601327?source=rss",
      "publishedAt": "2026-11-04T09:09:06.000Z",
      "xQuery": "米大統領 民主党に「おめでとう」"
    },
    {
      "time": "18:52",
      "title": "米民主党が躍進 支持者は喜び爆発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601332?source=rss",
      "publishedAt": "2026-11-04T09:52:57.000Z",
      "xQuery": "米民主党が躍進 支持者は喜び爆発"
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
      "time": "19:28",
      "title": "養殖カンパチ大量死 26万8000匹",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601336?source=rss",
      "publishedAt": "2026-11-04T10:28:35.000Z",
      "xQuery": "養殖カンパチ大量死 26万8000匹"
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
