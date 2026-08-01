window.LUS_X_NEWS = {
  "updatedAt": "2026-08-01T11:51:48.050Z",
  "items": [
    {
      "time": "19:31",
      "title": "避難者2200人規模受け入れへ 調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590181?source=rss",
      "publishedAt": "2026-08-01T10:31:28.000Z",
      "xQuery": "避難者2200人規模受け入れへ 調整"
    },
    {
      "time": "18:54",
      "title": "ベトナム人5人がれきから女性救出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590175?source=rss",
      "publishedAt": "2026-08-01T09:54:51.000Z",
      "xQuery": "ベトナム人5人がれきから女性救出"
    },
    {
      "time": "19:49",
      "title": "2歳が行方不明 祖母の家に帰省中",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590182?source=rss",
      "publishedAt": "2026-08-01T10:49:40.000Z",
      "xQuery": "2歳が行方不明 祖母の家に帰省中"
    },
    {
      "time": "20:21",
      "title": "千葉爆発 未明に「ガスくさい」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590186?source=rss",
      "publishedAt": "2026-08-01T11:21:47.000Z",
      "xQuery": "千葉爆発 未明に「ガスくさい」"
    },
    {
      "time": "17:08",
      "title": "原点知って 長岡花火マナーに懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590158?source=rss",
      "publishedAt": "2026-08-01T08:08:35.000Z",
      "xQuery": "原点知って 長岡花火マナーに懸念"
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
