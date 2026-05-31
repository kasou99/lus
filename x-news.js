window.LUS_X_NEWS = {
  "updatedAt": "2026-05-31T17:57:04.007Z",
  "items": [
    {
      "time": "22:53",
      "title": "台風 警戒レベル4までに避難を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582473?source=rss",
      "publishedAt": "2026-05-31T13:53:57.000Z",
      "xQuery": "台風 警戒レベル4までに避難を"
    },
    {
      "time": "22:26",
      "title": "アジア安保会議 日中の溝浮き彫り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582467?source=rss",
      "publishedAt": "2026-05-31T13:26:54.000Z",
      "xQuery": "アジア安保会議 日中の溝浮き彫り"
    },
    {
      "time": "23:48",
      "title": "1票差で町長選当選 新潟・田上町",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582480?source=rss",
      "publishedAt": "2026-05-31T14:48:33.000Z",
      "xQuery": "1票差で町長選当選 新潟・田上町"
    },
    {
      "time": "23:03",
      "title": "タイヤ不具合 海外では墜落事故も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582474?source=rss",
      "publishedAt": "2026-05-31T14:03:55.000Z",
      "xQuery": "タイヤ不具合 海外では墜落事故も"
    },
    {
      "time": "21:40",
      "title": "ナフサ100%水準戻る見通し 経産相",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582462?source=rss",
      "publishedAt": "2026-05-31T12:40:48.000Z",
      "xQuery": "ナフサ100%水準戻る見通し 経産相"
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
