window.LUS_X_NEWS = {
  "updatedAt": "2026-07-12T10:59:00.386Z",
  "items": [
    {
      "time": "17:23",
      "title": "ホルムズ海峡で攻撃 インド人不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587690?source=rss",
      "publishedAt": "2026-07-12T08:23:06.000Z",
      "xQuery": "ホルムズ海峡で攻撃 インド人不明"
    },
    {
      "time": "18:00",
      "title": "南シナ海の中国主張巡り 共同声明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587693?source=rss",
      "publishedAt": "2026-07-12T09:00:01.000Z",
      "xQuery": "南シナ海の中国主張巡り 共同声明"
    },
    {
      "time": "19:49",
      "title": "暴力で患者怒らせ 面白がり撮影か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587704?source=rss",
      "publishedAt": "2026-07-12T10:49:09.000Z",
      "xQuery": "暴力で患者怒らせ 面白がり撮影か"
    },
    {
      "time": "18:46",
      "title": "40歳女性ひかれ死亡 6歳娘は軽傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587702?source=rss",
      "publishedAt": "2026-07-12T09:46:12.000Z",
      "xQuery": "40歳女性ひかれ死亡 6歳娘は軽傷"
    },
    {
      "time": "17:50",
      "title": "ぬれぎぬで解雇され自殺 遺族憤り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587695?source=rss",
      "publishedAt": "2026-07-12T08:50:50.000Z",
      "xQuery": "ぬれぎぬで解雇され自殺 遺族憤り"
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
