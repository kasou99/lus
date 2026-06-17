window.LUS_X_NEWS = {
  "updatedAt": "2026-06-17T13:48:30.567Z",
  "items": [
    {
      "time": "22:28",
      "title": "トランプ氏 イラン次第で攻撃再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584642?source=rss",
      "publishedAt": "2026-06-17T13:28:57.000Z",
      "xQuery": "トランプ氏 イラン次第で攻撃再開"
    },
    {
      "time": "20:46",
      "title": "知床沈没で親友死亡 判決に憤り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584632?source=rss",
      "publishedAt": "2026-06-17T11:46:05.000Z",
      "xQuery": "知床沈没で親友死亡 判決に憤り"
    },
    {
      "time": "21:53",
      "title": "条例で民泊「実質禁止」 容認へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584640?source=rss",
      "publishedAt": "2026-06-17T12:53:40.000Z",
      "xQuery": "条例で民泊「実質禁止」 容認へ"
    },
    {
      "time": "21:43",
      "title": "プール小4死亡 元校長に有罪判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584638?source=rss",
      "publishedAt": "2026-06-17T12:43:11.000Z",
      "xQuery": "プール小4死亡 元校長に有罪判決"
    },
    {
      "time": "20:34",
      "title": "スマホで子の生活乱れ 入院で治療",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584630?source=rss",
      "publishedAt": "2026-06-17T11:34:13.000Z",
      "xQuery": "スマホで子の生活乱れ 入院で治療"
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
