window.LUS_X_NEWS = {
  "updatedAt": "2026-09-14T15:40:07.747Z",
  "items": [
    {
      "time": "22:41",
      "title": "高市氏の人事調整 林氏の処遇焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595302?source=rss",
      "publishedAt": "2026-09-14T13:41:47.000Z",
      "xQuery": "高市氏の人事調整 林氏の処遇焦点"
    },
    {
      "time": "22:32",
      "title": "AIの開発ペース「減速」は可能?",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595300?source=rss",
      "publishedAt": "2026-09-14T13:32:01.000Z",
      "xQuery": "AIの開発ペース「減速」は可能?"
    },
    {
      "time": "22:00",
      "title": "辺野古転覆 引率教師語る「胸中」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595299?source=rss",
      "publishedAt": "2026-09-14T13:00:10.000Z",
      "xQuery": "辺野古転覆 引率教師語る「胸中」"
    },
    {
      "time": "21:51",
      "title": "光通信 レオパレス21にTOB実施",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595298?source=rss",
      "publishedAt": "2026-09-14T12:51:42.000Z",
      "xQuery": "光通信 レオパレス21にTOB実施"
    },
    {
      "time": "21:03",
      "title": "タイ 邦人のビザなし滞在期間短縮",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595293?source=rss",
      "publishedAt": "2026-09-14T12:03:59.000Z",
      "xQuery": "タイ 邦人のビザなし滞在期間短縮"
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
