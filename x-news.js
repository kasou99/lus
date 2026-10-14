window.LUS_X_NEWS = {
  "updatedAt": "2026-10-14T06:30:19.647Z",
  "items": [
    {
      "time": "14:30",
      "title": "ハッカー集団Qilin AI利用と主張",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598729?source=rss",
      "publishedAt": "2026-10-14T05:30:04.000Z",
      "xQuery": "ハッカー集団Qilin AI利用と主張"
    },
    {
      "time": "14:01",
      "title": "ウのEU加盟 ハンガリー反対撤回",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598724?source=rss",
      "publishedAt": "2026-10-14T05:01:19.000Z",
      "xQuery": "ウのEU加盟 ハンガリー反対撤回"
    },
    {
      "time": "12:11",
      "title": "給食に「貧相すぎ」と批判 市回答",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598715?source=rss",
      "publishedAt": "2026-10-14T03:11:33.000Z",
      "xQuery": "給食に「貧相すぎ」と批判 市回答"
    },
    {
      "time": "14:14",
      "title": "積み荷はニワトリ3000羽 崩れ散乱",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598727?source=rss",
      "publishedAt": "2026-10-14T05:14:43.000Z",
      "xQuery": "積み荷はニワトリ3000羽 崩れ散乱"
    },
    {
      "time": "14:26",
      "title": "イオン系スーパー100店閉店 なぜ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598728?source=rss",
      "publishedAt": "2026-10-14T05:26:12.000Z",
      "xQuery": "イオン系スーパー100店閉店 なぜ"
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
