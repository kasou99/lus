window.LUS_X_NEWS = {
  "updatedAt": "2026-08-06T00:41:56.212Z",
  "items": [
    {
      "time": "08:59",
      "title": "平和祈念式 広島市長の宣言全文",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590690?source=rss",
      "publishedAt": "2026-08-05T23:59:30.000Z",
      "xQuery": "平和祈念式 広島市長の宣言全文"
    },
    {
      "time": "08:19",
      "title": "イラン トランプ氏に攻撃自制促す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590683?source=rss",
      "publishedAt": "2026-08-05T23:19:37.000Z",
      "xQuery": "イラン トランプ氏に攻撃自制促す"
    },
    {
      "time": "08:35",
      "title": "消費減税 日本の社会保障は岐路に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590685?source=rss",
      "publishedAt": "2026-08-05T23:35:00.000Z",
      "xQuery": "消費減税 日本の社会保障は岐路に"
    },
    {
      "time": "09:21",
      "title": "工場で高さ4.3mから転落 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590692?source=rss",
      "publishedAt": "2026-08-06T00:21:38.000Z",
      "xQuery": "工場で高さ4.3mから転落 死亡"
    },
    {
      "time": "07:38",
      "title": "株投資で若年男性が自信喪失か 米",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590681?source=rss",
      "publishedAt": "2026-08-05T22:38:47.000Z",
      "xQuery": "株投資で若年男性が自信喪失か 米"
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
