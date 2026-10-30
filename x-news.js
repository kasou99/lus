window.LUS_X_NEWS = {
  "updatedAt": "2026-10-30T03:37:36.586Z",
  "items": [
    {
      "time": "11:48",
      "title": "中部電の改善命令手続きへ 経産省",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600663?source=rss",
      "publishedAt": "2026-10-30T02:48:27.000Z",
      "xQuery": "中部電の改善命令手続きへ 経産省"
    },
    {
      "time": "08:35",
      "title": "香港高層住宅火災 政府トップ謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600642?source=rss",
      "publishedAt": "2026-10-29T23:35:01.000Z",
      "xQuery": "香港高層住宅火災 政府トップ謝罪"
    },
    {
      "time": "10:16",
      "title": "のぞみ1hで14本運行目指す JR",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600657?source=rss",
      "publishedAt": "2026-10-30T01:16:36.000Z",
      "xQuery": "のぞみ1hで14本運行目指す JR"
    },
    {
      "time": "11:05",
      "title": "3年で海外出張6672万円 仙台市長",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600654?source=rss",
      "publishedAt": "2026-10-30T02:05:19.000Z",
      "xQuery": "3年で海外出張6672万円 仙台市長"
    },
    {
      "time": "09:32",
      "title": "エスカレーターを歩く人 傾向分析",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600651?source=rss",
      "publishedAt": "2026-10-30T00:32:02.000Z",
      "xQuery": "エスカレーターを歩く人 傾向分析"
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
