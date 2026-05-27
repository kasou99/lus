window.LUS_X_NEWS = {
  "updatedAt": "2026-05-27T09:21:41.362Z",
  "items": [
    {
      "time": "17:00",
      "title": "大手賃上げ1万9964円 過去最高に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581909?source=rss",
      "publishedAt": "2026-05-27T08:00:02.000Z",
      "xQuery": "大手賃上げ1万9964円 過去最高に"
    },
    {
      "time": "15:52",
      "title": "久留米大医療センター 完全閉鎖へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581899?source=rss",
      "publishedAt": "2026-05-27T06:52:27.000Z",
      "xQuery": "久留米大医療センター 完全閉鎖へ"
    },
    {
      "time": "17:59",
      "title": "母娘殺害 容疑者の新たな画像公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581922?source=rss",
      "publishedAt": "2026-05-27T08:59:57.000Z",
      "xQuery": "母娘殺害 容疑者の新たな画像公開"
    },
    {
      "time": "17:53",
      "title": "フェルメール展 チケは日時指定制",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581921?source=rss",
      "publishedAt": "2026-05-27T08:53:28.000Z",
      "xQuery": "フェルメール展 チケは日時指定制"
    },
    {
      "time": "15:38",
      "title": "クマ対策アプリ ベアーズ伸び悩み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581898?source=rss",
      "publishedAt": "2026-05-27T06:38:09.000Z",
      "xQuery": "クマ対策アプリ ベアーズ伸び悩み"
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
