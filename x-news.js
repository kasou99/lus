window.LUS_X_NEWS = {
  "updatedAt": "2026-07-12T07:21:57.038Z",
  "items": [
    {
      "time": "15:26",
      "title": "米軍 イラン軍施設140カ所を攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587674?source=rss",
      "publishedAt": "2026-07-12T06:26:37.000Z",
      "xQuery": "米軍 イラン軍施設140カ所を攻撃"
    },
    {
      "time": "15:24",
      "title": "自民 会期内の全法案成立目指す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587673?source=rss",
      "publishedAt": "2026-07-12T06:24:28.000Z",
      "xQuery": "自民 会期内の全法案成立目指す"
    },
    {
      "time": "15:55",
      "title": "女性警官を殴り鼻折った疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587678?source=rss",
      "publishedAt": "2026-07-12T06:55:17.000Z",
      "xQuery": "女性警官を殴り鼻折った疑い 逮捕"
    },
    {
      "time": "14:32",
      "title": "トラックと車が衝突 中学生が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587669?source=rss",
      "publishedAt": "2026-07-12T05:32:13.000Z",
      "xQuery": "トラックと車が衝突 中学生が死亡"
    },
    {
      "time": "16:08",
      "title": "水上バイク3人転落 16歳女性不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587681?source=rss",
      "publishedAt": "2026-07-12T07:08:45.000Z",
      "xQuery": "水上バイク3人転落 16歳女性不明"
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
