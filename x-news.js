window.LUS_X_NEWS = {
  "updatedAt": "2026-06-21T18:41:37.050Z",
  "items": [
    {
      "time": "22:50",
      "title": "米イラン協議 レバノン情勢が焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585137?source=rss",
      "publishedAt": "2026-06-21T13:50:19.000Z",
      "xQuery": "米イラン協議 レバノン情勢が焦点"
    },
    {
      "time": "22:43",
      "title": "安保3文書「新しい守り方」明記へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585134?source=rss",
      "publishedAt": "2026-06-21T13:43:58.000Z",
      "xQuery": "安保3文書「新しい守り方」明記へ"
    },
    {
      "time": "21:06",
      "title": "5歳が行方不明 温泉施設で入浴中",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585125?source=rss",
      "publishedAt": "2026-06-21T12:06:56.000Z",
      "xQuery": "5歳が行方不明 温泉施設で入浴中"
    },
    {
      "time": "21:59",
      "title": "オートバイの21歳死亡 車と衝突",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585131?source=rss",
      "publishedAt": "2026-06-21T12:59:19.000Z",
      "xQuery": "オートバイの21歳死亡 車と衝突"
    },
    {
      "time": "21:38",
      "title": "「独身偽装」被害訴える人相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585128?source=rss",
      "publishedAt": "2026-06-21T12:38:03.000Z",
      "xQuery": "「独身偽装」被害訴える人相次ぐ"
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
