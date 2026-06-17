window.LUS_X_NEWS = {
  "updatedAt": "2026-06-17T01:19:11.147Z",
  "items": [
    {
      "time": "10:11",
      "title": "知床沈没事故 社長に禁錮5年判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584553?source=rss",
      "publishedAt": "2026-06-17T01:11:43.000Z",
      "xQuery": "知床沈没事故 社長に禁錮5年判決"
    },
    {
      "time": "08:46",
      "title": "ホワイトハウスのイベ巡り5人訴追",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584543?source=rss",
      "publishedAt": "2026-06-16T23:46:42.000Z",
      "xQuery": "ホワイトハウスのイベ巡り5人訴追"
    },
    {
      "time": "08:33",
      "title": "エボラ出血熱流行 終息見通せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584541?source=rss",
      "publishedAt": "2026-06-16T23:33:12.000Z",
      "xQuery": "エボラ出血熱流行 終息見通せず"
    },
    {
      "time": "07:50",
      "title": "自宅敷地内に突然クマ 男性けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584537?source=rss",
      "publishedAt": "2026-06-16T22:50:21.000Z",
      "xQuery": "自宅敷地内に突然クマ 男性けが"
    },
    {
      "time": "07:32",
      "title": "ピザハット売却へ 米飲食大手",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584535?source=rss",
      "publishedAt": "2026-06-16T22:32:04.000Z",
      "xQuery": "ピザハット売却へ 米飲食大手"
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
