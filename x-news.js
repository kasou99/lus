window.LUS_X_NEWS = {
  "updatedAt": "2026-06-20T05:38:42.179Z",
  "items": [
    {
      "time": "12:46",
      "title": "トランプ氏 年内に中国再訪へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584936?source=rss",
      "publishedAt": "2026-06-20T03:46:21.000Z",
      "xQuery": "トランプ氏 年内に中国再訪へ"
    },
    {
      "time": "12:10",
      "title": "防衛省が異例投稿 攻めの発信に舵",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584934?source=rss",
      "publishedAt": "2026-06-20T03:10:51.000Z",
      "xQuery": "防衛省が異例投稿 攻めの発信に舵"
    },
    {
      "time": "13:08",
      "title": "点検作業中に機械に挟まれる 重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584941?source=rss",
      "publishedAt": "2026-06-20T04:08:59.000Z",
      "xQuery": "点検作業中に機械に挟まれる 重体"
    },
    {
      "time": "13:29",
      "title": "小学校火災 教員の迅速判断で避難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584942?source=rss",
      "publishedAt": "2026-06-20T04:29:11.000Z",
      "xQuery": "小学校火災 教員の迅速判断で避難"
    },
    {
      "time": "12:52",
      "title": "夫に精子提供頼みシンママに 葛藤",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584940?source=rss",
      "publishedAt": "2026-06-20T03:52:34.000Z",
      "xQuery": "夫に精子提供頼みシンママに 葛藤"
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
