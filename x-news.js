window.LUS_X_NEWS = {
  "updatedAt": "2026-05-27T13:45:45.650Z",
  "items": [
    {
      "time": "22:13",
      "title": "抗がん剤死亡 混入の原因特定困難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581952?source=rss",
      "publishedAt": "2026-05-27T13:13:05.000Z",
      "xQuery": "抗がん剤死亡 混入の原因特定困難"
    },
    {
      "time": "22:36",
      "title": "児相保護15歳にわいせつ疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581956?source=rss",
      "publishedAt": "2026-05-27T13:36:31.000Z",
      "xQuery": "児相保護15歳にわいせつ疑い 逮捕"
    },
    {
      "time": "21:17",
      "title": "ADHD治療薬不足 厚労省呼びかけ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581944?source=rss",
      "publishedAt": "2026-05-27T12:17:51.000Z",
      "xQuery": "ADHD治療薬不足 厚労省呼びかけ"
    },
    {
      "time": "21:38",
      "title": "熱に強い菌 チャーハン症候群注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581950?source=rss",
      "publishedAt": "2026-05-27T12:38:11.000Z",
      "xQuery": "熱に強い菌 チャーハン症候群注意"
    },
    {
      "time": "21:35",
      "title": "YouTubeJapan代表「好き」が武器",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581948?source=rss",
      "publishedAt": "2026-05-27T12:35:07.000Z",
      "xQuery": "YouTubeJapan代表「好き」が武器"
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
