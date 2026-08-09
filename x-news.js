window.LUS_X_NEWS = {
  "updatedAt": "2026-08-09T18:48:04.015Z",
  "items": [
    {
      "time": "21:53",
      "title": "台風15号 列島を横断する可能性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591129?source=rss",
      "publishedAt": "2026-08-09T12:53:29.000Z",
      "xQuery": "台風15号 列島を横断する可能性"
    },
    {
      "time": "22:35",
      "title": "ガザ和平工程 ネタニヤフ氏が拒否",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591133?source=rss",
      "publishedAt": "2026-08-09T13:35:29.000Z",
      "xQuery": "ガザ和平工程 ネタニヤフ氏が拒否"
    },
    {
      "time": "23:46",
      "title": "長野県知事選 現職の阿部氏が5選",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591137?source=rss",
      "publishedAt": "2026-08-09T14:46:18.000Z",
      "xQuery": "長野県知事選 現職の阿部氏が5選"
    },
    {
      "time": "23:12",
      "title": "イオン 自己判断で店内戻った人も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591135?source=rss",
      "publishedAt": "2026-08-09T14:12:52.000Z",
      "xQuery": "イオン 自己判断で店内戻った人も"
    },
    {
      "time": "22:17",
      "title": "孫運転の車にはねられ 女性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591131?source=rss",
      "publishedAt": "2026-08-09T13:17:11.000Z",
      "xQuery": "孫運転の車にはねられ 女性死亡"
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
