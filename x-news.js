window.LUS_X_NEWS = {
  "updatedAt": "2026-07-06T01:43:17.083Z",
  "items": [
    {
      "time": "09:31",
      "title": "豪雨で親友失う 教師志し語り継ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586893?source=rss",
      "publishedAt": "2026-07-06T00:31:36.000Z",
      "xQuery": "豪雨で親友失う 教師志し語り継ぐ"
    },
    {
      "time": "07:56",
      "title": "「クマ不安」欠席とせず 各地学校",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586882?source=rss",
      "publishedAt": "2026-07-05T22:56:12.000Z",
      "xQuery": "「クマ不安」欠席とせず 各地学校"
    },
    {
      "time": "09:23",
      "title": "建設業の倒産 4年連続前年上回る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586892?source=rss",
      "publishedAt": "2026-07-06T00:23:53.000Z",
      "xQuery": "建設業の倒産 4年連続前年上回る"
    },
    {
      "time": "09:47",
      "title": "バンダイchに攻撃疑い 15歳を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586895?source=rss",
      "publishedAt": "2026-07-06T00:47:37.000Z",
      "xQuery": "バンダイchに攻撃疑い 15歳を逮捕"
    },
    {
      "time": "08:43",
      "title": "寺に放火疑い 僧侶見習いを逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586887?source=rss",
      "publishedAt": "2026-07-05T23:43:55.000Z",
      "xQuery": "寺に放火疑い 僧侶見習いを逮捕"
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
