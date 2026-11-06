window.LUS_X_NEWS = {
  "updatedAt": "2026-11-06T11:35:00.231Z",
  "items": [
    {
      "time": "20:16",
      "title": "サイバー防御 緊急対策まとめる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601563?source=rss",
      "publishedAt": "2026-11-06T11:16:55.000Z",
      "xQuery": "サイバー防御 緊急対策まとめる"
    },
    {
      "time": "19:04",
      "title": "信金で大規模障害 ATMなど復旧",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601562?source=rss",
      "publishedAt": "2026-11-06T10:04:24.000Z",
      "xQuery": "信金で大規模障害 ATMなど復旧"
    },
    {
      "time": "18:02",
      "title": "破産手続き中の全東信 社長が死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601548?source=rss",
      "publishedAt": "2026-11-06T09:02:07.000Z",
      "xQuery": "破産手続き中の全東信 社長が死去"
    },
    {
      "time": "18:52",
      "title": "「ウポポイ」認知度27.5% 内閣府",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601557?source=rss",
      "publishedAt": "2026-11-06T09:52:37.000Z",
      "xQuery": "「ウポポイ」認知度27.5% 内閣府"
    },
    {
      "time": "17:57",
      "title": "国内最後の飼育 キンシコウが死ぬ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601550?source=rss",
      "publishedAt": "2026-11-06T08:57:04.000Z",
      "xQuery": "国内最後の飼育 キンシコウが死ぬ"
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
