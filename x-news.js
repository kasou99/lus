window.LUS_X_NEWS = {
  "updatedAt": "2026-05-24T05:28:06.136Z",
  "items": [
    {
      "time": "13:45",
      "title": "ホルムズ再開含む合意近づく 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581481?source=rss",
      "publishedAt": "2026-05-24T04:45:48.000Z",
      "xQuery": "ホルムズ再開含む合意近づく 報道"
    },
    {
      "time": "13:54",
      "title": "米大統領警護隊 発砲容疑者を射殺",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581482?source=rss",
      "publishedAt": "2026-05-24T04:54:20.000Z",
      "xQuery": "米大統領警護隊 発砲容疑者を射殺"
    },
    {
      "time": "11:15",
      "title": "動物園職員 数カ月前から絞殺検索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581469?source=rss",
      "publishedAt": "2026-05-24T02:15:27.000Z",
      "xQuery": "動物園職員 数カ月前から絞殺検索"
    },
    {
      "time": "12:43",
      "title": "ゾンビたばこ後悔 気づけば手遅れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581476?source=rss",
      "publishedAt": "2026-05-24T03:43:04.000Z",
      "xQuery": "ゾンビたばこ後悔 気づけば手遅れ"
    },
    {
      "time": "13:30",
      "title": "撮影で人殺到 希少野鳥が営巣放棄",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581478?source=rss",
      "publishedAt": "2026-05-24T04:30:42.000Z",
      "xQuery": "撮影で人殺到 希少野鳥が営巣放棄"
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
