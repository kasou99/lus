window.LUS_X_NEWS = {
  "updatedAt": "2026-10-27T04:45:54.150Z",
  "items": [
    {
      "time": "12:31",
      "title": "米中間選挙 共和党牙城で野党猛追",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600291?source=rss",
      "publishedAt": "2026-10-27T03:31:05.000Z",
      "xQuery": "米中間選挙 共和党牙城で野党猛追"
    },
    {
      "time": "11:08",
      "title": "米メタ15兆円資金調達へ 計画発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600273?source=rss",
      "publishedAt": "2026-10-27T02:08:41.000Z",
      "xQuery": "米メタ15兆円資金調達へ 計画発表"
    },
    {
      "time": "13:24",
      "title": "GMO攻撃者 個人情報1件を公開か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600296?source=rss",
      "publishedAt": "2026-10-27T04:24:03.000Z",
      "xQuery": "GMO攻撃者 個人情報1件を公開か"
    },
    {
      "time": "12:16",
      "title": "4歳傷害致死 同居男性に2審も無罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600289?source=rss",
      "publishedAt": "2026-10-27T03:16:38.000Z",
      "xQuery": "4歳傷害致死 同居男性に2審も無罪"
    },
    {
      "time": "12:27",
      "title": "大分大元教授の医師逮捕 背任疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600288?source=rss",
      "publishedAt": "2026-10-27T03:27:40.000Z",
      "xQuery": "大分大元教授の医師逮捕 背任疑い"
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
