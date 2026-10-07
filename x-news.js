window.LUS_X_NEWS = {
  "updatedAt": "2026-10-07T00:54:40.006Z",
  "items": [
    {
      "time": "07:31",
      "title": "攻撃で情報漏洩被害 今年500件超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597815?source=rss",
      "publishedAt": "2026-10-06T22:31:04.000Z",
      "xQuery": "攻撃で情報漏洩被害 今年500件超"
    },
    {
      "time": "08:27",
      "title": "独情報機関の元長官 スパイ容疑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597825?source=rss",
      "publishedAt": "2026-10-06T23:27:54.000Z",
      "xQuery": "独情報機関の元長官 スパイ容疑"
    },
    {
      "time": "08:43",
      "title": "水泳授業 性的被害相談把握も委託",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597826?source=rss",
      "publishedAt": "2026-10-06T23:43:39.000Z",
      "xQuery": "水泳授業 性的被害相談把握も委託"
    },
    {
      "time": "09:33",
      "title": "執行失敗の米死刑囚 意識戻り発話",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597833?source=rss",
      "publishedAt": "2026-10-07T00:33:55.000Z",
      "xQuery": "執行失敗の米死刑囚 意識戻り発話"
    },
    {
      "time": "09:39",
      "title": "「最強の拍手」研究→校内で金賞",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597836?source=rss",
      "publishedAt": "2026-10-07T00:39:52.000Z",
      "xQuery": "「最強の拍手」研究→校内で金賞"
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
