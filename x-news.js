window.LUS_X_NEWS = {
  "updatedAt": "2026-06-29T02:25:56.859Z",
  "items": [
    {
      "time": "10:59",
      "title": "脱線事故 分岐器作動しなかったか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586074?source=rss",
      "publishedAt": "2026-06-29T01:59:59.000Z",
      "xQuery": "脱線事故 分岐器作動しなかったか"
    },
    {
      "time": "09:40",
      "title": "ベネズエラ地震 32時間後乳児救出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586068?source=rss",
      "publishedAt": "2026-06-29T00:40:13.000Z",
      "xQuery": "ベネズエラ地震 32時間後乳児救出"
    },
    {
      "time": "11:08",
      "title": "地中から遺体 強殺疑いで男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586075?source=rss",
      "publishedAt": "2026-06-29T02:08:58.000Z",
      "xQuery": "地中から遺体 強殺疑いで男逮捕"
    },
    {
      "time": "09:40",
      "title": "風俗店で男女死亡 室内から刃物",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586069?source=rss",
      "publishedAt": "2026-06-29T00:40:42.000Z",
      "xQuery": "風俗店で男女死亡 室内から刃物"
    },
    {
      "time": "10:05",
      "title": "クールビズの空気感 軽装vsマナー",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586070?source=rss",
      "publishedAt": "2026-06-29T01:05:33.000Z",
      "xQuery": "クールビズの空気感 軽装vsマナー"
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
