window.LUS_X_NEWS = {
  "updatedAt": "2026-11-22T10:10:01.111Z",
  "items": [
    {
      "time": "18:35",
      "title": "関東で広く乾燥 火災相次ぎ死者も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603581?source=rss",
      "publishedAt": "2026-11-22T09:35:26.000Z",
      "xQuery": "関東で広く乾燥 火災相次ぎ死者も"
    },
    {
      "time": "17:45",
      "title": "三原則例外 被爆者「言語道断だ」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603573?source=rss",
      "publishedAt": "2026-11-22T08:45:05.000Z",
      "xQuery": "三原則例外 被爆者「言語道断だ」"
    },
    {
      "time": "18:02",
      "title": "原発構内でガラスの下敷きに 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603574?source=rss",
      "publishedAt": "2026-11-22T09:02:34.000Z",
      "xQuery": "原発構内でガラスの下敷きに 死亡"
    },
    {
      "time": "18:49",
      "title": "海転落相次ぐ 生死分けた救命胴衣",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603580?source=rss",
      "publishedAt": "2026-11-22T09:49:30.000Z",
      "xQuery": "海転落相次ぐ 生死分けた救命胴衣"
    },
    {
      "time": "17:07",
      "title": "リーマン予想 AI証明巡り共同声明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603568?source=rss",
      "publishedAt": "2026-11-22T08:07:46.000Z",
      "xQuery": "リーマン予想 AI証明巡り共同声明"
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
