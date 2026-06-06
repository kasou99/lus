window.LUS_X_NEWS = {
  "updatedAt": "2026-06-06T13:37:59.746Z",
  "items": [
    {
      "time": "21:48",
      "title": "「飛鳥・藤原」地元たゆまぬ努力",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583227?source=rss",
      "publishedAt": "2026-06-06T12:48:37.000Z",
      "xQuery": "「飛鳥・藤原」地元たゆまぬ努力"
    },
    {
      "time": "21:29",
      "title": "習氏が訪朝へ 露への接近けん制か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583225?source=rss",
      "publishedAt": "2026-06-06T12:29:38.000Z",
      "xQuery": "習氏が訪朝へ 露への接近けん制か"
    },
    {
      "time": "21:29",
      "title": "障害福祉の不正受給80億円 5年間",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583226?source=rss",
      "publishedAt": "2026-06-06T12:29:47.000Z",
      "xQuery": "障害福祉の不正受給80億円 5年間"
    },
    {
      "time": "21:12",
      "title": "海水浴で溺れる 男子中学生が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583224?source=rss",
      "publishedAt": "2026-06-06T12:12:22.000Z",
      "xQuery": "海水浴で溺れる 男子中学生が死亡"
    },
    {
      "time": "19:24",
      "title": "いとこと結婚強要され 絶縁を決断",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583203?source=rss",
      "publishedAt": "2026-06-06T10:24:32.000Z",
      "xQuery": "いとこと結婚強要され 絶縁を決断"
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
