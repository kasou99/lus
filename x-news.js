window.LUS_X_NEWS = {
  "updatedAt": "2026-06-18T01:33:39.651Z",
  "items": [
    {
      "time": "08:55",
      "title": "米イラン首脳が覚書に電子署名",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584670?source=rss",
      "publishedAt": "2026-06-17T23:55:48.000Z",
      "xQuery": "米イラン首脳が覚書に電子署名"
    },
    {
      "time": "09:39",
      "title": "日経平均 一時初の7万1000円台",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584675?source=rss",
      "publishedAt": "2026-06-18T00:39:15.000Z",
      "xQuery": "日経平均 一時初の7万1000円台"
    },
    {
      "time": "09:06",
      "title": "アップル製品値上げ方針 米紙報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584672?source=rss",
      "publishedAt": "2026-06-18T00:06:33.000Z",
      "xQuery": "アップル製品値上げ方針 米紙報道"
    },
    {
      "time": "10:18",
      "title": "女性死亡 女を逮捕「友人刺した」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584677?source=rss",
      "publishedAt": "2026-06-18T01:18:24.000Z",
      "xQuery": "女性死亡 女を逮捕「友人刺した」"
    },
    {
      "time": "08:01",
      "title": "土砂崩れ住人の下半身埋まる 大分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584667?source=rss",
      "publishedAt": "2026-06-17T23:01:12.000Z",
      "xQuery": "土砂崩れ住人の下半身埋まる 大分"
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
