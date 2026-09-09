window.LUS_X_NEWS = {
  "updatedAt": "2026-09-09T22:36:57.423Z",
  "items": [
    {
      "time": "06:46",
      "title": "東京都心は22℃予想 10月中旬並み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594800?source=rss",
      "publishedAt": "2026-09-09T21:46:15.000Z",
      "xQuery": "東京都心は22℃予想 10月中旬並み"
    },
    {
      "time": "17:42",
      "title": "毒物浴び院生死亡 北大に市が指導",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594767?source=rss",
      "publishedAt": "2026-09-09T08:42:53.000Z",
      "xQuery": "毒物浴び院生死亡 北大に市が指導"
    },
    {
      "time": "06:22",
      "title": "高野山の宿坊 集団申告漏れ指摘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594798?source=rss",
      "publishedAt": "2026-09-09T21:22:26.000Z",
      "xQuery": "高野山の宿坊 集団申告漏れ指摘"
    },
    {
      "time": "06:56",
      "title": "閉山日前日の富士山 登山客混乱",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594801?source=rss",
      "publishedAt": "2026-09-09T21:56:40.000Z",
      "xQuery": "閉山日前日の富士山 登山客混乱"
    },
    {
      "time": "07:23",
      "title": "米アップル新製品発表会 Xの反応",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594804?source=rss",
      "publishedAt": "2026-09-09T22:23:00.000Z",
      "xQuery": "米アップル新製品発表会 Xの反応"
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
