window.LUS_X_NEWS = {
  "updatedAt": "2026-06-11T11:06:21.519Z",
  "items": [
    {
      "time": "17:53",
      "title": "皇族数確保「立法府の総意」とは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583838?source=rss",
      "publishedAt": "2026-06-11T08:53:50.000Z",
      "xQuery": "皇族数確保「立法府の総意」とは"
    },
    {
      "time": "19:03",
      "title": "河野洋平氏死去 麻生太郎氏が偲ぶ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583851?source=rss",
      "publishedAt": "2026-06-11T10:03:38.000Z",
      "xQuery": "河野洋平氏死去 麻生太郎氏が偲ぶ"
    },
    {
      "time": "19:06",
      "title": "高校生殺害疑い 男は元交際相手か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583852?source=rss",
      "publishedAt": "2026-06-11T10:06:35.000Z",
      "xQuery": "高校生殺害疑い 男は元交際相手か"
    },
    {
      "time": "19:25",
      "title": "ミャンマーで米大使館員が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583859?source=rss",
      "publishedAt": "2026-06-11T10:25:10.000Z",
      "xQuery": "ミャンマーで米大使館員が死亡"
    },
    {
      "time": "19:47",
      "title": "TDR「闇VIPツアー」業者を直撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583862?source=rss",
      "publishedAt": "2026-06-11T10:47:03.000Z",
      "xQuery": "TDR「闇VIPツアー」業者を直撃"
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
