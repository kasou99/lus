window.LUS_X_NEWS = {
  "updatedAt": "2026-06-25T11:25:38.068Z",
  "items": [
    {
      "time": "18:29",
      "title": "台風7号 27日に九州～関東直撃か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585644?source=rss",
      "publishedAt": "2026-06-25T09:29:31.000Z",
      "xQuery": "台風7号 27日に九州～関東直撃か"
    },
    {
      "time": "14:43",
      "title": "量子技術巡り大統領令 米国の狙い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585610?source=rss",
      "publishedAt": "2026-06-25T05:43:34.000Z",
      "xQuery": "量子技術巡り大統領令 米国の狙い"
    },
    {
      "time": "17:35",
      "title": "宮城強盗致死 元従業員に無罪判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585632?source=rss",
      "publishedAt": "2026-06-25T08:35:17.000Z",
      "xQuery": "宮城強盗致死 元従業員に無罪判決"
    },
    {
      "time": "16:39",
      "title": "芸能人肖像 AIで無断使用4万件超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585623?source=rss",
      "publishedAt": "2026-06-25T07:39:26.000Z",
      "xQuery": "芸能人肖像 AIで無断使用4万件超"
    },
    {
      "time": "18:40",
      "title": "10代の娘に性的暴行疑い 父を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585646?source=rss",
      "publishedAt": "2026-06-25T09:40:10.000Z",
      "xQuery": "10代の娘に性的暴行疑い 父を逮捕"
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
