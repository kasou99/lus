window.LUS_X_NEWS = {
  "updatedAt": "2026-07-04T21:50:28.237Z",
  "items": [
    {
      "time": "22:28",
      "title": "米建国250年 プーチン氏が祝電",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586743?source=rss",
      "publishedAt": "2026-07-04T13:28:01.000Z",
      "xQuery": "米建国250年 プーチン氏が祝電"
    },
    {
      "time": "23:35",
      "title": "九州北部 週明けにかけ大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586751?source=rss",
      "publishedAt": "2026-07-04T14:35:17.000Z",
      "xQuery": "九州北部 週明けにかけ大雨の恐れ"
    },
    {
      "time": "17:37",
      "title": "ハメネイ師の国葬 2000万人参列か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586716?source=rss",
      "publishedAt": "2026-07-04T08:37:42.000Z",
      "xQuery": "ハメネイ師の国葬 2000万人参列か"
    },
    {
      "time": "22:01",
      "title": "個人から7.5億円寄付 プール改修",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586740?source=rss",
      "publishedAt": "2026-07-04T13:01:10.000Z",
      "xQuery": "個人から7.5億円寄付 プール改修"
    },
    {
      "time": "23:08",
      "title": "難病で鼻と唇が変形 いじめ言えず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586747?source=rss",
      "publishedAt": "2026-07-04T14:08:31.000Z",
      "xQuery": "難病で鼻と唇が変形 いじめ言えず"
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
