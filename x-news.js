window.LUS_X_NEWS = {
  "updatedAt": "2026-07-08T13:04:36.985Z",
  "items": [
    {
      "time": "19:18",
      "title": "台風9号 10～11日に先島諸島接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587209?source=rss",
      "publishedAt": "2026-07-08T10:18:13.000Z",
      "xQuery": "台風9号 10～11日に先島諸島接近"
    },
    {
      "time": "18:29",
      "title": "イラン覚書 米大統領「終わった」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587200?source=rss",
      "publishedAt": "2026-07-08T09:29:15.000Z",
      "xQuery": "イラン覚書 米大統領「終わった」"
    },
    {
      "time": "20:18",
      "title": "スペインと貿易停止 米大統領指示",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587215?source=rss",
      "publishedAt": "2026-07-08T11:18:05.000Z",
      "xQuery": "スペインと貿易停止 米大統領指示"
    },
    {
      "time": "20:33",
      "title": "アパートに刺し傷ある男性 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587213?source=rss",
      "publishedAt": "2026-07-08T11:33:51.000Z",
      "xQuery": "アパートに刺し傷ある男性 死亡"
    },
    {
      "time": "21:36",
      "title": "三笘薫選手が事故 赤信号で進入か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587221?source=rss",
      "publishedAt": "2026-07-08T12:36:42.000Z",
      "xQuery": "三笘薫選手が事故 赤信号で進入か"
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
