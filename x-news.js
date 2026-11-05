window.LUS_X_NEWS = {
  "updatedAt": "2026-11-05T19:35:12.225Z",
  "items": [
    {
      "time": "21:57",
      "title": "露 JT資産を同国企業の管理下に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601467?source=rss",
      "publishedAt": "2026-11-05T12:57:53.000Z",
      "xQuery": "露 JT資産を同国企業の管理下に"
    },
    {
      "time": "20:11",
      "title": "めぐみさん拉致 母「会いたい」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601458?source=rss",
      "publishedAt": "2026-11-05T11:11:25.000Z",
      "xQuery": "めぐみさん拉致 母「会いたい」"
    },
    {
      "time": "20:08",
      "title": "自転車の青切符 半年で約1.6万件",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601460?source=rss",
      "publishedAt": "2026-11-05T11:08:11.000Z",
      "xQuery": "自転車の青切符 半年で約1.6万件"
    },
    {
      "time": "23:40",
      "title": "蔵内前議長 条件尽くしの異例会見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601474?source=rss",
      "publishedAt": "2026-11-05T14:40:30.000Z",
      "xQuery": "蔵内前議長 条件尽くしの異例会見"
    },
    {
      "time": "22:52",
      "title": "日本製紙 八代工場の紙生産断念へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601473?source=rss",
      "publishedAt": "2026-11-05T13:52:04.000Z",
      "xQuery": "日本製紙 八代工場の紙生産断念へ"
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
