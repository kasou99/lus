window.LUS_X_NEWS = {
  "updatedAt": "2026-06-25T02:25:36.681Z",
  "items": [
    {
      "time": "09:56",
      "title": "東・西日本で広く激しい雨 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585567?source=rss",
      "publishedAt": "2026-06-25T00:56:33.000Z",
      "xQuery": "東・西日本で広く激しい雨 警戒を"
    },
    {
      "time": "10:20",
      "title": "1週間程度は震度6強程度に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585572?source=rss",
      "publishedAt": "2026-06-25T01:20:18.000Z",
      "xQuery": "1週間程度は震度6強程度に注意"
    },
    {
      "time": "10:23",
      "title": "地震 盛岡は「ドカドカと揺れた」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585573?source=rss",
      "publishedAt": "2026-06-25T01:23:32.000Z",
      "xQuery": "地震 盛岡は「ドカドカと揺れた」"
    },
    {
      "time": "10:54",
      "title": "自転車の高校生 車にはねられ死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585576?source=rss",
      "publishedAt": "2026-06-25T01:54:44.000Z",
      "xQuery": "自転車の高校生 車にはねられ死亡"
    },
    {
      "time": "10:08",
      "title": "生徒会長を「つるし上げ」いじめ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585569?source=rss",
      "publishedAt": "2026-06-25T01:08:47.000Z",
      "xQuery": "生徒会長を「つるし上げ」いじめ"
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
