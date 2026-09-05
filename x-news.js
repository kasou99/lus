window.LUS_X_NEWS = {
  "updatedAt": "2026-09-05T12:42:12.147Z",
  "items": [
    {
      "time": "20:09",
      "title": "大雨 屋久島町で土砂崩れや断水",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594341?source=rss",
      "publishedAt": "2026-09-05T11:09:52.000Z",
      "xQuery": "大雨 屋久島町で土砂崩れや断水"
    },
    {
      "time": "20:35",
      "title": "内閣改造 小泉防衛相の留任で調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594345?source=rss",
      "publishedAt": "2026-09-05T11:35:46.000Z",
      "xQuery": "内閣改造 小泉防衛相の留任で調整"
    },
    {
      "time": "19:29",
      "title": "29年に中低所得者へ現金給付検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594335?source=rss",
      "publishedAt": "2026-09-05T10:29:58.000Z",
      "xQuery": "29年に中低所得者へ現金給付検討"
    },
    {
      "time": "19:23",
      "title": "殺虫剤誤飲の死亡事故 市周知せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594333?source=rss",
      "publishedAt": "2026-09-05T10:23:22.000Z",
      "xQuery": "殺虫剤誤飲の死亡事故 市周知せず"
    },
    {
      "time": "19:42",
      "title": "くら寿司「ちいかわ」コラボ中止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594339?source=rss",
      "publishedAt": "2026-09-05T10:42:23.000Z",
      "xQuery": "くら寿司「ちいかわ」コラボ中止"
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
