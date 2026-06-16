window.LUS_X_NEWS = {
  "updatedAt": "2026-06-16T08:32:15.437Z",
  "items": [
    {
      "time": "16:59",
      "title": "日銀利上げ決定 リスク慎重見極め",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584473?source=rss",
      "publishedAt": "2026-06-16T07:59:38.000Z",
      "xQuery": "日銀利上げ決定 リスク慎重見極め"
    },
    {
      "time": "17:04",
      "title": "赤い羽根で着服疑い 福祉団体困惑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584475?source=rss",
      "publishedAt": "2026-06-16T08:04:31.000Z",
      "xQuery": "赤い羽根で着服疑い 福祉団体困惑"
    },
    {
      "time": "16:16",
      "title": "コストコ食中毒 900パック超販売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584464?source=rss",
      "publishedAt": "2026-06-16T07:16:31.000Z",
      "xQuery": "コストコ食中毒 900パック超販売"
    },
    {
      "time": "16:40",
      "title": "駐車場にパラグライダー墜落 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584469?source=rss",
      "publishedAt": "2026-06-16T07:40:23.000Z",
      "xQuery": "駐車場にパラグライダー墜落 死亡"
    },
    {
      "time": "16:29",
      "title": "おにぎりは高級品 子育て家庭悲鳴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584467?source=rss",
      "publishedAt": "2026-06-16T07:29:50.000Z",
      "xQuery": "おにぎりは高級品 子育て家庭悲鳴"
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
