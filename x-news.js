window.LUS_X_NEWS = {
  "updatedAt": "2026-10-28T10:36:41.969Z",
  "items": [
    {
      "time": "18:51",
      "title": "29日朝 各地で今季一番の冷え込み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600461?source=rss",
      "publishedAt": "2026-10-28T09:51:16.000Z",
      "xQuery": "29日朝 各地で今季一番の冷え込み"
    },
    {
      "time": "19:20",
      "title": "スペインで列車衝突 10人死亡か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600464?source=rss",
      "publishedAt": "2026-10-28T10:20:41.000Z",
      "xQuery": "スペインで列車衝突 10人死亡か"
    },
    {
      "time": "18:07",
      "title": "プルデンシャル 新たな不正事案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600452?source=rss",
      "publishedAt": "2026-10-28T09:07:38.000Z",
      "xQuery": "プルデンシャル 新たな不正事案"
    },
    {
      "time": "18:25",
      "title": "利根川で14歳流され行方不明 群馬",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600459?source=rss",
      "publishedAt": "2026-10-28T09:25:42.000Z",
      "xQuery": "利根川で14歳流され行方不明 群馬"
    },
    {
      "time": "16:27",
      "title": "つるされた鉄の棒が直撃 意識不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600437?source=rss",
      "publishedAt": "2026-10-28T07:27:07.000Z",
      "xQuery": "つるされた鉄の棒が直撃 意識不明"
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
