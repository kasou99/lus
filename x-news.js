window.LUS_X_NEWS = {
  "updatedAt": "2026-08-07T12:50:06.872Z",
  "items": [
    {
      "time": "20:58",
      "title": "台風15号 来週に東・北日本接近か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590888?source=rss",
      "publishedAt": "2026-08-07T11:58:18.000Z",
      "xQuery": "台風15号 来週に東・北日本接近か"
    },
    {
      "time": "20:03",
      "title": "81年前 6歳の私かばい死んだ祖母",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590895?source=rss",
      "publishedAt": "2026-08-07T11:03:26.000Z",
      "xQuery": "81年前 6歳の私かばい死んだ祖母"
    },
    {
      "time": "21:05",
      "title": "蓮池薫さんの母・ハツイさん死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590902?source=rss",
      "publishedAt": "2026-08-07T12:05:42.000Z",
      "xQuery": "蓮池薫さんの母・ハツイさん死去"
    },
    {
      "time": "17:00",
      "title": "米「出産旅行」禁止 大統領令署名",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590874?source=rss",
      "publishedAt": "2026-08-07T08:00:23.000Z",
      "xQuery": "米「出産旅行」禁止 大統領令署名"
    },
    {
      "time": "21:26",
      "title": "江別暴行で無期判決 諭した裁判長",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590901?source=rss",
      "publishedAt": "2026-08-07T12:26:16.000Z",
      "xQuery": "江別暴行で無期判決 諭した裁判長"
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
