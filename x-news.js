window.LUS_X_NEWS = {
  "updatedAt": "2026-09-09T04:21:05.489Z",
  "items": [
    {
      "time": "12:06",
      "title": "西日本～東北で大雨続く 厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594731?source=rss",
      "publishedAt": "2026-09-09T03:06:29.000Z",
      "xQuery": "西日本～東北で大雨続く 厳重警戒"
    },
    {
      "time": "11:36",
      "title": "中露首脳が祝電 北朝鮮建国78周年",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594723?source=rss",
      "publishedAt": "2026-09-09T02:36:20.000Z",
      "xQuery": "中露首脳が祝電 北朝鮮建国78周年"
    },
    {
      "time": "12:18",
      "title": "NY市長 異例の労働者組織化支援",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594736?source=rss",
      "publishedAt": "2026-09-09T03:18:51.000Z",
      "xQuery": "NY市長 異例の労働者組織化支援"
    },
    {
      "time": "11:11",
      "title": "富士山 意識不明の登山者2人発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594722?source=rss",
      "publishedAt": "2026-09-09T02:11:44.000Z",
      "xQuery": "富士山 意識不明の登山者2人発見"
    },
    {
      "time": "13:06",
      "title": "元SB選手 宮地克彦容疑者を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594741?source=rss",
      "publishedAt": "2026-09-09T04:06:10.000Z",
      "xQuery": "元SB選手 宮地克彦容疑者を逮捕"
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
