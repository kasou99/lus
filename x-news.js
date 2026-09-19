window.LUS_X_NEWS = {
  "updatedAt": "2026-09-19T01:48:01.291Z",
  "items": [
    {
      "time": "09:58",
      "title": "台風25号 21日に関東に最接近か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595783?source=rss",
      "publishedAt": "2026-09-19T00:58:49.000Z",
      "xQuery": "台風25号 21日に関東に最接近か"
    },
    {
      "time": "08:10",
      "title": "習氏訪米 異例の経済代表団同行へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595766?source=rss",
      "publishedAt": "2026-09-18T23:10:01.000Z",
      "xQuery": "習氏訪米 異例の経済代表団同行へ"
    },
    {
      "time": "08:39",
      "title": "日米首脳会談 22日に米NYで開催",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595772?source=rss",
      "publishedAt": "2026-09-18T23:39:04.000Z",
      "xQuery": "日米首脳会談 22日に米NYで開催"
    },
    {
      "time": "10:12",
      "title": "散弾銃3丁など盗まれる 警察捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595784?source=rss",
      "publishedAt": "2026-09-19T01:12:48.000Z",
      "xQuery": "散弾銃3丁など盗まれる 警察捜査"
    },
    {
      "time": "09:53",
      "title": "車道真ん中に2歳児 保護した男性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595781?source=rss",
      "publishedAt": "2026-09-19T00:53:36.000Z",
      "xQuery": "車道真ん中に2歳児 保護した男性"
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
