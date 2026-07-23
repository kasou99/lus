window.LUS_X_NEWS = {
  "updatedAt": "2026-07-23T21:28:04.495Z",
  "items": [
    {
      "time": "06:09",
      "title": "元日本赤軍 岡本公三容疑者が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589085?source=rss",
      "publishedAt": "2026-07-23T21:09:15.000Z",
      "xQuery": "元日本赤軍 岡本公三容疑者が死亡"
    },
    {
      "time": "23:10",
      "title": "愛媛2行 経営統合に向け最終調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589080?source=rss",
      "publishedAt": "2026-07-23T14:10:00.000Z",
      "xQuery": "愛媛2行 経営統合に向け最終調整"
    },
    {
      "time": "17:23",
      "title": "遺体発見 JFE事故の作業員と判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589036?source=rss",
      "publishedAt": "2026-07-23T08:23:25.000Z",
      "xQuery": "遺体発見 JFE事故の作業員と判明"
    },
    {
      "time": "21:38",
      "title": "山岳部の女子高校生 奥穂高で滑落",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589072?source=rss",
      "publishedAt": "2026-07-23T12:38:37.000Z",
      "xQuery": "山岳部の女子高校生 奥穂高で滑落"
    },
    {
      "time": "23:00",
      "title": "刃物を持った男に警官が発砲 映像",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589078?source=rss",
      "publishedAt": "2026-07-23T14:00:46.000Z",
      "xQuery": "刃物を持った男に警官が発砲 映像"
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
