window.LUS_X_NEWS = {
  "updatedAt": "2026-08-05T01:38:31.462Z",
  "items": [
    {
      "time": "09:46",
      "title": "日経平均 一時2200円超の値上がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590575?source=rss",
      "publishedAt": "2026-08-05T00:46:30.000Z",
      "xQuery": "日経平均 一時2200円超の値上がり"
    },
    {
      "time": "08:56",
      "title": "米財務長官 円の水準を問題視",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590567?source=rss",
      "publishedAt": "2026-08-04T23:56:06.000Z",
      "xQuery": "米財務長官 円の水準を問題視"
    },
    {
      "time": "09:20",
      "title": "ドローンがウの民間人を追跡 爆発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590569?source=rss",
      "publishedAt": "2026-08-05T00:20:28.000Z",
      "xQuery": "ドローンがウの民間人を追跡 爆発"
    },
    {
      "time": "10:03",
      "title": "刃物持つ男に警官発砲 左胸に命中",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590576?source=rss",
      "publishedAt": "2026-08-05T01:03:41.000Z",
      "xQuery": "刃物持つ男に警官発砲 左胸に命中"
    },
    {
      "time": "07:43",
      "title": "偽iPhone大量発見 不正還付発覚",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590559?source=rss",
      "publishedAt": "2026-08-04T22:43:07.000Z",
      "xQuery": "偽iPhone大量発見 不正還付発覚"
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
