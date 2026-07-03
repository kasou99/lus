window.LUS_X_NEWS = {
  "updatedAt": "2026-07-03T09:12:03.730Z",
  "items": [
    {
      "time": "17:46",
      "title": "「エルニーニョ」発生 WMO発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586606?source=rss",
      "publishedAt": "2026-07-03T08:46:27.000Z",
      "xQuery": "「エルニーニョ」発生 WMO発表"
    },
    {
      "time": "17:14",
      "title": "セブン リサイクル委託料で未払い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586595?source=rss",
      "publishedAt": "2026-07-03T08:14:27.000Z",
      "xQuery": "セブン リサイクル委託料で未払い"
    },
    {
      "time": "17:48",
      "title": "れいわ・山本太郎氏 法定速度違反",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586608?source=rss",
      "publishedAt": "2026-07-03T08:48:58.000Z",
      "xQuery": "れいわ・山本太郎氏 法定速度違反"
    },
    {
      "time": "16:44",
      "title": "ボビー容疑者 不同意性交罪で起訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586592?source=rss",
      "publishedAt": "2026-07-03T07:44:29.000Z",
      "xQuery": "ボビー容疑者 不同意性交罪で起訴"
    },
    {
      "time": "17:29",
      "title": "1等・5億円が同じ売場で2本 ロト6",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586600?source=rss",
      "publishedAt": "2026-07-03T08:29:10.000Z",
      "xQuery": "1等・5億円が同じ売場で2本 ロト6"
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
