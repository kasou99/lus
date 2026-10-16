window.LUS_X_NEWS = {
  "updatedAt": "2026-10-16T22:38:23.697Z",
  "items": [
    {
      "time": "22:54",
      "title": "緊急地震速報取り消し 2つの要因",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599044?source=rss",
      "publishedAt": "2026-10-16T13:54:50.000Z",
      "xQuery": "緊急地震速報取り消し 2つの要因"
    },
    {
      "time": "07:35",
      "title": "米大統領報道官 わずか5日で解任",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599054?source=rss",
      "publishedAt": "2026-10-16T22:35:11.000Z",
      "xQuery": "米大統領報道官 わずか5日で解任"
    },
    {
      "time": "21:53",
      "title": "流出個人情報を売買 闇サイト実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599033?source=rss",
      "publishedAt": "2026-10-16T12:53:16.000Z",
      "xQuery": "流出個人情報を売買 闇サイト実態"
    },
    {
      "time": "07:20",
      "title": "荷物用エレベーターに挟まれ死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599053?source=rss",
      "publishedAt": "2026-10-16T22:20:23.000Z",
      "xQuery": "荷物用エレベーターに挟まれ死亡"
    },
    {
      "time": "00:17",
      "title": "テスラ新型車 空を飛び宙返り実演",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599049?source=rss",
      "publishedAt": "2026-10-16T15:17:22.000Z",
      "xQuery": "テスラ新型車 空を飛び宙返り実演"
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
