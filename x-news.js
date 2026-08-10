window.LUS_X_NEWS = {
  "updatedAt": "2026-08-10T05:35:05.165Z",
  "items": [
    {
      "time": "12:21",
      "title": "台風 あす関東・東北に上陸の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591177?source=rss",
      "publishedAt": "2026-08-10T03:21:09.000Z",
      "xQuery": "台風 あす関東・東北に上陸の恐れ"
    },
    {
      "time": "12:41",
      "title": "日銀委員 利上げペース加速の意見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591178?source=rss",
      "publishedAt": "2026-08-10T03:41:02.000Z",
      "xQuery": "日銀委員 利上げペース加速の意見"
    },
    {
      "time": "13:36",
      "title": "2年前に89歳女性殺害疑い 娘逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591184?source=rss",
      "publishedAt": "2026-08-10T04:36:43.000Z",
      "xQuery": "2年前に89歳女性殺害疑い 娘逮捕"
    },
    {
      "time": "14:07",
      "title": "海で3人流されたか 2人心肺停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591189?source=rss",
      "publishedAt": "2026-08-10T05:07:34.000Z",
      "xQuery": "海で3人流されたか 2人心肺停止"
    },
    {
      "time": "14:24",
      "title": "クマが牧場のヤギを襲撃 捕食確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591190?source=rss",
      "publishedAt": "2026-08-10T05:24:33.000Z",
      "xQuery": "クマが牧場のヤギを襲撃 捕食確認"
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
