window.LUS_X_NEWS = {
  "updatedAt": "2026-06-24T22:36:18.591Z",
  "items": [
    {
      "time": "07:32",
      "title": "地震情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6580294?source=rss",
      "publishedAt": "2026-06-24T22:32:41.000Z",
      "xQuery": "地震情報"
    },
    {
      "time": "07:22",
      "title": "九州北部 災害級の大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585546?source=rss",
      "publishedAt": "2026-06-24T22:22:12.000Z",
      "xQuery": "九州北部 災害級の大雨の恐れ"
    },
    {
      "time": "06:55",
      "title": "検察審査員の氏名が外部流出 山口",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585542?source=rss",
      "publishedAt": "2026-06-24T21:55:19.000Z",
      "xQuery": "検察審査員の氏名が外部流出 山口"
    },
    {
      "time": "23:39",
      "title": "中国で拘束の2人は富士電機社員",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585538?source=rss",
      "publishedAt": "2026-06-24T14:39:25.000Z",
      "xQuery": "中国で拘束の2人は富士電機社員"
    },
    {
      "time": "07:24",
      "title": "教師殴りけがさせた疑い 生徒逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585544?source=rss",
      "publishedAt": "2026-06-24T22:24:49.000Z",
      "xQuery": "教師殴りけがさせた疑い 生徒逮捕"
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
