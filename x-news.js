window.LUS_X_NEWS = {
  "updatedAt": "2026-09-21T08:28:14.326Z",
  "items": [
    {
      "time": "13:44",
      "title": "東京・大島町に土砂災害特別警報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596012?source=rss",
      "publishedAt": "2026-09-21T04:44:03.000Z",
      "xQuery": "東京・大島町に土砂災害特別警報"
    },
    {
      "time": "15:43",
      "title": "気象庁「22日明け方まで警戒を」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596025?source=rss",
      "publishedAt": "2026-09-21T06:43:25.000Z",
      "xQuery": "気象庁「22日明け方まで警戒を」"
    },
    {
      "time": "14:08",
      "title": "台風25号 今後の見通しや最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596016?source=rss",
      "publishedAt": "2026-09-21T05:08:33.000Z",
      "xQuery": "台風25号 今後の見通しや最新情報"
    },
    {
      "time": "16:13",
      "title": "横須賀で土砂崩れ 1人生き埋めか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596029?source=rss",
      "publishedAt": "2026-09-21T07:13:42.000Z",
      "xQuery": "横須賀で土砂崩れ 1人生き埋めか"
    },
    {
      "time": "16:26",
      "title": "琵琶湖で男性3人が行方不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596033?source=rss",
      "publishedAt": "2026-09-21T07:26:09.000Z",
      "xQuery": "琵琶湖で男性3人が行方不明"
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
