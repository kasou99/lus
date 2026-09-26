window.LUS_X_NEWS = {
  "updatedAt": "2026-09-26T07:17:44.619Z",
  "items": [
    {
      "time": "15:23",
      "title": "憲法改正巡り 注目される自民布陣",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596611?source=rss",
      "publishedAt": "2026-09-26T06:23:22.000Z",
      "xQuery": "憲法改正巡り 注目される自民布陣"
    },
    {
      "time": "11:36",
      "title": "「名代」茂木氏 首脳外交を補完",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596590?source=rss",
      "publishedAt": "2026-09-26T02:36:42.000Z",
      "xQuery": "「名代」茂木氏 首脳外交を補完"
    },
    {
      "time": "15:19",
      "title": "6階から女児落とされ 警官ら救う",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596610?source=rss",
      "publishedAt": "2026-09-26T06:19:16.000Z",
      "xQuery": "6階から女児落とされ 警官ら救う"
    },
    {
      "time": "14:19",
      "title": "名古屋テレビ塔で火災 30人が避難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596605?source=rss",
      "publishedAt": "2026-09-26T05:19:19.000Z",
      "xQuery": "名古屋テレビ塔で火災 30人が避難"
    },
    {
      "time": "14:40",
      "title": "新潟の廃止油田 止まらぬ石油流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596606?source=rss",
      "publishedAt": "2026-09-26T05:40:51.000Z",
      "xQuery": "新潟の廃止油田 止まらぬ石油流出"
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
