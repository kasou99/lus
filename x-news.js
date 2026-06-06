window.LUS_X_NEWS = {
  "updatedAt": "2026-06-06T20:32:48.687Z",
  "items": [
    {
      "time": "00:06",
      "title": "宮崎 線状降水帯発生の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583240?source=rss",
      "publishedAt": "2026-06-06T15:06:43.000Z",
      "xQuery": "宮崎 線状降水帯発生の恐れ"
    },
    {
      "time": "21:48",
      "title": "「飛鳥・藤原」地元たゆまぬ努力",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583227?source=rss",
      "publishedAt": "2026-06-06T12:48:37.000Z",
      "xQuery": "「飛鳥・藤原」地元たゆまぬ努力"
    },
    {
      "time": "22:46",
      "title": "京都で米20歳不明 両親に支援の輪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583235?source=rss",
      "publishedAt": "2026-06-06T13:46:15.000Z",
      "xQuery": "京都で米20歳不明 両親に支援の輪"
    },
    {
      "time": "22:40",
      "title": "詐欺G幹部の日本人か タイで拘束",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583233?source=rss",
      "publishedAt": "2026-06-06T13:40:41.000Z",
      "xQuery": "詐欺G幹部の日本人か タイで拘束"
    },
    {
      "time": "23:04",
      "title": "豪産小麦が収穫減へ うどん影響か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583237?source=rss",
      "publishedAt": "2026-06-06T14:04:33.000Z",
      "xQuery": "豪産小麦が収穫減へ うどん影響か"
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
