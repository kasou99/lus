window.LUS_X_NEWS = {
  "updatedAt": "2026-09-15T04:21:11.198Z",
  "items": [
    {
      "time": "12:07",
      "title": "100歳以上 全国で初の10万人超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595353?source=rss",
      "publishedAt": "2026-09-15T03:07:33.000Z",
      "xQuery": "100歳以上 全国で初の10万人超"
    },
    {
      "time": "11:26",
      "title": "沖縄知事選 広がっていた対立疲れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595343?source=rss",
      "publishedAt": "2026-09-15T02:26:27.000Z",
      "xQuery": "沖縄知事選 広がっていた対立疲れ"
    },
    {
      "time": "12:01",
      "title": "シルバーウィーク 台風動向に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595351?source=rss",
      "publishedAt": "2026-09-15T03:01:39.000Z",
      "xQuery": "シルバーウィーク 台風動向に注意"
    },
    {
      "time": "10:46",
      "title": "「スーパーエルニーニョ」発生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595335?source=rss",
      "publishedAt": "2026-09-15T01:46:33.000Z",
      "xQuery": "「スーパーエルニーニョ」発生"
    },
    {
      "time": "13:04",
      "title": "鉄塔転落死の男性社員が遺書 調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595356?source=rss",
      "publishedAt": "2026-09-15T04:04:24.000Z",
      "xQuery": "鉄塔転落死の男性社員が遺書 調査"
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
