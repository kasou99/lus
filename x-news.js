window.LUS_X_NEWS = {
  "updatedAt": "2026-08-11T06:51:05.476Z",
  "items": [
    {
      "time": "14:10",
      "title": "台風は夜に関東上陸へ 異例コース",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591316?source=rss",
      "publishedAt": "2026-08-11T05:10:03.000Z",
      "xQuery": "台風は夜に関東上陸へ 異例コース"
    },
    {
      "time": "14:14",
      "title": "被災しても避難所に行けない なぜ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591315?source=rss",
      "publishedAt": "2026-08-11T05:14:19.000Z",
      "xQuery": "被災しても避難所に行けない なぜ"
    },
    {
      "time": "14:56",
      "title": "首相の人事 麻生氏の意向反映焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591319?source=rss",
      "publishedAt": "2026-08-11T05:56:21.000Z",
      "xQuery": "首相の人事 麻生氏の意向反映焦点"
    },
    {
      "time": "12:27",
      "title": "イオン 避難後の一時入館認めた",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591305?source=rss",
      "publishedAt": "2026-08-11T03:27:37.000Z",
      "xQuery": "イオン 避難後の一時入館認めた"
    },
    {
      "time": "13:39",
      "title": "家族らと遊泳中溺れ 35歳女性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591309?source=rss",
      "publishedAt": "2026-08-11T04:39:11.000Z",
      "xQuery": "家族らと遊泳中溺れ 35歳女性死亡"
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
