window.LUS_X_NEWS = {
  "updatedAt": "2026-08-19T02:30:01.540Z",
  "items": [
    {
      "time": "11:25",
      "title": "米韓軍事演習を短縮 米国側要請で",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592262?source=rss",
      "publishedAt": "2026-08-19T02:25:22.000Z",
      "xQuery": "米韓軍事演習を短縮 米国側要請で"
    },
    {
      "time": "09:31",
      "title": "日経平均 一時2000円超の値下がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592250?source=rss",
      "publishedAt": "2026-08-19T00:31:52.000Z",
      "xQuery": "日経平均 一時2000円超の値下がり"
    },
    {
      "time": "08:45",
      "title": "竹中工務店の万博現場責任者 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592243?source=rss",
      "publishedAt": "2026-08-18T23:45:27.000Z",
      "xQuery": "竹中工務店の万博現場責任者 逮捕"
    },
    {
      "time": "11:02",
      "title": "アニメ制作市場 ピークアウトか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592258?source=rss",
      "publishedAt": "2026-08-19T02:02:18.000Z",
      "xQuery": "アニメ制作市場 ピークアウトか"
    },
    {
      "time": "10:45",
      "title": "すしやコナン 空港の愛称の効果は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592256?source=rss",
      "publishedAt": "2026-08-19T01:45:03.000Z",
      "xQuery": "すしやコナン 空港の愛称の効果は"
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
