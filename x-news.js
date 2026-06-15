window.LUS_X_NEWS = {
  "updatedAt": "2026-06-15T08:24:18.983Z",
  "items": [
    {
      "time": "15:43",
      "title": "米イラン合意 イスラエル反応せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584335?source=rss",
      "publishedAt": "2026-06-15T06:43:04.000Z",
      "xQuery": "米イラン合意 イスラエル反応せず"
    },
    {
      "time": "16:13",
      "title": "東証終値6万9317円 最高値を更新",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584337?source=rss",
      "publishedAt": "2026-06-15T07:13:43.000Z",
      "xQuery": "東証終値6万9317円 最高値を更新"
    },
    {
      "time": "17:12",
      "title": "茨城・下妻市長 遺体で発見される",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584346?source=rss",
      "publishedAt": "2026-06-15T08:12:26.000Z",
      "xQuery": "茨城・下妻市長 遺体で発見される"
    },
    {
      "time": "15:14",
      "title": "ヘリ衝突で6人死亡 米歌手犠牲か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584327?source=rss",
      "publishedAt": "2026-06-15T06:14:49.000Z",
      "xQuery": "ヘリ衝突で6人死亡 米歌手犠牲か"
    },
    {
      "time": "16:52",
      "title": "オリにクマかかるも山に返す 兵庫",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584344?source=rss",
      "publishedAt": "2026-06-15T07:52:16.000Z",
      "xQuery": "オリにクマかかるも山に返す 兵庫"
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
