window.LUS_X_NEWS = {
  "updatedAt": "2026-09-10T05:17:42.833Z",
  "items": [
    {
      "time": "12:10",
      "title": "太平洋側 午後に雨の範囲広がる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594838?source=rss",
      "publishedAt": "2026-09-10T03:10:08.000Z",
      "xQuery": "太平洋側 午後に雨の範囲広がる"
    },
    {
      "time": "12:56",
      "title": "新名神6人死亡 被告に拘禁7年求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594845?source=rss",
      "publishedAt": "2026-09-10T03:56:05.000Z",
      "xQuery": "新名神6人死亡 被告に拘禁7年求刑"
    },
    {
      "time": "13:46",
      "title": "党勝利なら77万円支給 トランプ氏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594850?source=rss",
      "publishedAt": "2026-09-10T04:46:04.000Z",
      "xQuery": "党勝利なら77万円支給 トランプ氏"
    },
    {
      "time": "14:08",
      "title": "行方不明の男児を海で発見 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594853?source=rss",
      "publishedAt": "2026-09-10T05:08:04.000Z",
      "xQuery": "行方不明の男児を海で発見 死亡"
    },
    {
      "time": "13:48",
      "title": "国道陥没 車がはまり運転男性けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594849?source=rss",
      "publishedAt": "2026-09-10T04:48:22.000Z",
      "xQuery": "国道陥没 車がはまり運転男性けが"
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
