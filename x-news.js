window.LUS_X_NEWS = {
  "updatedAt": "2026-10-03T00:49:10.456Z",
  "items": [
    {
      "time": "07:46",
      "title": "副首都となる要件 4道府県満たす",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597340?source=rss",
      "publishedAt": "2026-10-02T22:46:02.000Z",
      "xQuery": "副首都となる要件 4道府県満たす"
    },
    {
      "time": "08:07",
      "title": "露の新型ドローン イラン製を改良",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597343?source=rss",
      "publishedAt": "2026-10-02T23:07:53.000Z",
      "xQuery": "露の新型ドローン イラン製を改良"
    },
    {
      "time": "08:18",
      "title": "人口水増し 市が交付税過剰受領か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597345?source=rss",
      "publishedAt": "2026-10-02T23:18:32.000Z",
      "xQuery": "人口水増し 市が交付税過剰受領か"
    },
    {
      "time": "08:39",
      "title": "予算削減発言 簗農相は辞任否定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597346?source=rss",
      "publishedAt": "2026-10-02T23:39:30.000Z",
      "xQuery": "予算削減発言 簗農相は辞任否定"
    },
    {
      "time": "08:41",
      "title": "機長刺した副操縦士 過去乗務禁止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597344?source=rss",
      "publishedAt": "2026-10-02T23:41:32.000Z",
      "xQuery": "機長刺した副操縦士 過去乗務禁止"
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
