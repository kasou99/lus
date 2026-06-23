window.LUS_X_NEWS = {
  "updatedAt": "2026-06-23T05:30:13.713Z",
  "items": [
    {
      "time": "13:08",
      "title": "日産株主総会 永井取締役案を否決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585333?source=rss",
      "publishedAt": "2026-06-23T04:08:43.000Z",
      "xQuery": "日産株主総会 永井取締役案を否決"
    },
    {
      "time": "13:34",
      "title": "マダニ感染 去年上回るペースで増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585336?source=rss",
      "publishedAt": "2026-06-23T04:34:47.000Z",
      "xQuery": "マダニ感染 去年上回るペースで増"
    },
    {
      "time": "11:33",
      "title": "金正恩氏 日本を名指しで非難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585317?source=rss",
      "publishedAt": "2026-06-23T02:33:48.000Z",
      "xQuery": "金正恩氏 日本を名指しで非難"
    },
    {
      "time": "14:04",
      "title": "同僚に殴られ 意識不明の男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585338?source=rss",
      "publishedAt": "2026-06-23T05:04:43.000Z",
      "xQuery": "同僚に殴られ 意識不明の男性死亡"
    },
    {
      "time": "13:55",
      "title": "デヴィ夫人側 起訴内容を認める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585337?source=rss",
      "publishedAt": "2026-06-23T04:55:57.000Z",
      "xQuery": "デヴィ夫人側 起訴内容を認める"
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
