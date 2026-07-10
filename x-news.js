window.LUS_X_NEWS = {
  "updatedAt": "2026-07-10T16:20:12.266Z",
  "items": [
    {
      "time": "23:32",
      "title": "台風 石垣島など丸1日暴風域恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587476?source=rss",
      "publishedAt": "2026-07-10T14:32:17.000Z",
      "xQuery": "台風 石垣島など丸1日暴風域恐れ"
    },
    {
      "time": "22:17",
      "title": "退職自衛官支援へ「庁」新設検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587472?source=rss",
      "publishedAt": "2026-07-10T13:17:10.000Z",
      "xQuery": "退職自衛官支援へ「庁」新設検討"
    },
    {
      "time": "22:32",
      "title": "無罪決め手の証拠 検察5人は把握",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587459?source=rss",
      "publishedAt": "2026-07-10T13:32:25.000Z",
      "xQuery": "無罪決め手の証拠 検察5人は把握"
    },
    {
      "time": "22:37",
      "title": "所得税7.8億円を脱税疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587474?source=rss",
      "publishedAt": "2026-07-10T13:37:05.000Z",
      "xQuery": "所得税7.8億円を脱税疑い 逮捕"
    },
    {
      "time": "21:54",
      "title": "新設エレベーター 子3人閉じ込め",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587470?source=rss",
      "publishedAt": "2026-07-10T12:54:10.000Z",
      "xQuery": "新設エレベーター 子3人閉じ込め"
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
