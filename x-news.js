window.LUS_X_NEWS = {
  "updatedAt": "2026-08-09T02:47:36.842Z",
  "items": [
    {
      "time": "10:31",
      "title": "中継 長崎「原爆の日」の平和式典",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591059?source=rss",
      "publishedAt": "2026-08-09T01:31:02.000Z",
      "xQuery": "中継 長崎「原爆の日」の平和式典"
    },
    {
      "time": "10:25",
      "title": "台風15号 東から西に本州横断か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591062?source=rss",
      "publishedAt": "2026-08-09T01:25:52.000Z",
      "xQuery": "台風15号 東から西に本州横断か"
    },
    {
      "time": "11:08",
      "title": "バイデン氏はがん転移し激痛 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591069?source=rss",
      "publishedAt": "2026-08-09T02:08:20.000Z",
      "xQuery": "バイデン氏はがん転移し激痛 報道"
    },
    {
      "time": "10:46",
      "title": "阿波おどりで不適切な動画 憤り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591066?source=rss",
      "publishedAt": "2026-08-09T01:46:46.000Z",
      "xQuery": "阿波おどりで不適切な動画 憤り"
    },
    {
      "time": "09:50",
      "title": "SNSで紹介した川で事故 責任は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591058?source=rss",
      "publishedAt": "2026-08-09T00:50:34.000Z",
      "xQuery": "SNSで紹介した川で事故 責任は"
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
