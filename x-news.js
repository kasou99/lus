window.LUS_X_NEWS = {
  "updatedAt": "2026-10-28T11:36:37.832Z",
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
      "time": "20:23",
      "title": "スペインで列車衝突 30人死亡か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600470?source=rss",
      "publishedAt": "2026-10-28T11:23:33.000Z",
      "xQuery": "スペインで列車衝突 30人死亡か"
    },
    {
      "time": "18:01",
      "title": "女性殺害疑い 死亡の男を書類送検",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600450?source=rss",
      "publishedAt": "2026-10-28T09:01:01.000Z",
      "xQuery": "女性殺害疑い 死亡の男を書類送検"
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
      "time": "18:15",
      "title": "小型恐竜の骨格標本 75億円で落札",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600458?source=rss",
      "publishedAt": "2026-10-28T09:15:30.000Z",
      "xQuery": "小型恐竜の骨格標本 75億円で落札"
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
