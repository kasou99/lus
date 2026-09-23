window.LUS_X_NEWS = {
  "updatedAt": "2026-09-23T12:27:19.255Z",
  "items": [
    {
      "time": "19:19",
      "title": "台風 千葉・神奈川で計10人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596286?source=rss",
      "publishedAt": "2026-09-23T10:19:14.000Z",
      "xQuery": "台風 千葉・神奈川で計10人死亡"
    },
    {
      "time": "18:10",
      "title": "首相 米大統領との会談成果を強調",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596276?source=rss",
      "publishedAt": "2026-09-23T09:10:38.000Z",
      "xQuery": "首相 米大統領との会談成果を強調"
    },
    {
      "time": "20:50",
      "title": "堤防決壊 老舗養魚場が壊滅的被害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596297?source=rss",
      "publishedAt": "2026-09-23T11:50:52.000Z",
      "xQuery": "堤防決壊 老舗養魚場が壊滅的被害"
    },
    {
      "time": "20:55",
      "title": "不明の6歳か 遺体は離島で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596296?source=rss",
      "publishedAt": "2026-09-23T11:55:12.000Z",
      "xQuery": "不明の6歳か 遺体は離島で発見"
    },
    {
      "time": "20:37",
      "title": "神戸市 会議の委員発言を無断修正",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596294?source=rss",
      "publishedAt": "2026-09-23T11:37:31.000Z",
      "xQuery": "神戸市 会議の委員発言を無断修正"
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
