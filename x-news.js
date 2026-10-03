window.LUS_X_NEWS = {
  "updatedAt": "2026-10-03T18:15:13.716Z",
  "items": [
    {
      "time": "22:23",
      "title": "台風27号 小笠原諸島で高波警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597449?source=rss",
      "publishedAt": "2026-10-03T13:23:55.000Z",
      "xQuery": "台風27号 小笠原諸島で高波警戒"
    },
    {
      "time": "22:35",
      "title": "米政府のAI 都合の悪い質問を拒否",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597451?source=rss",
      "publishedAt": "2026-10-03T13:35:42.000Z",
      "xQuery": "米政府のAI 都合の悪い質問を拒否"
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
    },
    {
      "time": "22:57",
      "title": "米国産ジャガイモ解禁 前倒し浮上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597453?source=rss",
      "publishedAt": "2026-10-03T13:57:57.000Z",
      "xQuery": "米国産ジャガイモ解禁 前倒し浮上"
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
