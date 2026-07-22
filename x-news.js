window.LUS_X_NEWS = {
  "updatedAt": "2026-07-22T04:38:04.858Z",
  "items": [
    {
      "time": "11:56",
      "title": "文科省 私大に資産運用を促す方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588876?source=rss",
      "publishedAt": "2026-07-22T02:56:11.000Z",
      "xQuery": "文科省 私大に資産運用を促す方針"
    },
    {
      "time": "12:53",
      "title": "北海道・十勝岳が噴火 ごく小規模",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588883?source=rss",
      "publishedAt": "2026-07-22T03:53:24.000Z",
      "xQuery": "北海道・十勝岳が噴火 ごく小規模"
    },
    {
      "time": "13:20",
      "title": "住宅全焼4遺体 住人と連絡取れず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588884?source=rss",
      "publishedAt": "2026-07-22T04:20:10.000Z",
      "xQuery": "住宅全焼4遺体 住人と連絡取れず"
    },
    {
      "time": "13:21",
      "title": "運転手不足 自動運転実用化の課題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588886?source=rss",
      "publishedAt": "2026-07-22T04:21:37.000Z",
      "xQuery": "運転手不足 自動運転実用化の課題"
    },
    {
      "time": "11:48",
      "title": "出社とテレワーク 不公平感の背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588871?source=rss",
      "publishedAt": "2026-07-22T02:48:47.000Z",
      "xQuery": "出社とテレワーク 不公平感の背景"
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
