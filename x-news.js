window.LUS_X_NEWS = {
  "updatedAt": "2026-05-27T05:38:03.968Z",
  "items": [
    {
      "time": "14:23",
      "title": "スパイ対策本格化 国会前で抗議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581889?source=rss",
      "publishedAt": "2026-05-27T05:23:58.000Z",
      "xQuery": "スパイ対策本格化 国会前で抗議"
    },
    {
      "time": "11:49",
      "title": "イスラエル レバノン地上作戦拡大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581870?source=rss",
      "publishedAt": "2026-05-27T02:49:34.000Z",
      "xQuery": "イスラエル レバノン地上作戦拡大"
    },
    {
      "time": "13:44",
      "title": "日系企業の米工場で爆発 死傷多数",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581883?source=rss",
      "publishedAt": "2026-05-27T04:44:13.000Z",
      "xQuery": "日系企業の米工場で爆発 死傷多数"
    },
    {
      "time": "14:02",
      "title": "銃撃事件 山健組組長の無罪確定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581885?source=rss",
      "publishedAt": "2026-05-27T05:02:14.000Z",
      "xQuery": "銃撃事件 山健組組長の無罪確定"
    },
    {
      "time": "13:21",
      "title": "旭川17歳殺害 共謀の女が状況証言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581879?source=rss",
      "publishedAt": "2026-05-27T04:21:34.000Z",
      "xQuery": "旭川17歳殺害 共謀の女が状況証言"
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
