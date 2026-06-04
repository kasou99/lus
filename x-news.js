window.LUS_X_NEWS = {
  "updatedAt": "2026-06-04T22:56:57.974Z",
  "items": [
    {
      "time": "06:42",
      "title": "内閣支持率で若年層50%割れ 毎日",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582984?source=rss",
      "publishedAt": "2026-06-04T21:42:43.000Z",
      "xQuery": "内閣支持率で若年層50%割れ 毎日"
    },
    {
      "time": "07:27",
      "title": "ウ大統領 プーチン氏に公開書簡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582988?source=rss",
      "publishedAt": "2026-06-04T22:27:27.000Z",
      "xQuery": "ウ大統領 プーチン氏に公開書簡"
    },
    {
      "time": "07:19",
      "title": "AI加工写真も「児童ポルノ」地裁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582986?source=rss",
      "publishedAt": "2026-06-04T22:19:58.000Z",
      "xQuery": "AI加工写真も「児童ポルノ」地裁"
    },
    {
      "time": "06:08",
      "title": "路上で刺され女性死亡 2人けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582981?source=rss",
      "publishedAt": "2026-06-04T21:08:24.000Z",
      "xQuery": "路上で刺され女性死亡 2人けが"
    },
    {
      "time": "22:59",
      "title": "内田被告 殺意あったのは共犯の女",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582978?source=rss",
      "publishedAt": "2026-06-04T13:59:50.000Z",
      "xQuery": "内田被告 殺意あったのは共犯の女"
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
