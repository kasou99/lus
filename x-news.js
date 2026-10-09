window.LUS_X_NEWS = {
  "updatedAt": "2026-10-09T06:33:06.365Z",
  "items": [
    {
      "time": "15:21",
      "title": "プルデンシャル 一部業務停止命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598129?source=rss",
      "publishedAt": "2026-10-09T06:21:10.000Z",
      "xQuery": "プルデンシャル 一部業務停止命令"
    },
    {
      "time": "14:01",
      "title": "3回の米朝首脳会談 拉致問題提起",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598121?source=rss",
      "publishedAt": "2026-10-09T05:01:31.000Z",
      "xQuery": "3回の米朝首脳会談 拉致問題提起"
    },
    {
      "time": "14:27",
      "title": "ICC所長ら引き渡し要請 政府遺憾",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598124?source=rss",
      "publishedAt": "2026-10-09T05:27:24.000Z",
      "xQuery": "ICC所長ら引き渡し要請 政府遺憾"
    },
    {
      "time": "12:21",
      "title": "台風影響 千葉の751人登校できず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598113?source=rss",
      "publishedAt": "2026-10-09T03:21:29.000Z",
      "xQuery": "台風影響 千葉の751人登校できず"
    },
    {
      "time": "13:56",
      "title": "スカイチケット 1464万件情報流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598122?source=rss",
      "publishedAt": "2026-10-09T04:56:35.000Z",
      "xQuery": "スカイチケット 1464万件情報流出"
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
