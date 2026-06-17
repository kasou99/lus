window.LUS_X_NEWS = {
  "updatedAt": "2026-06-17T20:18:53.551Z",
  "items": [
    {
      "time": "22:28",
      "title": "トランプ氏 イラン次第で攻撃再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584642?source=rss",
      "publishedAt": "2026-06-17T13:28:57.000Z",
      "xQuery": "トランプ氏 イラン次第で攻撃再開"
    },
    {
      "time": "23:43",
      "title": "桂田被告が即日控訴 乗客家族憤り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584650?source=rss",
      "publishedAt": "2026-06-17T14:43:18.000Z",
      "xQuery": "桂田被告が即日控訴 乗客家族憤り"
    },
    {
      "time": "22:53",
      "title": "子の水難「魔の時間帯」注意点は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584645?source=rss",
      "publishedAt": "2026-06-17T13:53:14.000Z",
      "xQuery": "子の水難「魔の時間帯」注意点は"
    },
    {
      "time": "20:34",
      "title": "スマホで子の生活乱れ 入院で治療",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584630?source=rss",
      "publishedAt": "2026-06-17T11:34:13.000Z",
      "xQuery": "スマホで子の生活乱れ 入院で治療"
    },
    {
      "time": "23:56",
      "title": "武田薬品 社長の役員報酬23億円超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584651?source=rss",
      "publishedAt": "2026-06-17T14:56:19.000Z",
      "xQuery": "武田薬品 社長の役員報酬23億円超"
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
