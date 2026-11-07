window.LUS_X_NEWS = {
  "updatedAt": "2026-11-07T21:35:12.162Z",
  "items": [
    {
      "time": "01:13",
      "title": "愛知県で震度5強 津波の心配なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601719?source=rss",
      "publishedAt": "2026-11-07T16:13:23.000Z",
      "xQuery": "愛知県で震度5強 津波の心配なし"
    },
    {
      "time": "23:18",
      "title": "米中間選挙 共和党大敗の舞台裏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601716?source=rss",
      "publishedAt": "2026-11-07T14:18:01.000Z",
      "xQuery": "米中間選挙 共和党大敗の舞台裏"
    },
    {
      "time": "23:37",
      "title": "大阪維新の会「吉村体制」3期目に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601718?source=rss",
      "publishedAt": "2026-11-07T14:37:04.000Z",
      "xQuery": "大阪維新の会「吉村体制」3期目に"
    },
    {
      "time": "22:13",
      "title": "基地交付金 打ち切り恐れに町反発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601709?source=rss",
      "publishedAt": "2026-11-07T13:13:56.000Z",
      "xQuery": "基地交付金 打ち切り恐れに町反発"
    },
    {
      "time": "21:32",
      "title": "女性を監禁疑い 供述後に遺体発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601700?source=rss",
      "publishedAt": "2026-11-07T12:32:34.000Z",
      "xQuery": "女性を監禁疑い 供述後に遺体発見"
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
