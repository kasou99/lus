window.LUS_X_NEWS = {
  "updatedAt": "2026-08-11T08:50:40.106Z",
  "items": [
    {
      "time": "17:18",
      "title": "台風が関東上陸へ 大雨に厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591338?source=rss",
      "publishedAt": "2026-08-11T08:18:31.000Z",
      "xQuery": "台風が関東上陸へ 大雨に厳重警戒"
    },
    {
      "time": "16:45",
      "title": "息子が戦死 5年葬式しなかった母",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591329?source=rss",
      "publishedAt": "2026-08-11T07:45:24.000Z",
      "xQuery": "息子が戦死 5年葬式しなかった母"
    },
    {
      "time": "16:10",
      "title": "東京・多摩川で男性が溺れる 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591326?source=rss",
      "publishedAt": "2026-08-11T07:10:01.000Z",
      "xQuery": "東京・多摩川で男性が溺れる 死亡"
    },
    {
      "time": "16:34",
      "title": "半蔵門線の運転再開は「本日中」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591330?source=rss",
      "publishedAt": "2026-08-11T07:34:08.000Z",
      "xQuery": "半蔵門線の運転再開は「本日中」"
    },
    {
      "time": "16:55",
      "title": "H3ロケット成功 種子島で拍手",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591333?source=rss",
      "publishedAt": "2026-08-11T07:55:19.000Z",
      "xQuery": "H3ロケット成功 種子島で拍手"
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
