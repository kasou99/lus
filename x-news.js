window.LUS_X_NEWS = {
  "updatedAt": "2026-05-29T22:09:28.479Z",
  "items": [
    {
      "time": "22:49",
      "title": "食品消費税 27年4月1%軸に検討か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582234?source=rss",
      "publishedAt": "2026-05-29T13:49:32.000Z",
      "xQuery": "食品消費税 27年4月1%軸に検討か"
    },
    {
      "time": "22:53",
      "title": "診察キャンセル料巡り厚労相陳謝",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582235?source=rss",
      "publishedAt": "2026-05-29T13:53:29.000Z",
      "xQuery": "診察キャンセル料巡り厚労相陳謝"
    },
    {
      "time": "22:40",
      "title": "副首都法案 自民党内から異論噴出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582230?source=rss",
      "publishedAt": "2026-05-29T13:40:17.000Z",
      "xQuery": "副首都法案 自民党内から異論噴出"
    },
    {
      "time": "23:38",
      "title": "殺虫剤を誤飲し男性死亡 経緯捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582237?source=rss",
      "publishedAt": "2026-05-29T14:38:08.000Z",
      "xQuery": "殺虫剤を誤飲し男性死亡 経緯捜査"
    },
    {
      "time": "22:48",
      "title": "「白黒ポテトチップス」店頭に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582233?source=rss",
      "publishedAt": "2026-05-29T13:48:46.000Z",
      "xQuery": "「白黒ポテトチップス」店頭に"
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
