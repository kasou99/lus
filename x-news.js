window.LUS_X_NEWS = {
  "updatedAt": "2026-06-22T06:01:05.461Z",
  "items": [
    {
      "time": "14:17",
      "title": "ハシゴ外され イスラエルの状況は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585196?source=rss",
      "publishedAt": "2026-06-22T05:17:14.000Z",
      "xQuery": "ハシゴ外され イスラエルの状況は"
    },
    {
      "time": "11:44",
      "title": "台風7号 27日に九州に接近の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585172?source=rss",
      "publishedAt": "2026-06-22T02:44:30.000Z",
      "xQuery": "台風7号 27日に九州に接近の恐れ"
    },
    {
      "time": "11:39",
      "title": "温泉5歳不明 浴室の窓開いた状態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585171?source=rss",
      "publishedAt": "2026-06-22T02:39:34.000Z",
      "xQuery": "温泉5歳不明 浴室の窓開いた状態"
    },
    {
      "time": "14:10",
      "title": "知人男性の腹刺し殺害疑い 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585195?source=rss",
      "publishedAt": "2026-06-22T05:10:51.000Z",
      "xQuery": "知人男性の腹刺し殺害疑い 男逮捕"
    },
    {
      "time": "13:44",
      "title": "中国産混ぜ九条ねぎ販売疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585192?source=rss",
      "publishedAt": "2026-06-22T04:44:23.000Z",
      "xQuery": "中国産混ぜ九条ねぎ販売疑い 逮捕"
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
