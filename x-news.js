window.LUS_X_NEWS = {
  "updatedAt": "2026-05-25T07:51:02.006Z",
  "items": [
    {
      "time": "15:39",
      "title": "日経平均株価 終値初の6万5千円超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581616?source=rss",
      "publishedAt": "2026-05-25T06:39:27.000Z",
      "xQuery": "日経平均株価 終値初の6万5千円超"
    },
    {
      "time": "15:52",
      "title": "中国側の軍国主義主張 木原氏反論",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581617?source=rss",
      "publishedAt": "2026-05-25T06:52:23.000Z",
      "xQuery": "中国側の軍国主義主張 木原氏反論"
    },
    {
      "time": "16:12",
      "title": "GINZA SIXで噴射 カプサイシンか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581625?source=rss",
      "publishedAt": "2026-05-25T07:12:10.000Z",
      "xQuery": "GINZA SIXで噴射 カプサイシンか"
    },
    {
      "time": "15:54",
      "title": "トラクターが約7m転落か 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581619?source=rss",
      "publishedAt": "2026-05-25T06:54:39.000Z",
      "xQuery": "トラクターが約7m転落か 男性死亡"
    },
    {
      "time": "15:42",
      "title": "ドコモ 590億円規模の土地売却",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581615?source=rss",
      "publishedAt": "2026-05-25T06:42:55.000Z",
      "xQuery": "ドコモ 590億円規模の土地売却"
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
