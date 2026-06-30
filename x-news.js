window.LUS_X_NEWS = {
  "updatedAt": "2026-06-30T02:25:25.453Z",
  "items": [
    {
      "time": "08:08",
      "title": "国会延長案を官邸検討 自維温度差",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586185?source=rss",
      "publishedAt": "2026-06-29T23:08:01.000Z",
      "xQuery": "国会延長案を官邸検討 自維温度差"
    },
    {
      "time": "10:42",
      "title": "衆参議員の平均所得3003万円 25年",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586201?source=rss",
      "publishedAt": "2026-06-30T01:42:12.000Z",
      "xQuery": "衆参議員の平均所得3003万円 25年"
    },
    {
      "time": "10:18",
      "title": "1ドル162円台に下落 39年半ぶり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586199?source=rss",
      "publishedAt": "2026-06-30T01:18:12.000Z",
      "xQuery": "1ドル162円台に下落 39年半ぶり"
    },
    {
      "time": "09:48",
      "title": "独の母子向け施設で発砲 6人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586197?source=rss",
      "publishedAt": "2026-06-30T00:48:41.000Z",
      "xQuery": "独の母子向け施設で発砲 6人死亡"
    },
    {
      "time": "08:38",
      "title": "マイクロソフト株下落 AI巡り逆風",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586188?source=rss",
      "publishedAt": "2026-06-29T23:38:23.000Z",
      "xQuery": "マイクロソフト株下落 AI巡り逆風"
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
