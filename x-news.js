window.LUS_X_NEWS = {
  "updatedAt": "2026-09-09T01:28:44.247Z",
  "items": [
    {
      "time": "09:02",
      "title": "広範囲で大雨 線状降水帯に警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594710?source=rss",
      "publishedAt": "2026-09-09T00:02:12.000Z",
      "xQuery": "広範囲で大雨 線状降水帯に警戒"
    },
    {
      "time": "08:48",
      "title": "上智大生殺害30年 父親に焦燥感",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594708?source=rss",
      "publishedAt": "2026-09-08T23:48:56.000Z",
      "xQuery": "上智大生殺害30年 父親に焦燥感"
    },
    {
      "time": "10:03",
      "title": "蔵内勇夫氏 県議辞職した理由語る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594715?source=rss",
      "publishedAt": "2026-09-09T01:03:33.000Z",
      "xQuery": "蔵内勇夫氏 県議辞職した理由語る"
    },
    {
      "time": "09:00",
      "title": "ケーキ店火災 男性再来店後に出火",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594709?source=rss",
      "publishedAt": "2026-09-09T00:00:36.000Z",
      "xQuery": "ケーキ店火災 男性再来店後に出火"
    },
    {
      "time": "09:24",
      "title": "大阪メトロ 磁気切符を廃止へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594712?source=rss",
      "publishedAt": "2026-09-09T00:24:35.000Z",
      "xQuery": "大阪メトロ 磁気切符を廃止へ"
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
