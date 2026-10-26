window.LUS_X_NEWS = {
  "updatedAt": "2026-10-26T11:19:43.588Z",
  "items": [
    {
      "time": "19:11",
      "title": "サイバー攻撃に緊急対策 首相方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600219?source=rss",
      "publishedAt": "2026-10-26T10:11:04.000Z",
      "xQuery": "サイバー攻撃に緊急対策 首相方針"
    },
    {
      "time": "18:47",
      "title": "Joshin 600万件超の情報漏えいか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600214?source=rss",
      "publishedAt": "2026-10-26T09:47:14.000Z",
      "xQuery": "Joshin 600万件超の情報漏えいか"
    },
    {
      "time": "19:28",
      "title": "GMOに攻撃 当初は約80億円要求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600222?source=rss",
      "publishedAt": "2026-10-26T10:28:04.000Z",
      "xQuery": "GMOに攻撃 当初は約80億円要求"
    },
    {
      "time": "17:46",
      "title": "3ピンプラグに2穴 10代感電し入院",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600207?source=rss",
      "publishedAt": "2026-10-26T08:46:20.000Z",
      "xQuery": "3ピンプラグに2穴 10代感電し入院"
    },
    {
      "time": "19:07",
      "title": "中国媒体の「VIVANT」批判 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600218?source=rss",
      "publishedAt": "2026-10-26T10:07:04.000Z",
      "xQuery": "中国媒体の「VIVANT」批判 背景"
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
