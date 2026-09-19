window.LUS_X_NEWS = {
  "updatedAt": "2026-09-19T06:27:43.644Z",
  "items": [
    {
      "time": "13:42",
      "title": "対露制裁法が成立 トランプ氏署名",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595796?source=rss",
      "publishedAt": "2026-09-19T04:42:39.000Z",
      "xQuery": "対露制裁法が成立 トランプ氏署名"
    },
    {
      "time": "14:01",
      "title": "OpenAI 安保理でAI安全策説明へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595800?source=rss",
      "publishedAt": "2026-09-19T05:01:46.000Z",
      "xQuery": "OpenAI 安保理でAI安全策説明へ"
    },
    {
      "time": "13:29",
      "title": "エホバ 他人の血の輸血一部解禁へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595795?source=rss",
      "publishedAt": "2026-09-19T04:29:39.000Z",
      "xQuery": "エホバ 他人の血の輸血一部解禁へ"
    },
    {
      "time": "13:07",
      "title": "呼吸器材外れる ダイビング客死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595794?source=rss",
      "publishedAt": "2026-09-19T04:07:53.000Z",
      "xQuery": "呼吸器材外れる ダイビング客死亡"
    },
    {
      "time": "14:24",
      "title": "恐竜の化石がなぜ北極に 気候解明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595804?source=rss",
      "publishedAt": "2026-09-19T05:24:22.000Z",
      "xQuery": "恐竜の化石がなぜ北極に 気候解明"
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
