window.LUS_X_NEWS = {
  "updatedAt": "2026-09-16T19:14:15.946Z",
  "items": [
    {
      "time": "22:38",
      "title": "台風25号発生 発達しながら北上へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595529?source=rss",
      "publishedAt": "2026-09-16T13:38:24.000Z",
      "xQuery": "台風25号発生 発達しながら北上へ"
    },
    {
      "time": "21:58",
      "title": "3カ月ごと利上げ? やや期待先行",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595525?source=rss",
      "publishedAt": "2026-09-16T12:58:09.000Z",
      "xQuery": "3カ月ごと利上げ? やや期待先行"
    },
    {
      "time": "21:10",
      "title": "よど号事件 赤木容疑者が死亡か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595520?source=rss",
      "publishedAt": "2026-09-16T12:10:11.000Z",
      "xQuery": "よど号事件 赤木容疑者が死亡か"
    },
    {
      "time": "21:51",
      "title": "フィジー HIV拡大で非常事態宣言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595522?source=rss",
      "publishedAt": "2026-09-16T12:51:44.000Z",
      "xQuery": "フィジー HIV拡大で非常事態宣言"
    },
    {
      "time": "00:05",
      "title": "呪術廻戦コラボ巡り不正 牛角謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595532?source=rss",
      "publishedAt": "2026-09-16T15:05:57.000Z",
      "xQuery": "呪術廻戦コラボ巡り不正 牛角謝罪"
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
