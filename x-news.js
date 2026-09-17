window.LUS_X_NEWS = {
  "updatedAt": "2026-09-17T14:40:27.734Z",
  "items": [
    {
      "time": "23:10",
      "title": "第2次改造内閣 林芳正氏なぜ閣外",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595637?source=rss",
      "publishedAt": "2026-09-17T14:10:12.000Z",
      "xQuery": "第2次改造内閣 林芳正氏なぜ閣外"
    },
    {
      "time": "22:46",
      "title": "福岡で3つの第三者委 費用2.2億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595635?source=rss",
      "publishedAt": "2026-09-17T13:46:58.000Z",
      "xQuery": "福岡で3つの第三者委 費用2.2億円"
    },
    {
      "time": "20:30",
      "title": "店で従業員刺され死亡 元夫を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595627?source=rss",
      "publishedAt": "2026-09-17T11:30:19.000Z",
      "xQuery": "店で従業員刺され死亡 元夫を逮捕"
    },
    {
      "time": "22:50",
      "title": "遺失物の高級腕時計 警察が誤売却",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595638?source=rss",
      "publishedAt": "2026-09-17T13:50:27.000Z",
      "xQuery": "遺失物の高級腕時計 警察が誤売却"
    },
    {
      "time": "18:54",
      "title": "四国初の「マリオット」開業へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595615?source=rss",
      "publishedAt": "2026-09-17T09:54:23.000Z",
      "xQuery": "四国初の「マリオット」開業へ"
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
