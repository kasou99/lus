window.LUS_X_NEWS = {
  "updatedAt": "2026-06-14T11:44:55.486Z",
  "items": [
    {
      "time": "19:34",
      "title": "覚書締結後「海峡を即解放」草案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584239?source=rss",
      "publishedAt": "2026-06-14T10:34:54.000Z",
      "xQuery": "覚書締結後「海峡を即解放」草案"
    },
    {
      "time": "15:09",
      "title": "弱冷車広がり 電車の快適な温度は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584204?source=rss",
      "publishedAt": "2026-06-14T06:09:29.000Z",
      "xQuery": "弱冷車広がり 電車の快適な温度は"
    },
    {
      "time": "14:34",
      "title": "ボビー容疑者逮捕 事実違うと否認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584202?source=rss",
      "publishedAt": "2026-06-14T05:34:25.000Z",
      "xQuery": "ボビー容疑者逮捕 事実違うと否認"
    },
    {
      "time": "18:04",
      "title": "増える「ホビ垢」女子 実態は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584224?source=rss",
      "publishedAt": "2026-06-14T09:04:25.000Z",
      "xQuery": "増える「ホビ垢」女子 実態は"
    },
    {
      "time": "19:27",
      "title": "DAZNの料金表示巡る炎上 続く訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584236?source=rss",
      "publishedAt": "2026-06-14T10:27:48.000Z",
      "xQuery": "DAZNの料金表示巡る炎上 続く訳"
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
