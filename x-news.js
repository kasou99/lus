window.LUS_X_NEWS = {
  "updatedAt": "2026-07-03T07:40:15.666Z",
  "items": [
    {
      "time": "15:17",
      "title": "米イラン 安保理で非難の応酬に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586584?source=rss",
      "publishedAt": "2026-07-03T06:17:56.000Z",
      "xQuery": "米イラン 安保理で非難の応酬に"
    },
    {
      "time": "13:39",
      "title": "米NYで42℃観測 当局が猛暑警報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586577?source=rss",
      "publishedAt": "2026-07-03T04:39:10.000Z",
      "xQuery": "米NYで42℃観測 当局が猛暑警報"
    },
    {
      "time": "15:32",
      "title": "横断歩道の9歳はねた疑い 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586586?source=rss",
      "publishedAt": "2026-07-03T06:32:11.000Z",
      "xQuery": "横断歩道の9歳はねた疑い 男逮捕"
    },
    {
      "time": "14:04",
      "title": "テスラ 米で6人乗りモデルYL発売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586580?source=rss",
      "publishedAt": "2026-07-03T05:04:01.000Z",
      "xQuery": "テスラ 米で6人乗りモデルYL発売"
    },
    {
      "time": "14:07",
      "title": "パルコが夏セール中止 背景は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586581?source=rss",
      "publishedAt": "2026-07-03T05:07:23.000Z",
      "xQuery": "パルコが夏セール中止 背景は"
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
