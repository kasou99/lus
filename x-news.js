window.LUS_X_NEWS = {
  "updatedAt": "2026-09-20T06:27:48.216Z",
  "items": [
    {
      "time": "15:16",
      "title": "北朝鮮のミサイルはすでに落下か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595912?source=rss",
      "publishedAt": "2026-09-20T06:16:33.000Z",
      "xQuery": "北朝鮮のミサイルはすでに落下か"
    },
    {
      "time": "14:37",
      "title": "台風が21日関東接近 氾濫など警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595904?source=rss",
      "publishedAt": "2026-09-20T05:37:28.000Z",
      "xQuery": "台風が21日関東接近 氾濫など警戒"
    },
    {
      "time": "14:37",
      "title": "岡田克也氏 新党への参加を明言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595906?source=rss",
      "publishedAt": "2026-09-20T05:37:09.000Z",
      "xQuery": "岡田克也氏 新党への参加を明言"
    },
    {
      "time": "13:07",
      "title": "「娘の死で商売」豪雨後の中傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595891?source=rss",
      "publishedAt": "2026-09-20T04:07:25.000Z",
      "xQuery": "「娘の死で商売」豪雨後の中傷"
    },
    {
      "time": "13:06",
      "title": "車とバイクが事故 歩道の3歳重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595894?source=rss",
      "publishedAt": "2026-09-20T04:06:55.000Z",
      "xQuery": "車とバイクが事故 歩道の3歳重体"
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
