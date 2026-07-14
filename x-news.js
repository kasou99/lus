window.LUS_X_NEWS = {
  "updatedAt": "2026-07-14T18:30:50.342Z",
  "items": [
    {
      "time": "19:19",
      "title": "東日本中心に危険な暑さ続く 注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587937?source=rss",
      "publishedAt": "2026-07-14T10:19:37.000Z",
      "xQuery": "東日本中心に危険な暑さ続く 注意"
    },
    {
      "time": "23:15",
      "title": "米消費者物価3.5%上昇 大幅鈍化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587963?source=rss",
      "publishedAt": "2026-07-14T14:15:37.000Z",
      "xQuery": "米消費者物価3.5%上昇 大幅鈍化"
    },
    {
      "time": "22:34",
      "title": "手足口病 27都府県で警報レベル超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587962?source=rss",
      "publishedAt": "2026-07-14T13:34:25.000Z",
      "xQuery": "手足口病 27都府県で警報レベル超"
    },
    {
      "time": "23:07",
      "title": "工場放火 男性に21億円の賠償命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587964?source=rss",
      "publishedAt": "2026-07-14T14:07:09.000Z",
      "xQuery": "工場放火 男性に21億円の賠償命令"
    },
    {
      "time": "22:12",
      "title": "KFC全店 品切れや臨時休業の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587957?source=rss",
      "publishedAt": "2026-07-14T13:12:08.000Z",
      "xQuery": "KFC全店 品切れや臨時休業の恐れ"
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
