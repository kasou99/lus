window.LUS_X_NEWS = {
  "updatedAt": "2026-07-04T09:19:44.018Z",
  "items": [
    {
      "time": "15:06",
      "title": "高市政権 エネ巡りにじむ対露配慮",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586696?source=rss",
      "publishedAt": "2026-07-04T06:06:17.000Z",
      "xQuery": "高市政権 エネ巡りにじむ対露配慮"
    },
    {
      "time": "16:32",
      "title": "ドイツ 中国大使呼び出し懸念表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586708?source=rss",
      "publishedAt": "2026-07-04T07:32:41.000Z",
      "xQuery": "ドイツ 中国大使呼び出し懸念表明"
    },
    {
      "time": "15:29",
      "title": "不明の10歳死亡 父が声震わせ訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586704?source=rss",
      "publishedAt": "2026-07-04T06:29:41.000Z",
      "xQuery": "不明の10歳死亡 父が声震わせ訴え"
    },
    {
      "time": "15:08",
      "title": "クマに発砲も 別メンバーに当たる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586701?source=rss",
      "publishedAt": "2026-07-04T06:08:37.000Z",
      "xQuery": "クマに発砲も 別メンバーに当たる"
    },
    {
      "time": "17:21",
      "title": "無煙たばこ 口腔学会トップが警告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586715?source=rss",
      "publishedAt": "2026-07-04T08:21:44.000Z",
      "xQuery": "無煙たばこ 口腔学会トップが警告"
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
