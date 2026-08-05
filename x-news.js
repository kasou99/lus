window.LUS_X_NEWS = {
  "updatedAt": "2026-08-05T05:58:34.753Z",
  "items": [
    {
      "time": "14:16",
      "title": "同級生たちの死 戦後に知り負い目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590606?source=rss",
      "publishedAt": "2026-08-05T05:16:45.000Z",
      "xQuery": "同級生たちの死 戦後に知り負い目"
    },
    {
      "time": "13:51",
      "title": "首相の視察動画にBGM 木原氏説明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590604?source=rss",
      "publishedAt": "2026-08-05T04:51:27.000Z",
      "xQuery": "首相の視察動画にBGM 木原氏説明"
    },
    {
      "time": "12:11",
      "title": "オンワード 貴重品携行を義務付け",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590595?source=rss",
      "publishedAt": "2026-08-05T03:11:05.000Z",
      "xQuery": "オンワード 貴重品携行を義務付け"
    },
    {
      "time": "13:40",
      "title": "韓国警察がスタバを家宅捜索 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590603?source=rss",
      "publishedAt": "2026-08-05T04:40:40.000Z",
      "xQuery": "韓国警察がスタバを家宅捜索 報道"
    },
    {
      "time": "12:43",
      "title": "点滴に大便混入事件 裁判の焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590594?source=rss",
      "publishedAt": "2026-08-05T03:43:27.000Z",
      "xQuery": "点滴に大便混入事件 裁判の焦点"
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
