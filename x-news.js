window.LUS_X_NEWS = {
  "updatedAt": "2026-06-27T08:01:24.421Z",
  "items": [
    {
      "time": "16:40",
      "title": "台風7号は今夜関東に最接近 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585887?source=rss",
      "publishedAt": "2026-06-27T07:40:27.000Z",
      "xQuery": "台風7号は今夜関東に最接近 警戒"
    },
    {
      "time": "14:43",
      "title": "急速に老化が進む難病 家族の13年",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585866?source=rss",
      "publishedAt": "2026-06-27T05:43:33.000Z",
      "xQuery": "急速に老化が進む難病 家族の13年"
    },
    {
      "time": "16:55",
      "title": "車が海に落ち夫婦死亡 誤操作か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585890?source=rss",
      "publishedAt": "2026-06-27T07:55:37.000Z",
      "xQuery": "車が海に落ち夫婦死亡 誤操作か"
    },
    {
      "time": "15:22",
      "title": "臨時休校 大量の給食パン余り販売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585875?source=rss",
      "publishedAt": "2026-06-27T06:22:27.000Z",
      "xQuery": "臨時休校 大量の給食パン余り販売"
    },
    {
      "time": "16:10",
      "title": "「テレビ離れ」全世代で加速 なぜ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585879?source=rss",
      "publishedAt": "2026-06-27T07:10:44.000Z",
      "xQuery": "「テレビ離れ」全世代で加速 なぜ"
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
