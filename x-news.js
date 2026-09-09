window.LUS_X_NEWS = {
  "updatedAt": "2026-09-09T09:40:42.000Z",
  "items": [
    {
      "time": "18:12",
      "title": "東海や関東 9日夜にかけ大雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594772?source=rss",
      "publishedAt": "2026-09-09T09:12:05.000Z",
      "xQuery": "東海や関東 9日夜にかけ大雨恐れ"
    },
    {
      "time": "12:48",
      "title": "米大統領 独極右AfDの勝利を絶賛",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594739?source=rss",
      "publishedAt": "2026-09-09T03:48:21.000Z",
      "xQuery": "米大統領 独極右AfDの勝利を絶賛"
    },
    {
      "time": "17:19",
      "title": "男児が海に流され行方不明 神奈川",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594763?source=rss",
      "publishedAt": "2026-09-09T08:19:02.000Z",
      "xQuery": "男児が海に流され行方不明 神奈川"
    },
    {
      "time": "16:35",
      "title": "丸亀製麺の運営会社に勧告 公取委",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594758?source=rss",
      "publishedAt": "2026-09-09T07:35:17.000Z",
      "xQuery": "丸亀製麺の運営会社に勧告 公取委"
    },
    {
      "time": "17:38",
      "title": "6歳不明 約10台のドラレコを解析",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594766?source=rss",
      "publishedAt": "2026-09-09T08:38:12.000Z",
      "xQuery": "6歳不明 約10台のドラレコを解析"
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
