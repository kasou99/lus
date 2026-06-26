window.LUS_X_NEWS = {
  "updatedAt": "2026-06-26T11:55:11.028Z",
  "items": [
    {
      "time": "20:14",
      "title": "大雨ピークは2回 災害に厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585791?source=rss",
      "publishedAt": "2026-06-26T11:14:50.000Z",
      "xQuery": "大雨ピークは2回 災害に厳重警戒"
    },
    {
      "time": "17:39",
      "title": "国旗損壊罪 愛国心醸成と維新議員",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585773?source=rss",
      "publishedAt": "2026-06-26T08:39:56.000Z",
      "xQuery": "国旗損壊罪 愛国心醸成と維新議員"
    },
    {
      "time": "19:52",
      "title": "家庭用エアコン フロン回収強化へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585788?source=rss",
      "publishedAt": "2026-06-26T10:52:08.000Z",
      "xQuery": "家庭用エアコン フロン回収強化へ"
    },
    {
      "time": "17:40",
      "title": "欧州熱波 スペインで200人超死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585767?source=rss",
      "publishedAt": "2026-06-26T08:40:25.000Z",
      "xQuery": "欧州熱波 スペインで200人超死亡"
    },
    {
      "time": "18:04",
      "title": "大学生を集団暴行の疑い 6人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585775?source=rss",
      "publishedAt": "2026-06-26T09:04:31.000Z",
      "xQuery": "大学生を集団暴行の疑い 6人逮捕"
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
