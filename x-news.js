window.LUS_X_NEWS = {
  "updatedAt": "2026-08-08T00:26:54.442Z",
  "items": [
    {
      "time": "08:49",
      "title": "避難生活続く 被災地の緊急課題は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590935?source=rss",
      "publishedAt": "2026-08-07T23:49:06.000Z",
      "xQuery": "避難生活続く 被災地の緊急課題は"
    },
    {
      "time": "08:05",
      "title": "外国人受け入れ反対増加 東大調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590929?source=rss",
      "publishedAt": "2026-08-07T23:05:27.000Z",
      "xQuery": "外国人受け入れ反対増加 東大調査"
    },
    {
      "time": "08:39",
      "title": "53歳男性が死亡 ひき逃げの疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590934?source=rss",
      "publishedAt": "2026-08-07T23:39:21.000Z",
      "xQuery": "53歳男性が死亡 ひき逃げの疑い"
    },
    {
      "time": "07:26",
      "title": "イオンの従業員誘導 規定に抵触か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590922?source=rss",
      "publishedAt": "2026-08-07T22:26:44.000Z",
      "xQuery": "イオンの従業員誘導 規定に抵触か"
    },
    {
      "time": "07:47",
      "title": "「サ終」続くスマホゲーム 倒産増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590925?source=rss",
      "publishedAt": "2026-08-07T22:47:08.000Z",
      "xQuery": "「サ終」続くスマホゲーム 倒産増"
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
