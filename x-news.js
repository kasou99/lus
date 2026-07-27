window.LUS_X_NEWS = {
  "updatedAt": "2026-07-27T00:52:35.536Z",
  "items": [
    {
      "time": "08:50",
      "title": "各地で猛烈な暑さ 九州で酷暑日か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589447?source=rss",
      "publishedAt": "2026-07-26T23:50:03.000Z",
      "xQuery": "各地で猛烈な暑さ 九州で酷暑日か"
    },
    {
      "time": "07:41",
      "title": "主食用米 20県で増産の見込み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589438?source=rss",
      "publishedAt": "2026-07-26T22:41:29.000Z",
      "xQuery": "主食用米 20県で増産の見込み"
    },
    {
      "time": "08:07",
      "title": "独LGBTQ祭典襲撃 容疑者が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589443?source=rss",
      "publishedAt": "2026-07-26T23:07:33.000Z",
      "xQuery": "独LGBTQ祭典襲撃 容疑者が死亡"
    },
    {
      "time": "09:41",
      "title": "住宅火災 子ども2人含む4人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589456?source=rss",
      "publishedAt": "2026-07-27T00:41:50.000Z",
      "xQuery": "住宅火災 子ども2人含む4人死亡"
    },
    {
      "time": "07:19",
      "title": "路上に寝ていたか 男性ひかれ死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589437?source=rss",
      "publishedAt": "2026-07-26T22:19:14.000Z",
      "xQuery": "路上に寝ていたか 男性ひかれ死亡"
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
