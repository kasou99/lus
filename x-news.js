window.LUS_X_NEWS = {
  "updatedAt": "2026-09-24T10:18:36.026Z",
  "items": [
    {
      "time": "18:36",
      "title": "新党・民主改革の会 18人が入党へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596393?source=rss",
      "publishedAt": "2026-09-24T09:36:33.000Z",
      "xQuery": "新党・民主改革の会 18人が入党へ"
    },
    {
      "time": "18:15",
      "title": "防災庁 もし熊本地震前にあったら",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596373?source=rss",
      "publishedAt": "2026-09-24T09:15:18.000Z",
      "xQuery": "防災庁 もし熊本地震前にあったら"
    },
    {
      "time": "18:04",
      "title": "印旛沼近く ウナギ5万匹流される",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596389?source=rss",
      "publishedAt": "2026-09-24T09:04:35.000Z",
      "xQuery": "印旛沼近く ウナギ5万匹流される"
    },
    {
      "time": "17:50",
      "title": "第二神明で10台絡む事故 1人重傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596386?source=rss",
      "publishedAt": "2026-09-24T08:50:42.000Z",
      "xQuery": "第二神明で10台絡む事故 1人重傷"
    },
    {
      "time": "14:49",
      "title": "ジャングリア親会社 173億円赤字",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596367?source=rss",
      "publishedAt": "2026-09-24T05:49:43.000Z",
      "xQuery": "ジャングリア親会社 173億円赤字"
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
