window.LUS_X_NEWS = {
  "updatedAt": "2026-10-16T13:41:55.586Z",
  "items": [
    {
      "time": "20:50",
      "title": "自公再連立巡り 斉藤元代表が含み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599028?source=rss",
      "publishedAt": "2026-10-16T11:50:10.000Z",
      "xQuery": "自公再連立巡り 斉藤元代表が含み"
    },
    {
      "time": "18:27",
      "title": "生活文化分野で人間国宝 初認定へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599014?source=rss",
      "publishedAt": "2026-10-16T09:27:31.000Z",
      "xQuery": "生活文化分野で人間国宝 初認定へ"
    },
    {
      "time": "22:20",
      "title": "ニデック 永守氏らへの訴訟を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599040?source=rss",
      "publishedAt": "2026-10-16T13:20:06.000Z",
      "xQuery": "ニデック 永守氏らへの訴訟を検討"
    },
    {
      "time": "21:27",
      "title": "ガスト・サイゼ・ロイホ 戦略比較",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599029?source=rss",
      "publishedAt": "2026-10-16T12:27:10.000Z",
      "xQuery": "ガスト・サイゼ・ロイホ 戦略比較"
    },
    {
      "time": "22:04",
      "title": "ショップサーブの流出 2335万人分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599039?source=rss",
      "publishedAt": "2026-10-16T13:04:45.000Z",
      "xQuery": "ショップサーブの流出 2335万人分"
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
