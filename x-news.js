window.LUS_X_NEWS = {
  "updatedAt": "2026-06-21T22:33:28.679Z",
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
      "time": "06:31",
      "title": "スターマー英首相 近日退任表明か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585143?source=rss",
      "publishedAt": "2026-06-21T21:31:51.000Z",
      "xQuery": "スターマー英首相 近日退任表明か"
    },
    {
      "time": "06:59",
      "title": "旧宮家養子案「反対」32% 毎日",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585146?source=rss",
      "publishedAt": "2026-06-21T21:59:52.000Z",
      "xQuery": "旧宮家養子案「反対」32% 毎日"
    },
    {
      "time": "06:47",
      "title": "温泉で5歳不明 川への転落懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585145?source=rss",
      "publishedAt": "2026-06-21T21:47:27.000Z",
      "xQuery": "温泉で5歳不明 川への転落懸念"
    },
    {
      "time": "21:59",
      "title": "オートバイの21歳死亡 車と衝突",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585131?source=rss",
      "publishedAt": "2026-06-21T12:59:19.000Z",
      "xQuery": "オートバイの21歳死亡 車と衝突"
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
