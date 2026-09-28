window.LUS_X_NEWS = {
  "updatedAt": "2026-09-28T09:29:40.096Z",
  "items": [
    {
      "time": "16:29",
      "title": "大規模修繕で談合 38社に排除命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596852?source=rss",
      "publishedAt": "2026-09-28T07:29:13.000Z",
      "xQuery": "大規模修繕で談合 38社に排除命令"
    },
    {
      "time": "16:41",
      "title": "米中関税 対象品で大幅引き下げへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596855?source=rss",
      "publishedAt": "2026-09-28T07:41:29.000Z",
      "xQuery": "米中関税 対象品で大幅引き下げへ"
    },
    {
      "time": "17:26",
      "title": "海岸遺体 不明の6歳男児と判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596861?source=rss",
      "publishedAt": "2026-09-28T08:26:40.000Z",
      "xQuery": "海岸遺体 不明の6歳男児と判明"
    },
    {
      "time": "16:31",
      "title": "タイムズカー約660万件情報漏えい",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596854?source=rss",
      "publishedAt": "2026-09-28T07:31:37.000Z",
      "xQuery": "タイムズカー約660万件情報漏えい"
    },
    {
      "time": "17:49",
      "title": "ミスドが上海出店 100人以上が列",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596863?source=rss",
      "publishedAt": "2026-09-28T08:49:44.000Z",
      "xQuery": "ミスドが上海出店 100人以上が列"
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
