window.LUS_X_NEWS = {
  "updatedAt": "2026-07-22T13:02:51.180Z",
  "items": [
    {
      "time": "20:44",
      "title": "週の熱中症搬送者 今年初1万人超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588941?source=rss",
      "publishedAt": "2026-07-22T11:44:07.000Z",
      "xQuery": "週の熱中症搬送者 今年初1万人超"
    },
    {
      "time": "21:25",
      "title": "新設大学4校 充足率は50%以下",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588926?source=rss",
      "publishedAt": "2026-07-22T12:25:25.000Z",
      "xQuery": "新設大学4校 充足率は50%以下"
    },
    {
      "time": "20:51",
      "title": "乗務員休憩不足なら運休も JR西",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588943?source=rss",
      "publishedAt": "2026-07-22T11:51:06.000Z",
      "xQuery": "乗務員休憩不足なら運休も JR西"
    },
    {
      "time": "20:04",
      "title": "学童保育で性虐待 説明会に怒りも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588938?source=rss",
      "publishedAt": "2026-07-22T11:04:14.000Z",
      "xQuery": "学童保育で性虐待 説明会に怒りも"
    },
    {
      "time": "18:28",
      "title": "山田五郎氏死去 原発不明がんとは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588931?source=rss",
      "publishedAt": "2026-07-22T09:28:41.000Z",
      "xQuery": "山田五郎氏死去 原発不明がんとは"
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
