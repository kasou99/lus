window.LUS_X_NEWS = {
  "updatedAt": "2026-08-10T12:23:01.418Z",
  "items": [
    {
      "time": "19:48",
      "title": "台風 東北新幹線で遅れや運休恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591237?source=rss",
      "publishedAt": "2026-08-10T10:48:30.000Z",
      "xQuery": "台風 東北新幹線で遅れや運休恐れ"
    },
    {
      "time": "20:55",
      "title": "内閣支持率62.5%で横ばい FNN",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591246?source=rss",
      "publishedAt": "2026-08-10T11:55:06.000Z",
      "xQuery": "内閣支持率62.5%で横ばい FNN"
    },
    {
      "time": "20:44",
      "title": "中1と小3死亡 遊具があおられ落水",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591245?source=rss",
      "publishedAt": "2026-08-10T11:44:56.000Z",
      "xQuery": "中1と小3死亡 遊具があおられ落水"
    },
    {
      "time": "20:30",
      "title": "生徒送迎中バスが追突し逃走 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591243?source=rss",
      "publishedAt": "2026-08-10T11:30:33.000Z",
      "xQuery": "生徒送迎中バスが追突し逃走 逮捕"
    },
    {
      "time": "20:10",
      "title": "大腸がん 毒素作る腸内細菌が関与",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591240?source=rss",
      "publishedAt": "2026-08-10T11:10:36.000Z",
      "xQuery": "大腸がん 毒素作る腸内細菌が関与"
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
