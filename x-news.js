window.LUS_X_NEWS = {
  "updatedAt": "2026-06-27T01:08:05.305Z",
  "items": [
    {
      "time": "07:48",
      "title": "台風7号 関東甲信は大雨に警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585827?source=rss",
      "publishedAt": "2026-06-26T22:48:09.000Z",
      "xQuery": "台風7号 関東甲信は大雨に警戒を"
    },
    {
      "time": "08:17",
      "title": "米軍がイラン施設爆撃 反撃と主張",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585830?source=rss",
      "publishedAt": "2026-06-26T23:17:17.000Z",
      "xQuery": "米軍がイラン施設爆撃 反撃と主張"
    },
    {
      "time": "09:35",
      "title": "養子の子男子なら皇位継承資格 案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585842?source=rss",
      "publishedAt": "2026-06-27T00:35:04.000Z",
      "xQuery": "養子の子男子なら皇位継承資格 案"
    },
    {
      "time": "09:06",
      "title": "露大統領の最側近 イワノフ氏死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585839?source=rss",
      "publishedAt": "2026-06-27T00:06:13.000Z",
      "xQuery": "露大統領の最側近 イワノフ氏死去"
    },
    {
      "time": "08:37",
      "title": "震度6弱 山梨や東京など17人けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585833?source=rss",
      "publishedAt": "2026-06-26T23:37:58.000Z",
      "xQuery": "震度6弱 山梨や東京など17人けが"
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
