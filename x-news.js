window.LUS_X_NEWS = {
  "updatedAt": "2026-11-20T10:11:22.017Z",
  "items": [
    {
      "time": "18:36",
      "title": "政府内部資料流出か 不正アクセス",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603320?source=rss",
      "publishedAt": "2026-11-20T09:36:38.000Z",
      "xQuery": "政府内部資料流出か 不正アクセス"
    },
    {
      "time": "19:01",
      "title": "山形の国道 一時50台が立ち往生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603325?source=rss",
      "publishedAt": "2026-11-20T10:01:45.000Z",
      "xQuery": "山形の国道 一時50台が立ち往生"
    },
    {
      "time": "16:25",
      "title": "首相が中国到着時 タラップに段差",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603300?source=rss",
      "publishedAt": "2026-11-20T07:25:56.000Z",
      "xQuery": "首相が中国到着時 タラップに段差"
    },
    {
      "time": "17:31",
      "title": "上海で邦人死亡 別の邦人を拘束",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603308?source=rss",
      "publishedAt": "2026-11-20T08:31:46.000Z",
      "xQuery": "上海で邦人死亡 別の邦人を拘束"
    },
    {
      "time": "18:38",
      "title": "公認会計士 14歳が史上最年少合格",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603321?source=rss",
      "publishedAt": "2026-11-20T09:38:47.000Z",
      "xQuery": "公認会計士 14歳が史上最年少合格"
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
