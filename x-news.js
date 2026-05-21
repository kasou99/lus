window.LUS_X_NEWS = {
  "updatedAt": "2026-05-21T01:11:28.530Z",
  "items": [
    {
      "time": "09:04",
      "title": "税額控除 当面給付に一本化の方向",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581052?source=rss",
      "publishedAt": "2026-05-21T00:04:36.000Z",
      "xQuery": "税額控除 当面給付に一本化の方向"
    },
    {
      "time": "09:55",
      "title": "日経平均上昇 一時6万円台を回復",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581056?source=rss",
      "publishedAt": "2026-05-21T00:55:42.000Z",
      "xQuery": "日経平均上昇 一時6万円台を回復"
    },
    {
      "time": "08:34",
      "title": "警棒で失明 元少年と沖縄県示談へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581049?source=rss",
      "publishedAt": "2026-05-20T23:34:29.000Z",
      "xQuery": "警棒で失明 元少年と沖縄県示談へ"
    },
    {
      "time": "09:33",
      "title": "覆面パト装い飲酒運転疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581054?source=rss",
      "publishedAt": "2026-05-21T00:33:31.000Z",
      "xQuery": "覆面パト装い飲酒運転疑い 逮捕"
    },
    {
      "time": "08:30",
      "title": "准教授が約半年無断欠勤 懲戒解雇",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581048?source=rss",
      "publishedAt": "2026-05-20T23:30:10.000Z",
      "xQuery": "准教授が約半年無断欠勤 懲戒解雇"
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
