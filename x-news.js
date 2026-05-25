window.LUS_X_NEWS = {
  "updatedAt": "2026-05-25T02:26:13.212Z",
  "items": [
    {
      "time": "09:46",
      "title": "日経平均6万5000円台 史上最高値",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581567?source=rss",
      "publishedAt": "2026-05-25T00:46:36.000Z",
      "xQuery": "日経平均6万5000円台 史上最高値"
    },
    {
      "time": "09:07",
      "title": "イラン合意急ぐな トランプ氏指示",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581563?source=rss",
      "publishedAt": "2026-05-25T00:07:01.000Z",
      "xQuery": "イラン合意急ぐな トランプ氏指示"
    },
    {
      "time": "10:30",
      "title": "ホルムズ通過「出光丸」伊勢湾に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581570?source=rss",
      "publishedAt": "2026-05-25T01:30:29.000Z",
      "xQuery": "ホルムズ通過「出光丸」伊勢湾に"
    },
    {
      "time": "10:47",
      "title": "7&i元会長 鈴木敏文さんが死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581571?source=rss",
      "publishedAt": "2026-05-25T01:47:44.000Z",
      "xQuery": "7&i元会長 鈴木敏文さんが死去"
    },
    {
      "time": "11:23",
      "title": "旭川17歳殺害 内田被告が殺意否認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581574?source=rss",
      "publishedAt": "2026-05-25T02:23:23.000Z",
      "xQuery": "旭川17歳殺害 内田被告が殺意否認"
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
