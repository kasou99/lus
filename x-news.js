window.LUS_X_NEWS = {
  "updatedAt": "2026-07-18T14:55:32.636Z",
  "items": [
    {
      "time": "20:13",
      "title": "食品消費税1% 効果に不透明感も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588426?source=rss",
      "publishedAt": "2026-07-18T11:13:17.000Z",
      "xQuery": "食品消費税1% 効果に不透明感も"
    },
    {
      "time": "18:14",
      "title": "京アニ事件7年 犠牲者の兄の後悔",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588414?source=rss",
      "publishedAt": "2026-07-18T09:14:26.000Z",
      "xQuery": "京アニ事件7年 犠牲者の兄の後悔"
    },
    {
      "time": "23:43",
      "title": "ボートから落ち23歳死亡 琵琶湖",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588451?source=rss",
      "publishedAt": "2026-07-18T14:43:02.000Z",
      "xQuery": "ボートから落ち23歳死亡 琵琶湖"
    },
    {
      "time": "22:12",
      "title": "花火大会で火事 落下後に爆発か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588442?source=rss",
      "publishedAt": "2026-07-18T13:12:19.000Z",
      "xQuery": "花火大会で火事 落下後に爆発か"
    },
    {
      "time": "23:03",
      "title": "iPhone値上げ 中古の需要急増か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588448?source=rss",
      "publishedAt": "2026-07-18T14:03:34.000Z",
      "xQuery": "iPhone値上げ 中古の需要急増か"
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
