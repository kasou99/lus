window.LUS_X_NEWS = {
  "updatedAt": "2026-07-29T09:27:58.702Z",
  "items": [
    {
      "time": "16:55",
      "title": "12人死亡6人心肺停止 熊本県発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589791?source=rss",
      "publishedAt": "2026-07-29T07:55:34.000Z",
      "xQuery": "12人死亡6人心肺停止 熊本県発表"
    },
    {
      "time": "18:11",
      "title": "熱中症に注意 避難生活のポイント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589803?source=rss",
      "publishedAt": "2026-07-29T09:11:37.000Z",
      "xQuery": "熱中症に注意 避難生活のポイント"
    },
    {
      "time": "17:25",
      "title": "イオン熊本で死亡の3人は従業員",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589793?source=rss",
      "publishedAt": "2026-07-29T08:25:19.000Z",
      "xQuery": "イオン熊本で死亡の3人は従業員"
    },
    {
      "time": "17:31",
      "title": "日本人人口1.2億人割れ 42年ぶり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589794?source=rss",
      "publishedAt": "2026-07-29T08:31:15.000Z",
      "xQuery": "日本人人口1.2億人割れ 42年ぶり"
    },
    {
      "time": "16:30",
      "title": "米大統領 ウ大統領らとの会談良好",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589788?source=rss",
      "publishedAt": "2026-07-29T07:30:45.000Z",
      "xQuery": "米大統領 ウ大統領らとの会談良好"
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
