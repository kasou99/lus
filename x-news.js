window.LUS_X_NEWS = {
  "updatedAt": "2026-06-29T03:50:25.730Z",
  "items": [
    {
      "time": "12:16",
      "title": "中国の輸出管理 日本の20団体追加",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586087?source=rss",
      "publishedAt": "2026-06-29T03:16:29.000Z",
      "xQuery": "中国の輸出管理 日本の20団体追加"
    },
    {
      "time": "11:28",
      "title": "欧州熱波で1300人以上死亡 WHO",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586076?source=rss",
      "publishedAt": "2026-06-29T02:28:29.000Z",
      "xQuery": "欧州熱波で1300人以上死亡 WHO"
    },
    {
      "time": "12:02",
      "title": "王将社長射殺 被告に無期懲役求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586083?source=rss",
      "publishedAt": "2026-06-29T03:02:13.000Z",
      "xQuery": "王将社長射殺 被告に無期懲役求刑"
    },
    {
      "time": "10:59",
      "title": "脱線事故 分岐器作動しなかったか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586074?source=rss",
      "publishedAt": "2026-06-29T01:59:59.000Z",
      "xQuery": "脱線事故 分岐器作動しなかったか"
    },
    {
      "time": "11:08",
      "title": "地中から遺体 強殺疑いで男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586075?source=rss",
      "publishedAt": "2026-06-29T02:08:58.000Z",
      "xQuery": "地中から遺体 強殺疑いで男逮捕"
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
