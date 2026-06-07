window.LUS_X_NEWS = {
  "updatedAt": "2026-06-07T09:12:30.238Z",
  "items": [
    {
      "time": "17:26",
      "title": "各地で梅雨入り 雨量見通しと備え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583315?source=rss",
      "publishedAt": "2026-06-07T08:26:35.000Z",
      "xQuery": "各地で梅雨入り 雨量見通しと備え"
    },
    {
      "time": "15:51",
      "title": "政府 海峡への自衛隊派遣に3条件",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583302?source=rss",
      "publishedAt": "2026-06-07T06:51:52.000Z",
      "xQuery": "政府 海峡への自衛隊派遣に3条件"
    },
    {
      "time": "17:09",
      "title": "女子中学生を強盗致傷容疑で逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583313?source=rss",
      "publishedAt": "2026-06-07T08:09:20.000Z",
      "xQuery": "女子中学生を強盗致傷容疑で逮捕"
    },
    {
      "time": "17:54",
      "title": "アーケード街にクマ出没 宇都宮",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583319?source=rss",
      "publishedAt": "2026-06-07T08:54:21.000Z",
      "xQuery": "アーケード街にクマ出没 宇都宮"
    },
    {
      "time": "07:55",
      "title": "ファミマの1998円腕時計 なぜ完売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583250?source=rss",
      "publishedAt": "2026-06-06T22:55:05.000Z",
      "xQuery": "ファミマの1998円腕時計 なぜ完売"
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
