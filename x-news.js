window.LUS_X_NEWS = {
  "updatedAt": "2026-06-20T12:10:34.160Z",
  "items": [
    {
      "time": "20:27",
      "title": "EU 対中国の輸入規制を強化方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584999?source=rss",
      "publishedAt": "2026-06-20T11:27:37.000Z",
      "xQuery": "EU 対中国の輸入規制を強化方針"
    },
    {
      "time": "19:40",
      "title": "台湾東部海域 中国「管轄権」主張",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584992?source=rss",
      "publishedAt": "2026-06-20T10:40:08.000Z",
      "xQuery": "台湾東部海域 中国「管轄権」主張"
    },
    {
      "time": "21:04",
      "title": "攻撃受けたモスクワ 混乱広がる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585004?source=rss",
      "publishedAt": "2026-06-20T12:04:44.000Z",
      "xQuery": "攻撃受けたモスクワ 混乱広がる"
    },
    {
      "time": "20:30",
      "title": "車が店に突っ込む 中を約10m進む",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584998?source=rss",
      "publishedAt": "2026-06-20T11:30:24.000Z",
      "xQuery": "車が店に突っ込む 中を約10m進む"
    },
    {
      "time": "16:59",
      "title": "男性用日焼け止め 心つかんだ理由",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584971?source=rss",
      "publishedAt": "2026-06-20T07:59:50.000Z",
      "xQuery": "男性用日焼け止め 心つかんだ理由"
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
