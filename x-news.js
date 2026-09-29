window.LUS_X_NEWS = {
  "updatedAt": "2026-09-29T10:19:05.283Z",
  "items": [
    {
      "time": "18:59",
      "title": "ニデック岸田社長が辞任 不正巡り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596980?source=rss",
      "publishedAt": "2026-09-29T09:59:59.000Z",
      "xQuery": "ニデック岸田社長が辞任 不正巡り"
    },
    {
      "time": "17:57",
      "title": "茂木氏 旧敵国条項巡り中国けん制",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596972?source=rss",
      "publishedAt": "2026-09-29T08:57:23.000Z",
      "xQuery": "茂木氏 旧敵国条項巡り中国けん制"
    },
    {
      "time": "19:04",
      "title": "教職員7万人の性犯歴確認へ 東京",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596979?source=rss",
      "publishedAt": "2026-09-29T10:04:21.000Z",
      "xQuery": "教職員7万人の性犯歴確認へ 東京"
    },
    {
      "time": "17:26",
      "title": "アンソロ社 AIの人類存亡危機警告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596968?source=rss",
      "publishedAt": "2026-09-29T08:26:24.000Z",
      "xQuery": "アンソロ社 AIの人類存亡危機警告"
    },
    {
      "time": "17:23",
      "title": "グーグル Gemini「Gems」終了へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596966?source=rss",
      "publishedAt": "2026-09-29T08:23:29.000Z",
      "xQuery": "グーグル Gemini「Gems」終了へ"
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
