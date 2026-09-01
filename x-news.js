window.LUS_X_NEWS = {
  "updatedAt": "2026-09-01T11:36:50.047Z",
  "items": [
    {
      "time": "16:43",
      "title": "ガソリン補助に6136億円 閣議決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593867?source=rss",
      "publishedAt": "2026-09-01T07:43:51.000Z",
      "xQuery": "ガソリン補助に6136億円 閣議決定"
    },
    {
      "time": "18:10",
      "title": "ネパール土石流 観光への影響懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593880?source=rss",
      "publishedAt": "2026-09-01T09:10:16.000Z",
      "xQuery": "ネパール土石流 観光への影響懸念"
    },
    {
      "time": "19:32",
      "title": "悔しい 性被害訴える女性検事退職",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593891?source=rss",
      "publishedAt": "2026-09-01T10:32:47.000Z",
      "xQuery": "悔しい 性被害訴える女性検事退職"
    },
    {
      "time": "17:25",
      "title": "みんなで大家さん 事実上の終了へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593873?source=rss",
      "publishedAt": "2026-09-01T08:25:20.000Z",
      "xQuery": "みんなで大家さん 事実上の終了へ"
    },
    {
      "time": "19:02",
      "title": "上高地のバス大混雑 需要が過多",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593888?source=rss",
      "publishedAt": "2026-09-01T10:02:29.000Z",
      "xQuery": "上高地のバス大混雑 需要が過多"
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
