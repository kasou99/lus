window.LUS_X_NEWS = {
  "updatedAt": "2026-08-20T07:47:31.643Z",
  "items": [
    {
      "time": "14:53",
      "title": "赤根所長へ米制裁 ICC組織の実像",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592406?source=rss",
      "publishedAt": "2026-08-20T05:53:09.000Z",
      "xQuery": "赤根所長へ米制裁 ICC組織の実像"
    },
    {
      "time": "15:05",
      "title": "西日本中心に猛烈な暑さ 対策を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592407?source=rss",
      "publishedAt": "2026-08-20T06:05:55.000Z",
      "xQuery": "西日本中心に猛烈な暑さ 対策を"
    },
    {
      "time": "16:40",
      "title": "4人死亡 見張り役が列車に合図",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592417?source=rss",
      "publishedAt": "2026-08-20T07:40:58.000Z",
      "xQuery": "4人死亡 見張り役が列車に合図"
    },
    {
      "time": "14:41",
      "title": "公園のトイレで男性死亡 熱中症か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592405?source=rss",
      "publishedAt": "2026-08-20T05:41:32.000Z",
      "xQuery": "公園のトイレで男性死亡 熱中症か"
    },
    {
      "time": "16:20",
      "title": "23区新築マンション平均2.6億円超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592414?source=rss",
      "publishedAt": "2026-08-20T07:20:03.000Z",
      "xQuery": "23区新築マンション平均2.6億円超"
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
