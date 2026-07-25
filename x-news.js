window.LUS_X_NEWS = {
  "updatedAt": "2026-07-25T03:09:42.872Z",
  "items": [
    {
      "time": "11:39",
      "title": "セブン&i 東欧企業への出資見送り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589235?source=rss",
      "publishedAt": "2026-07-25T02:39:58.000Z",
      "xQuery": "セブン&i 東欧企業への出資見送り"
    },
    {
      "time": "11:10",
      "title": "米軍 イラン港湾封鎖巡り商船攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589233?source=rss",
      "publishedAt": "2026-07-25T02:10:59.000Z",
      "xQuery": "米軍 イラン港湾封鎖巡り商船攻撃"
    },
    {
      "time": "10:09",
      "title": "感想文は自ら思考重視 文科省見解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589224?source=rss",
      "publishedAt": "2026-07-25T01:09:33.000Z",
      "xQuery": "感想文は自ら思考重視 文科省見解"
    },
    {
      "time": "11:44",
      "title": "実験的遺伝子治療後 中国6歳死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589236?source=rss",
      "publishedAt": "2026-07-25T02:44:10.000Z",
      "xQuery": "実験的遺伝子治療後 中国6歳死亡"
    },
    {
      "time": "11:17",
      "title": "妊娠出産が怖い トコフォビアとは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589230?source=rss",
      "publishedAt": "2026-07-25T02:17:25.000Z",
      "xQuery": "妊娠出産が怖い トコフォビアとは"
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
