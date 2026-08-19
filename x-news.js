window.LUS_X_NEWS = {
  "updatedAt": "2026-08-19T08:47:27.244Z",
  "items": [
    {
      "time": "16:28",
      "title": "ICC所長へ米制裁 外務省「残念」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592296?source=rss",
      "publishedAt": "2026-08-19T07:28:58.000Z",
      "xQuery": "ICC所長へ米制裁 外務省「残念」"
    },
    {
      "time": "16:19",
      "title": "東証続落 中東混乱の景気減速懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592295?source=rss",
      "publishedAt": "2026-08-19T07:19:02.000Z",
      "xQuery": "東証続落 中東混乱の景気減速懸念"
    },
    {
      "time": "15:35",
      "title": "トロ安くなる? マグロ漁獲枠拡大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592288?source=rss",
      "publishedAt": "2026-08-19T06:35:20.000Z",
      "xQuery": "トロ安くなる? マグロ漁獲枠拡大"
    },
    {
      "time": "17:30",
      "title": "2歳死亡 近隣で以前から子の悲鳴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592304?source=rss",
      "publishedAt": "2026-08-19T08:30:45.000Z",
      "xQuery": "2歳死亡 近隣で以前から子の悲鳴"
    },
    {
      "time": "16:59",
      "title": "踏切で道ふさぎ殺人未遂疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592301?source=rss",
      "publishedAt": "2026-08-19T07:59:05.000Z",
      "xQuery": "踏切で道ふさぎ殺人未遂疑い 逮捕"
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
