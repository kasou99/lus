window.LUS_X_NEWS = {
  "updatedAt": "2026-06-19T03:22:16.166Z",
  "items": [
    {
      "time": "12:10",
      "title": "都内小学校で火事 児童ら9人搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584819?source=rss",
      "publishedAt": "2026-06-19T03:10:13.000Z",
      "xQuery": "都内小学校で火事 児童ら9人搬送"
    },
    {
      "time": "11:19",
      "title": "日野町事件 再審公判で無罪確実に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584810?source=rss",
      "publishedAt": "2026-06-19T02:19:19.000Z",
      "xQuery": "日野町事件 再審公判で無罪確実に"
    },
    {
      "time": "10:39",
      "title": "イラン最高指導者 米との覚書承認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584805?source=rss",
      "publishedAt": "2026-06-19T01:39:40.000Z",
      "xQuery": "イラン最高指導者 米との覚書承認"
    },
    {
      "time": "10:50",
      "title": "モスクワは燃える ウ大統領が警告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584806?source=rss",
      "publishedAt": "2026-06-19T01:50:36.000Z",
      "xQuery": "モスクワは燃える ウ大統領が警告"
    },
    {
      "time": "10:33",
      "title": "株価上昇が加速 恩恵は一部と識者",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584804?source=rss",
      "publishedAt": "2026-06-19T01:33:21.000Z",
      "xQuery": "株価上昇が加速 恩恵は一部と識者"
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
