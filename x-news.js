window.LUS_X_NEWS = {
  "updatedAt": "2026-11-17T09:36:21.139Z",
  "items": [
    {
      "time": "18:15",
      "title": "首相と露大統領 接触の方向で調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602931?source=rss",
      "publishedAt": "2026-11-17T09:15:40.000Z",
      "xQuery": "首相と露大統領 接触の方向で調整"
    },
    {
      "time": "16:21",
      "title": "米国防長官 12月の訪日で調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602913?source=rss",
      "publishedAt": "2026-11-17T07:21:52.000Z",
      "xQuery": "米国防長官 12月の訪日で調整"
    },
    {
      "time": "16:58",
      "title": "物議の選挙ポスター AIと認める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602918?source=rss",
      "publishedAt": "2026-11-17T07:58:54.000Z",
      "xQuery": "物議の選挙ポスター AIと認める"
    },
    {
      "time": "15:26",
      "title": "グルメフェス炎上 主催者2人直撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602907?source=rss",
      "publishedAt": "2026-11-17T06:26:10.000Z",
      "xQuery": "グルメフェス炎上 主催者2人直撃"
    },
    {
      "time": "17:37",
      "title": "閉山中に中国人遭難 懸賞金に指摘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602924?source=rss",
      "publishedAt": "2026-11-17T08:37:06.000Z",
      "xQuery": "閉山中に中国人遭難 懸賞金に指摘"
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
