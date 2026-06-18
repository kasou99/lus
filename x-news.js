window.LUS_X_NEWS = {
  "updatedAt": "2026-06-18T11:00:18.687Z",
  "items": [
    {
      "time": "17:24",
      "title": "ウクライナ モスクワに大規模攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584724?source=rss",
      "publishedAt": "2026-06-18T08:24:35.000Z",
      "xQuery": "ウクライナ モスクワに大規模攻撃"
    },
    {
      "time": "17:50",
      "title": "母の虐待でPTSD 息子の損賠訴訟",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584729?source=rss",
      "publishedAt": "2026-06-18T08:50:58.000Z",
      "xQuery": "母の虐待でPTSD 息子の損賠訴訟"
    },
    {
      "time": "18:05",
      "title": "トヨタのシエンタ 16万台リコール",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584730?source=rss",
      "publishedAt": "2026-06-18T09:05:03.000Z",
      "xQuery": "トヨタのシエンタ 16万台リコール"
    },
    {
      "time": "18:13",
      "title": "女性刺され死亡 別の部屋に子ども",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584734?source=rss",
      "publishedAt": "2026-06-18T09:13:11.000Z",
      "xQuery": "女性刺され死亡 別の部屋に子ども"
    },
    {
      "time": "18:32",
      "title": "クマがゴルフ練習場に 40人見守る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584736?source=rss",
      "publishedAt": "2026-06-18T09:32:33.000Z",
      "xQuery": "クマがゴルフ練習場に 40人見守る"
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
