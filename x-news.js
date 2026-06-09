window.LUS_X_NEWS = {
  "updatedAt": "2026-06-09T05:32:01.089Z",
  "items": [
    {
      "time": "14:12",
      "title": "米との合意近かった イラン高官",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583551?source=rss",
      "publishedAt": "2026-06-09T05:12:08.000Z",
      "xQuery": "米との合意近かった イラン高官"
    },
    {
      "time": "13:42",
      "title": "男系男子養子案 旧宮家三男の本音",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583549?source=rss",
      "publishedAt": "2026-06-09T04:42:22.000Z",
      "xQuery": "男系男子養子案 旧宮家三男の本音"
    },
    {
      "time": "12:48",
      "title": "自民 総務会で国旗損壊罪法案了承",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583543?source=rss",
      "publishedAt": "2026-06-09T03:48:07.000Z",
      "xQuery": "自民 総務会で国旗損壊罪法案了承"
    },
    {
      "time": "13:29",
      "title": "商業施設8人搬送はスプレー原因か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583548?source=rss",
      "publishedAt": "2026-06-09T04:29:33.000Z",
      "xQuery": "商業施設8人搬送はスプレー原因か"
    },
    {
      "time": "12:04",
      "title": "肝試しで「廃墟」入る 人骨を発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583538?source=rss",
      "publishedAt": "2026-06-09T03:04:14.000Z",
      "xQuery": "肝試しで「廃墟」入る 人骨を発見"
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
