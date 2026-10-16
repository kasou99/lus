window.LUS_X_NEWS = {
  "updatedAt": "2026-10-16T18:20:15.724Z",
  "items": [
    {
      "time": "20:50",
      "title": "自公再連立巡り 斉藤元代表が含み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599028?source=rss",
      "publishedAt": "2026-10-16T11:50:10.000Z",
      "xQuery": "自公再連立巡り 斉藤元代表が含み"
    },
    {
      "time": "22:54",
      "title": "緊急地震速報取り消し 2つの要因",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599044?source=rss",
      "publishedAt": "2026-10-16T13:54:50.000Z",
      "xQuery": "緊急地震速報取り消し 2つの要因"
    },
    {
      "time": "23:34",
      "title": "猪苗代湖事故 判決受け両親が心境",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599047?source=rss",
      "publishedAt": "2026-10-16T14:34:32.000Z",
      "xQuery": "猪苗代湖事故 判決受け両親が心境"
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
      "time": "22:04",
      "title": "ショップサーブの流出 2335万人分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599039?source=rss",
      "publishedAt": "2026-10-16T13:04:45.000Z",
      "xQuery": "ショップサーブの流出 2335万人分"
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
