window.LUS_X_NEWS = {
  "updatedAt": "2026-10-07T08:50:53.445Z",
  "items": [
    {
      "time": "15:09",
      "title": "公取委 ビール大手の動き長年注視",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597875?source=rss",
      "publishedAt": "2026-10-07T06:09:57.000Z",
      "xQuery": "公取委 ビール大手の動き長年注視"
    },
    {
      "time": "16:33",
      "title": "簗氏が別会合でも同様の発言 証言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597882?source=rss",
      "publishedAt": "2026-10-07T07:33:46.000Z",
      "xQuery": "簗氏が別会合でも同様の発言 証言"
    },
    {
      "time": "16:36",
      "title": "貸トランクルームで遺体発見 愛知",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597880?source=rss",
      "publishedAt": "2026-10-07T07:36:22.000Z",
      "xQuery": "貸トランクルームで遺体発見 愛知"
    },
    {
      "time": "14:38",
      "title": "マンジャロ求め訪日 韓国で広がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597871?source=rss",
      "publishedAt": "2026-10-07T05:38:04.000Z",
      "xQuery": "マンジャロ求め訪日 韓国で広がり"
    },
    {
      "time": "16:38",
      "title": "茨城県・茨城県警のHP 閲覧不可",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597884?source=rss",
      "publishedAt": "2026-10-07T07:38:13.000Z",
      "xQuery": "茨城県・茨城県警のHP 閲覧不可"
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
