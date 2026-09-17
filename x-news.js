window.LUS_X_NEWS = {
  "updatedAt": "2026-09-17T23:37:27.416Z",
  "items": [
    {
      "time": "08:00",
      "title": "改造内閣 非主流派結集のリスクも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595651?source=rss",
      "publishedAt": "2026-09-17T23:00:45.000Z",
      "xQuery": "改造内閣 非主流派結集のリスクも"
    },
    {
      "time": "06:48",
      "title": "九州新幹線 52日ぶり全線運転",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595645?source=rss",
      "publishedAt": "2026-09-17T21:48:34.000Z",
      "xQuery": "九州新幹線 52日ぶり全線運転"
    },
    {
      "time": "08:08",
      "title": "台風25号 接近前から大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595654?source=rss",
      "publishedAt": "2026-09-17T23:08:38.000Z",
      "xQuery": "台風25号 接近前から大雨の恐れ"
    },
    {
      "time": "08:20",
      "title": "ケーキ店死傷 店主らと口論か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595657?source=rss",
      "publishedAt": "2026-09-17T23:20:35.000Z",
      "xQuery": "ケーキ店死傷 店主らと口論か"
    },
    {
      "time": "06:59",
      "title": "日産 新型スカイライン12月発表へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595646?source=rss",
      "publishedAt": "2026-09-17T21:59:43.000Z",
      "xQuery": "日産 新型スカイライン12月発表へ"
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
