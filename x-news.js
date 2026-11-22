window.LUS_X_NEWS = {
  "updatedAt": "2026-11-22T17:35:27.235Z",
  "items": [
    {
      "time": "21:43",
      "title": "COP31合意採択断念 EUなど反対",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603603?source=rss",
      "publishedAt": "2026-11-22T12:43:52.000Z",
      "xQuery": "COP31合意採択断念 EUなど反対"
    },
    {
      "time": "21:39",
      "title": "文科相の「交代示唆」木原氏否定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603601?source=rss",
      "publishedAt": "2026-11-22T12:39:35.000Z",
      "xQuery": "文科相の「交代示唆」木原氏否定"
    },
    {
      "time": "23:22",
      "title": "参政党が首長選に積極擁立 狙い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603611?source=rss",
      "publishedAt": "2026-11-22T14:22:39.000Z",
      "xQuery": "参政党が首長選に積極擁立 狙い"
    },
    {
      "time": "22:36",
      "title": "社員を監禁疑い 社長ら4人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603608?source=rss",
      "publishedAt": "2026-11-22T13:36:08.000Z",
      "xQuery": "社員を監禁疑い 社長ら4人逮捕"
    },
    {
      "time": "22:45",
      "title": "アンソロピックIPO巡り銀行に制約",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603609?source=rss",
      "publishedAt": "2026-11-22T13:45:03.000Z",
      "xQuery": "アンソロピックIPO巡り銀行に制約"
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
