window.LUS_X_NEWS = {
  "updatedAt": "2026-09-25T11:16:39.417Z",
  "items": [
    {
      "time": "18:12",
      "title": "印旛沼の応急復旧 1週間程度めど",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596520?source=rss",
      "publishedAt": "2026-09-25T09:12:19.000Z",
      "xQuery": "印旛沼の応急復旧 1週間程度めど"
    },
    {
      "time": "17:58",
      "title": "行方不明から10年 娘の帰り待つ父",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596513?source=rss",
      "publishedAt": "2026-09-25T08:58:56.000Z",
      "xQuery": "行方不明から10年 娘の帰り待つ父"
    },
    {
      "time": "19:36",
      "title": "26日 関東は警報級大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596530?source=rss",
      "publishedAt": "2026-09-25T10:36:09.000Z",
      "xQuery": "26日 関東は警報級大雨の恐れ"
    },
    {
      "time": "18:39",
      "title": "離島に子の遺体 事件性疑う傷なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596525?source=rss",
      "publishedAt": "2026-09-25T09:39:55.000Z",
      "xQuery": "離島に子の遺体 事件性疑う傷なし"
    },
    {
      "time": "20:08",
      "title": "ドンキ 10月からPBビール値下げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596532?source=rss",
      "publishedAt": "2026-09-25T11:08:52.000Z",
      "xQuery": "ドンキ 10月からPBビール値下げ"
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
