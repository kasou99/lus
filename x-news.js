window.LUS_X_NEWS = {
  "updatedAt": "2026-06-18T09:04:15.473Z",
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
      "time": "16:13",
      "title": "ナフサ危機 倒産が相次ぐ可能性も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584713?source=rss",
      "publishedAt": "2026-06-18T07:13:19.000Z",
      "xQuery": "ナフサ危機 倒産が相次ぐ可能性も"
    },
    {
      "time": "15:45",
      "title": "ニデック株主総会 怒りの声相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584709?source=rss",
      "publishedAt": "2026-06-18T06:45:49.000Z",
      "xQuery": "ニデック株主総会 怒りの声相次ぐ"
    },
    {
      "time": "17:35",
      "title": "羽田発機内でスマホ発火 けがなし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584725?source=rss",
      "publishedAt": "2026-06-18T08:35:23.000Z",
      "xQuery": "羽田発機内でスマホ発火 けがなし"
    },
    {
      "time": "16:43",
      "title": "無人の高所作業車に挟まれ 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584719?source=rss",
      "publishedAt": "2026-06-18T07:43:57.000Z",
      "xQuery": "無人の高所作業車に挟まれ 死亡"
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
