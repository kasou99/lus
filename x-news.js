window.LUS_X_NEWS = {
  "updatedAt": "2026-06-01T01:18:38.383Z",
  "items": [
    {
      "time": "09:26",
      "title": "台風6号 九州～近畿も次第に雨",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582502?source=rss",
      "publishedAt": "2026-06-01T00:26:16.000Z",
      "xQuery": "台風6号 九州～近畿も次第に雨"
    },
    {
      "time": "09:28",
      "title": "日経平均 取引時間中の最高値更新",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582506?source=rss",
      "publishedAt": "2026-06-01T00:28:33.000Z",
      "xQuery": "日経平均 取引時間中の最高値更新"
    },
    {
      "time": "08:59",
      "title": "中立公 新たな「新党」構想が浮上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582501?source=rss",
      "publishedAt": "2026-05-31T23:59:57.000Z",
      "xQuery": "中立公 新たな「新党」構想が浮上"
    },
    {
      "time": "09:06",
      "title": "自転車で追突 オランダ人女性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582500?source=rss",
      "publishedAt": "2026-06-01T00:06:38.000Z",
      "xQuery": "自転車で追突 オランダ人女性死亡"
    },
    {
      "time": "10:00",
      "title": "賞金12億円 ジャンボ史上最高額に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582510?source=rss",
      "publishedAt": "2026-06-01T01:00:16.000Z",
      "xQuery": "賞金12億円 ジャンボ史上最高額に"
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
