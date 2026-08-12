window.LUS_X_NEWS = {
  "updatedAt": "2026-08-12T05:35:03.164Z",
  "items": [
    {
      "time": "13:28",
      "title": "九州や四国中心に厳しい暑さ 注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591427?source=rss",
      "publishedAt": "2026-08-12T04:28:32.000Z",
      "xQuery": "九州や四国中心に厳しい暑さ 注意"
    },
    {
      "time": "13:46",
      "title": "ウ 米側に対露戦争終結の計画案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591430?source=rss",
      "publishedAt": "2026-08-12T04:46:54.000Z",
      "xQuery": "ウ 米側に対露戦争終結の計画案"
    },
    {
      "time": "13:57",
      "title": "元厚労相・坂口力氏が死去 92歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591437?source=rss",
      "publishedAt": "2026-08-12T04:57:56.000Z",
      "xQuery": "元厚労相・坂口力氏が死去 92歳"
    },
    {
      "time": "13:46",
      "title": "日本の重慶総領事「代行」で就任",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591436?source=rss",
      "publishedAt": "2026-08-12T04:46:08.000Z",
      "xQuery": "日本の重慶総領事「代行」で就任"
    },
    {
      "time": "12:51",
      "title": "新幹線「独りぼっち席」が話題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591425?source=rss",
      "publishedAt": "2026-08-12T03:51:26.000Z",
      "xQuery": "新幹線「独りぼっち席」が話題"
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
