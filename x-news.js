window.LUS_X_NEWS = {
  "updatedAt": "2026-10-09T00:56:15.474Z",
  "items": [
    {
      "time": "07:31",
      "title": "火葬能力 政令市4割超ひっ迫恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598071?source=rss",
      "publishedAt": "2026-10-08T22:31:08.000Z",
      "xQuery": "火葬能力 政令市4割超ひっ迫恐れ"
    },
    {
      "time": "09:19",
      "title": "プルデンシャル 背景に独特の文化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598084?source=rss",
      "publishedAt": "2026-10-09T00:19:47.000Z",
      "xQuery": "プルデンシャル 背景に独特の文化"
    },
    {
      "time": "08:58",
      "title": "米国防総省 銃殺刑を生配信へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598082?source=rss",
      "publishedAt": "2026-10-08T23:58:22.000Z",
      "xQuery": "米国防総省 銃殺刑を生配信へ"
    },
    {
      "time": "07:56",
      "title": "蛇口の水恐怖 ネパールでトラウマ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598073?source=rss",
      "publishedAt": "2026-10-08T22:56:13.000Z",
      "xQuery": "蛇口の水恐怖 ネパールでトラウマ"
    },
    {
      "time": "07:49",
      "title": "タイヤ交換中に破裂 作業員が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598072?source=rss",
      "publishedAt": "2026-10-08T22:49:38.000Z",
      "xQuery": "タイヤ交換中に破裂 作業員が死亡"
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
