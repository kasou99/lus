window.LUS_X_NEWS = {
  "updatedAt": "2026-11-11T11:35:35.293Z",
  "items": [
    {
      "time": "16:40",
      "title": "Amazonの改善計画 公取委が認定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602184?source=rss",
      "publishedAt": "2026-11-11T07:40:49.000Z",
      "xQuery": "Amazonの改善計画 公取委が認定"
    },
    {
      "time": "18:00",
      "title": "米財務長官 脅迫受け軍基地に転居",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602195?source=rss",
      "publishedAt": "2026-11-11T09:00:26.000Z",
      "xQuery": "米財務長官 脅迫受け軍基地に転居"
    },
    {
      "time": "20:11",
      "title": "首脳がCOP31を欠席 日本に化石賞",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602204?source=rss",
      "publishedAt": "2026-11-11T11:11:29.000Z",
      "xQuery": "首脳がCOP31を欠席 日本に化石賞"
    },
    {
      "time": "18:56",
      "title": "放火し保険金など1億円詐取 実刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602207?source=rss",
      "publishedAt": "2026-11-11T09:56:24.000Z",
      "xQuery": "放火し保険金など1億円詐取 実刑"
    },
    {
      "time": "20:04",
      "title": "京都府内の農場で鳥インフル疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602212?source=rss",
      "publishedAt": "2026-11-11T11:04:20.000Z",
      "xQuery": "京都府内の農場で鳥インフル疑い"
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
