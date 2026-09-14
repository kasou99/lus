window.LUS_X_NEWS = {
  "updatedAt": "2026-09-14T23:37:53.444Z",
  "items": [
    {
      "time": "08:02",
      "title": "広い範囲で雷雨に注意 15日の天気",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595317?source=rss",
      "publishedAt": "2026-09-14T23:02:52.000Z",
      "xQuery": "広い範囲で雷雨に注意 15日の天気"
    },
    {
      "time": "08:06",
      "title": "米長期金利一時5%台 インフレ懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595318?source=rss",
      "publishedAt": "2026-09-14T23:06:29.000Z",
      "xQuery": "米長期金利一時5%台 インフレ懸念"
    },
    {
      "time": "06:09",
      "title": "ケーキ店火災「腹殴られた」証言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595305?source=rss",
      "publishedAt": "2026-09-14T21:09:10.000Z",
      "xQuery": "ケーキ店火災「腹殴られた」証言"
    },
    {
      "time": "07:43",
      "title": "関越道で3台が関わる事故 2人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595313?source=rss",
      "publishedAt": "2026-09-14T22:43:01.000Z",
      "xQuery": "関越道で3台が関わる事故 2人死亡"
    },
    {
      "time": "07:36",
      "title": "「カスハラ」市民を提訴へ 大阪市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595312?source=rss",
      "publishedAt": "2026-09-14T22:36:22.000Z",
      "xQuery": "「カスハラ」市民を提訴へ 大阪市"
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
