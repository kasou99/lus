window.LUS_X_NEWS = {
  "updatedAt": "2026-10-13T08:54:30.491Z",
  "items": [
    {
      "time": "16:44",
      "title": "首相 簗氏発言は「本当にダサイ」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598627?source=rss",
      "publishedAt": "2026-10-13T07:44:11.000Z",
      "xQuery": "首相 簗氏発言は「本当にダサイ」"
    },
    {
      "time": "17:16",
      "title": "那覇強殺 遺族「苦しい毎日」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598629?source=rss",
      "publishedAt": "2026-10-13T08:16:02.000Z",
      "xQuery": "那覇強殺 遺族「苦しい毎日」"
    },
    {
      "time": "16:13",
      "title": "韓国で切り付け事件 1人心肺停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598625?source=rss",
      "publishedAt": "2026-10-13T07:13:32.000Z",
      "xQuery": "韓国で切り付け事件 1人心肺停止"
    },
    {
      "time": "15:54",
      "title": "九州新幹線 一部は終日見合わせに",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598624?source=rss",
      "publishedAt": "2026-10-13T06:54:30.000Z",
      "xQuery": "九州新幹線 一部は終日見合わせに"
    },
    {
      "time": "16:44",
      "title": "カメムシ大量発生 影響長引く恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598626?source=rss",
      "publishedAt": "2026-10-13T07:44:04.000Z",
      "xQuery": "カメムシ大量発生 影響長引く恐れ"
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
