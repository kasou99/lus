window.LUS_X_NEWS = {
  "updatedAt": "2026-08-02T23:23:28.607Z",
  "items": [
    {
      "time": "07:38",
      "title": "熊本の復旧復興 補正予算編成論も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590331?source=rss",
      "publishedAt": "2026-08-02T22:38:27.000Z",
      "xQuery": "熊本の復旧復興 補正予算編成論も"
    },
    {
      "time": "07:59",
      "title": "ヘリ同士衝突し2人死亡 ギリシャ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590333?source=rss",
      "publishedAt": "2026-08-02T22:59:40.000Z",
      "xQuery": "ヘリ同士衝突し2人死亡 ギリシャ"
    },
    {
      "time": "08:07",
      "title": "トランプ氏 円買い介入は友好の証",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590335?source=rss",
      "publishedAt": "2026-08-02T23:07:54.000Z",
      "xQuery": "トランプ氏 円買い介入は友好の証"
    },
    {
      "time": "06:35",
      "title": "同じ会社の男性を殺害疑い 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590327?source=rss",
      "publishedAt": "2026-08-02T21:35:26.000Z",
      "xQuery": "同じ会社の男性を殺害疑い 男逮捕"
    },
    {
      "time": "08:06",
      "title": "湖池屋ポテチ「直送便」好調理由",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590334?source=rss",
      "publishedAt": "2026-08-02T23:06:16.000Z",
      "xQuery": "湖池屋ポテチ「直送便」好調理由"
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
