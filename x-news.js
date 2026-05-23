window.LUS_X_NEWS = {
  "updatedAt": "2026-05-23T01:05:42.095Z",
  "items": [
    {
      "time": "09:22",
      "title": "高市首相 ナフサ不安払拭に躍起",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581322?source=rss",
      "publishedAt": "2026-05-23T00:22:25.000Z",
      "xQuery": "高市首相 ナフサ不安払拭に躍起"
    },
    {
      "time": "08:03",
      "title": "米国家情報長官が辞任 閣僚4人目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581311?source=rss",
      "publishedAt": "2026-05-22T23:03:32.000Z",
      "xQuery": "米国家情報長官が辞任 閣僚4人目"
    },
    {
      "time": "07:18",
      "title": "生成AIで津田健次郎さん模倣 提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581302?source=rss",
      "publishedAt": "2026-05-22T22:18:33.000Z",
      "xQuery": "生成AIで津田健次郎さん模倣 提訴"
    },
    {
      "time": "08:35",
      "title": "品川区 電気ガス料金を独自補助へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581316?source=rss",
      "publishedAt": "2026-05-22T23:35:33.000Z",
      "xQuery": "品川区 電気ガス料金を独自補助へ"
    },
    {
      "time": "08:59",
      "title": "袴田巌さんに特別給付金500万円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581317?source=rss",
      "publishedAt": "2026-05-22T23:59:42.000Z",
      "xQuery": "袴田巌さんに特別給付金500万円"
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
