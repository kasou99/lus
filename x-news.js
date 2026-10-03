window.LUS_X_NEWS = {
  "updatedAt": "2026-10-03T13:49:29.421Z",
  "items": [
    {
      "time": "20:41",
      "title": "4人死亡の火災 玄関付近が火元か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597434?source=rss",
      "publishedAt": "2026-10-03T11:41:07.000Z",
      "xQuery": "4人死亡の火災 玄関付近が火元か"
    },
    {
      "time": "21:52",
      "title": "MacのOSを修正へ AIリスク対策",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597441?source=rss",
      "publishedAt": "2026-10-03T12:52:45.000Z",
      "xQuery": "MacのOSを修正へ AIリスク対策"
    },
    {
      "time": "20:02",
      "title": "アプリで家事分担を可視化 市実験",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597431?source=rss",
      "publishedAt": "2026-10-03T11:02:09.000Z",
      "xQuery": "アプリで家事分担を可視化 市実験"
    },
    {
      "time": "20:37",
      "title": "23階転落 母が「転落しそう」通報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597435?source=rss",
      "publishedAt": "2026-10-03T11:37:54.000Z",
      "xQuery": "23階転落 母が「転落しそう」通報"
    },
    {
      "time": "22:05",
      "title": "だんじりが横転し7人けが 転落か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597447?source=rss",
      "publishedAt": "2026-10-03T13:05:29.000Z",
      "xQuery": "だんじりが横転し7人けが 転落か"
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
