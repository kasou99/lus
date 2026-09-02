window.LUS_X_NEWS = {
  "updatedAt": "2026-09-02T14:39:43.454Z",
  "items": [
    {
      "time": "23:30",
      "title": "青森で猛烈な雨 災害発生の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594034?source=rss",
      "publishedAt": "2026-09-02T14:30:49.000Z",
      "xQuery": "青森で猛烈な雨 災害発生の恐れ"
    },
    {
      "time": "23:11",
      "title": "台湾・高雄市 熊本に1億5千万円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594033?source=rss",
      "publishedAt": "2026-09-02T14:11:13.000Z",
      "xQuery": "台湾・高雄市 熊本に1億5千万円"
    },
    {
      "time": "21:43",
      "title": "上皇さまの葬儀規模 大幅縮小検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594027?source=rss",
      "publishedAt": "2026-09-02T12:43:30.000Z",
      "xQuery": "上皇さまの葬儀規模 大幅縮小検討"
    },
    {
      "time": "21:42",
      "title": "長期金利「3%突破」は異常か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594029?source=rss",
      "publishedAt": "2026-09-02T12:42:49.000Z",
      "xQuery": "長期金利「3%突破」は異常か"
    },
    {
      "time": "20:24",
      "title": "和菓子店の店主死亡 長男コメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594016?source=rss",
      "publishedAt": "2026-09-02T11:24:39.000Z",
      "xQuery": "和菓子店の店主死亡 長男コメント"
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
