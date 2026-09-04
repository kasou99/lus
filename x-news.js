window.LUS_X_NEWS = {
  "updatedAt": "2026-09-04T06:30:22.716Z",
  "items": [
    {
      "time": "14:21",
      "title": "北陸大雨を激甚災害指定へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594203?source=rss",
      "publishedAt": "2026-09-04T05:21:46.000Z",
      "xQuery": "北陸大雨を激甚災害指定へ"
    },
    {
      "time": "14:07",
      "title": "米議員が国防長官解任を要求 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594184?source=rss",
      "publishedAt": "2026-09-04T05:07:54.000Z",
      "xQuery": "米議員が国防長官解任を要求 背景"
    },
    {
      "time": "12:26",
      "title": "イオンタウンでガス漏れ 客ら避難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594193?source=rss",
      "publishedAt": "2026-09-04T03:26:34.000Z",
      "xQuery": "イオンタウンでガス漏れ 客ら避難"
    },
    {
      "time": "13:42",
      "title": "ネパール 生存者2人救出と報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594198?source=rss",
      "publishedAt": "2026-09-04T04:42:04.000Z",
      "xQuery": "ネパール 生存者2人救出と報道"
    },
    {
      "time": "12:27",
      "title": "子が過去最少も 子供服なぜ売れる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594194?source=rss",
      "publishedAt": "2026-09-04T03:27:24.000Z",
      "xQuery": "子が過去最少も 子供服なぜ売れる"
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
