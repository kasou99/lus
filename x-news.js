window.LUS_X_NEWS = {
  "updatedAt": "2026-09-24T11:16:32.976Z",
  "items": [
    {
      "time": "17:04",
      "title": "中小事業者のレジ改修補助へ 政府",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596379?source=rss",
      "publishedAt": "2026-09-24T08:04:43.000Z",
      "xQuery": "中小事業者のレジ改修補助へ 政府"
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
      "time": "18:00",
      "title": "匿名投稿で攻撃 林泰輔県議が釈明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596390?source=rss",
      "publishedAt": "2026-09-24T09:00:21.000Z",
      "xQuery": "匿名投稿で攻撃 林泰輔県議が釈明"
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
