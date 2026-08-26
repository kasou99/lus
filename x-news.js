window.LUS_X_NEWS = {
  "updatedAt": "2026-08-26T12:14:15.245Z",
  "items": [
    {
      "time": "19:46",
      "title": "備蓄米買い戻しへ 農水省最終調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593175?source=rss",
      "publishedAt": "2026-08-26T10:46:43.000Z",
      "xQuery": "備蓄米買い戻しへ 農水省最終調整"
    },
    {
      "time": "18:04",
      "title": "韓国 対北を巡り「蚊帳の外」懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593157?source=rss",
      "publishedAt": "2026-08-26T09:04:14.000Z",
      "xQuery": "韓国 対北を巡り「蚊帳の外」懸念"
    },
    {
      "time": "20:35",
      "title": "ネパール洪水 観光客380人超不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593180?source=rss",
      "publishedAt": "2026-08-26T11:35:36.000Z",
      "xQuery": "ネパール洪水 観光客380人超不明"
    },
    {
      "time": "20:37",
      "title": "火災で新生児14人死亡 パキスタン",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593181?source=rss",
      "publishedAt": "2026-08-26T11:37:02.000Z",
      "xQuery": "火災で新生児14人死亡 パキスタン"
    },
    {
      "time": "18:02",
      "title": "左右の足間違え手術 患者側と和解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593163?source=rss",
      "publishedAt": "2026-08-26T09:02:47.000Z",
      "xQuery": "左右の足間違え手術 患者側と和解"
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
