window.LUS_X_NEWS = {
  "updatedAt": "2026-05-22T01:14:04.032Z",
  "items": [
    {
      "time": "09:04",
      "title": "エボラ巡り 仏発旅客機目的地変更",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581181?source=rss",
      "publishedAt": "2026-05-22T00:04:59.000Z",
      "xQuery": "エボラ巡り 仏発旅客機目的地変更"
    },
    {
      "time": "08:49",
      "title": "支援のランドセル届かず 中東緊迫",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581180?source=rss",
      "publishedAt": "2026-05-21T23:49:24.000Z",
      "xQuery": "支援のランドセル届かず 中東緊迫"
    },
    {
      "time": "07:24",
      "title": "女性職員にセクハラ 市長辞職意向",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581163?source=rss",
      "publishedAt": "2026-05-21T22:24:38.000Z",
      "xQuery": "女性職員にセクハラ 市長辞職意向"
    },
    {
      "time": "08:32",
      "title": "公園利用で市方針転換 モスク困惑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581178?source=rss",
      "publishedAt": "2026-05-21T23:32:21.000Z",
      "xQuery": "公園利用で市方針転換 モスク困惑"
    },
    {
      "time": "09:13",
      "title": "少年野球場に無許可建築 除却勧告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581182?source=rss",
      "publishedAt": "2026-05-22T00:13:23.000Z",
      "xQuery": "少年野球場に無許可建築 除却勧告"
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
