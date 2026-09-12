window.LUS_X_NEWS = {
  "updatedAt": "2026-09-12T09:36:42.998Z",
  "items": [
    {
      "time": "16:11",
      "title": "農家落胆 福井大雨でソバに大打撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595063?source=rss",
      "publishedAt": "2026-09-12T07:11:37.000Z",
      "xQuery": "農家落胆 福井大雨でソバに大打撃"
    },
    {
      "time": "15:43",
      "title": "ゴールは壊滅 地道な暴追で街変化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595061?source=rss",
      "publishedAt": "2026-09-12T06:43:18.000Z",
      "xQuery": "ゴールは壊滅 地道な暴追で街変化"
    },
    {
      "time": "16:50",
      "title": "ヘリで空撮 目隠しの内側なぜ報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595068?source=rss",
      "publishedAt": "2026-09-12T07:50:40.000Z",
      "xQuery": "ヘリで空撮 目隠しの内側なぜ報道"
    },
    {
      "time": "18:03",
      "title": "ケーキ店火災 男性は前日も来店",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595075?source=rss",
      "publishedAt": "2026-09-12T09:03:43.000Z",
      "xQuery": "ケーキ店火災 男性は前日も来店"
    },
    {
      "time": "16:58",
      "title": "「VAIO T」発表 再挑戦する理由",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595069?source=rss",
      "publishedAt": "2026-09-12T07:58:49.000Z",
      "xQuery": "「VAIO T」発表 再挑戦する理由"
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
