window.LUS_X_NEWS = {
  "updatedAt": "2026-07-20T10:28:46.751Z",
  "items": [
    {
      "time": "17:06",
      "title": "今週40℃予想も 梅雨明け酷暑警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588646?source=rss",
      "publishedAt": "2026-07-20T08:06:40.000Z",
      "xQuery": "今週40℃予想も 梅雨明け酷暑警戒"
    },
    {
      "time": "18:47",
      "title": "養子希望者は 改正皇室典範の難題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588654?source=rss",
      "publishedAt": "2026-07-20T09:47:35.000Z",
      "xQuery": "養子希望者は 改正皇室典範の難題"
    },
    {
      "time": "17:20",
      "title": "ウ 徴兵担当者への暴力事件が増加",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588647?source=rss",
      "publishedAt": "2026-07-20T08:20:23.000Z",
      "xQuery": "ウ 徴兵担当者への暴力事件が増加"
    },
    {
      "time": "18:30",
      "title": "ローソン「車中泊」50代利用者も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588655?source=rss",
      "publishedAt": "2026-07-20T09:30:22.000Z",
      "xQuery": "ローソン「車中泊」50代利用者も"
    },
    {
      "time": "18:18",
      "title": "トイストーリー5がX流出 違法性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588653?source=rss",
      "publishedAt": "2026-07-20T09:18:11.000Z",
      "xQuery": "トイストーリー5がX流出 違法性"
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
