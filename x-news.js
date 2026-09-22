window.LUS_X_NEWS = {
  "updatedAt": "2026-09-22T23:37:12.660Z",
  "items": [
    {
      "time": "07:15",
      "title": "日米 経済安保で連携の方針一致",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596200?source=rss",
      "publishedAt": "2026-09-22T22:15:54.000Z",
      "xQuery": "日米 経済安保で連携の方針一致"
    },
    {
      "time": "07:30",
      "title": "新たな台風発生へ 27日沖縄の南に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596202?source=rss",
      "publishedAt": "2026-09-22T22:30:11.000Z",
      "xQuery": "新たな台風発生へ 27日沖縄の南に"
    },
    {
      "time": "07:30",
      "title": "AIは「SI」に改称 米大統領宣言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596201?source=rss",
      "publishedAt": "2026-09-22T22:30:01.000Z",
      "xQuery": "AIは「SI」に改称 米大統領宣言"
    },
    {
      "time": "08:06",
      "title": "退職代行サービス 1年で2割停止か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596208?source=rss",
      "publishedAt": "2026-09-22T23:06:23.000Z",
      "xQuery": "退職代行サービス 1年で2割停止か"
    },
    {
      "time": "07:47",
      "title": "キツネが玄関先にモグラ置く なぜ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596204?source=rss",
      "publishedAt": "2026-09-22T22:47:54.000Z",
      "xQuery": "キツネが玄関先にモグラ置く なぜ"
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
