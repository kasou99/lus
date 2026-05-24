window.LUS_X_NEWS = {
  "updatedAt": "2026-05-24T11:37:37.223Z",
  "items": [
    {
      "time": "20:07",
      "title": "米イラン覚書案報道 核で食い違い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581529?source=rss",
      "publishedAt": "2026-05-24T11:07:57.000Z",
      "xQuery": "米イラン覚書案報道 核で食い違い"
    },
    {
      "time": "19:36",
      "title": "首相宿願「国旗損壊罪」急ぐ自民",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581522?source=rss",
      "publishedAt": "2026-05-24T10:36:23.000Z",
      "xQuery": "首相宿願「国旗損壊罪」急ぐ自民"
    },
    {
      "time": "17:46",
      "title": "小沢氏 中道が軸の政権奪取不可能",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581511?source=rss",
      "publishedAt": "2026-05-24T08:46:44.000Z",
      "xQuery": "小沢氏 中道が軸の政権奪取不可能"
    },
    {
      "time": "19:17",
      "title": "母娘殺害事件 42歳の男を指名手配",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581521?source=rss",
      "publishedAt": "2026-05-24T10:17:42.000Z",
      "xQuery": "母娘殺害事件 42歳の男を指名手配"
    },
    {
      "time": "16:52",
      "title": "平均年齢73歳が接客 渋谷の茶屋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581503?source=rss",
      "publishedAt": "2026-05-24T07:52:30.000Z",
      "xQuery": "平均年齢73歳が接客 渋谷の茶屋"
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
