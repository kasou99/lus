window.LUS_X_NEWS = {
  "updatedAt": "2026-10-23T09:43:40.351Z",
  "items": [
    {
      "time": "18:14",
      "title": "台風30号 24日にかけ先島諸島接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599838?source=rss",
      "publishedAt": "2026-10-23T09:14:24.000Z",
      "xQuery": "台風30号 24日にかけ先島諸島接近"
    },
    {
      "time": "17:39",
      "title": "燃料油補助の見直し検討 首相指示",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599832?source=rss",
      "publishedAt": "2026-10-23T08:39:04.000Z",
      "xQuery": "燃料油補助の見直し検討 首相指示"
    },
    {
      "time": "17:06",
      "title": "JR内房線 11月9日に全線で再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599827?source=rss",
      "publishedAt": "2026-10-23T08:06:42.000Z",
      "xQuery": "JR内房線 11月9日に全線で再開"
    },
    {
      "time": "16:12",
      "title": "佐川急便で情報流出 最大5323万件",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599819?source=rss",
      "publishedAt": "2026-10-23T07:12:30.000Z",
      "xQuery": "佐川急便で情報流出 最大5323万件"
    },
    {
      "time": "15:54",
      "title": "ソウル市長 政治資金巡り逆転無罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599814?source=rss",
      "publishedAt": "2026-10-23T06:54:13.000Z",
      "xQuery": "ソウル市長 政治資金巡り逆転無罪"
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
