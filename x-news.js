window.LUS_X_NEWS = {
  "updatedAt": "2026-07-21T22:22:31.410Z",
  "items": [
    {
      "time": "06:13",
      "title": "一時1ドル163円台 約39年半ぶり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588833?source=rss",
      "publishedAt": "2026-07-21T21:13:13.000Z",
      "xQuery": "一時1ドル163円台 約39年半ぶり"
    },
    {
      "time": "06:54",
      "title": "ウ軍総司令官解任 前国防相と対立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588836?source=rss",
      "publishedAt": "2026-07-21T21:54:30.000Z",
      "xQuery": "ウ軍総司令官解任 前国防相と対立"
    },
    {
      "time": "21:36",
      "title": "石破氏 消費減税見直しも選択肢",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588817?source=rss",
      "publishedAt": "2026-07-21T12:36:40.000Z",
      "xQuery": "石破氏 消費減税見直しも選択肢"
    },
    {
      "time": "06:23",
      "title": "ニチレイ障害 ハッカー集団が声明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588834?source=rss",
      "publishedAt": "2026-07-21T21:23:14.000Z",
      "xQuery": "ニチレイ障害 ハッカー集団が声明"
    },
    {
      "time": "23:05",
      "title": "露への大学生ら短期派遣 再開へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588829?source=rss",
      "publishedAt": "2026-07-21T14:05:19.000Z",
      "xQuery": "露への大学生ら短期派遣 再開へ"
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
