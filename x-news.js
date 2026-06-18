window.LUS_X_NEWS = {
  "updatedAt": "2026-06-18T07:10:58.874Z",
  "items": [
    {
      "time": "15:40",
      "title": "日経平均終値 初の7万円台",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584710?source=rss",
      "publishedAt": "2026-06-18T06:40:35.000Z",
      "xQuery": "日経平均終値 初の7万円台"
    },
    {
      "time": "14:40",
      "title": "立憲 25日にも両院議員懇談会開催",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584705?source=rss",
      "publishedAt": "2026-06-18T05:40:09.000Z",
      "xQuery": "立憲 25日にも両院議員懇談会開催"
    },
    {
      "time": "15:45",
      "title": "ニデック株主総会 怒りの声相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584709?source=rss",
      "publishedAt": "2026-06-18T06:45:49.000Z",
      "xQuery": "ニデック株主総会 怒りの声相次ぐ"
    },
    {
      "time": "15:07",
      "title": "妊婦はねられ死亡 被告に実刑判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584707?source=rss",
      "publishedAt": "2026-06-18T06:07:57.000Z",
      "xQuery": "妊婦はねられ死亡 被告に実刑判決"
    },
    {
      "time": "14:37",
      "title": "「DAZN Soccer」新規受付を停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584706?source=rss",
      "publishedAt": "2026-06-18T05:37:32.000Z",
      "xQuery": "「DAZN Soccer」新規受付を停止"
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
