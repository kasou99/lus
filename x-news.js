window.LUS_X_NEWS = {
  "updatedAt": "2026-06-26T12:55:01.556Z",
  "items": [
    {
      "time": "20:14",
      "title": "大雨ピークは2回 災害に厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585791?source=rss",
      "publishedAt": "2026-06-26T11:14:50.000Z",
      "xQuery": "大雨ピークは2回 災害に厳重警戒"
    },
    {
      "time": "20:55",
      "title": "ダブル台風 交通機関への影響は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585794?source=rss",
      "publishedAt": "2026-06-26T11:55:41.000Z",
      "xQuery": "ダブル台風 交通機関への影響は"
    },
    {
      "time": "21:10",
      "title": "雨で増水した川に転落か 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585797?source=rss",
      "publishedAt": "2026-06-26T12:10:45.000Z",
      "xQuery": "雨で増水した川に転落か 男性死亡"
    },
    {
      "time": "20:17",
      "title": "米軍基地事故で脚切断 国を提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585790?source=rss",
      "publishedAt": "2026-06-26T11:17:02.000Z",
      "xQuery": "米軍基地事故で脚切断 国を提訴"
    },
    {
      "time": "20:39",
      "title": "米テキサスでキリンが行方不明に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585793?source=rss",
      "publishedAt": "2026-06-26T11:39:53.000Z",
      "xQuery": "米テキサスでキリンが行方不明に"
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
