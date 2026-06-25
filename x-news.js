window.LUS_X_NEWS = {
  "updatedAt": "2026-06-25T07:25:21.517Z",
  "items": [
    {
      "time": "13:04",
      "title": "地震 三陸はるか沖地震と関連か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585598?source=rss",
      "publishedAt": "2026-06-25T04:04:01.000Z",
      "xQuery": "地震 三陸はるか沖地震と関連か"
    },
    {
      "time": "15:53",
      "title": "東証終値3191円高 上げ幅歴代4位",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585616?source=rss",
      "publishedAt": "2026-06-25T06:53:43.000Z",
      "xQuery": "東証終値3191円高 上げ幅歴代4位"
    },
    {
      "time": "13:44",
      "title": "江別暴行死 川村被告に懲役30年",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585604?source=rss",
      "publishedAt": "2026-06-25T04:44:18.000Z",
      "xQuery": "江別暴行死 川村被告に懲役30年"
    },
    {
      "time": "13:30",
      "title": "犬型ロボ「aibo」国内販売を終了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585600?source=rss",
      "publishedAt": "2026-06-25T04:30:28.000Z",
      "xQuery": "犬型ロボ「aibo」国内販売を終了"
    },
    {
      "time": "14:26",
      "title": "美容業界 アンバサダーに男性続々",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585606?source=rss",
      "publishedAt": "2026-06-25T05:26:33.000Z",
      "xQuery": "美容業界 アンバサダーに男性続々"
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
