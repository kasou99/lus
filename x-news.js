window.LUS_X_NEWS = {
  "updatedAt": "2026-07-24T14:11:48.406Z",
  "items": [
    {
      "time": "22:12",
      "title": "「副首都構想」関連法が成立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589183?source=rss",
      "publishedAt": "2026-07-24T13:12:07.000Z",
      "xQuery": "「副首都構想」関連法が成立"
    },
    {
      "time": "20:47",
      "title": "露軍の航空機 北方領土を領空侵犯",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589179?source=rss",
      "publishedAt": "2026-07-24T11:47:22.000Z",
      "xQuery": "露軍の航空機 北方領土を領空侵犯"
    },
    {
      "time": "19:59",
      "title": "首相の睡眠 海外メディアも注目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589176?source=rss",
      "publishedAt": "2026-07-24T10:59:54.000Z",
      "xQuery": "首相の睡眠 海外メディアも注目"
    },
    {
      "time": "22:45",
      "title": "森林火災で非常事態宣言 スペイン",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589186?source=rss",
      "publishedAt": "2026-07-24T13:45:02.000Z",
      "xQuery": "森林火災で非常事態宣言 スペイン"
    },
    {
      "time": "22:45",
      "title": "霧島市の遺体は不明男児 父親胸中",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589185?source=rss",
      "publishedAt": "2026-07-24T13:45:18.000Z",
      "xQuery": "霧島市の遺体は不明男児 父親胸中"
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
