window.LUS_X_NEWS = {
  "updatedAt": "2026-09-28T23:16:57.342Z",
  "items": [
    {
      "time": "07:47",
      "title": "台風26号接近へ 関東への影響注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596912?source=rss",
      "publishedAt": "2026-09-28T22:47:10.000Z",
      "xQuery": "台風26号接近へ 関東への影響注意"
    },
    {
      "time": "06:41",
      "title": "マンション修繕談合 コンサル謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596906?source=rss",
      "publishedAt": "2026-09-28T21:41:02.000Z",
      "xQuery": "マンション修繕談合 コンサル謝罪"
    },
    {
      "time": "06:16",
      "title": "中国 首相の「台湾発言」是正要求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596903?source=rss",
      "publishedAt": "2026-09-28T21:16:09.000Z",
      "xQuery": "中国 首相の「台湾発言」是正要求"
    },
    {
      "time": "08:01",
      "title": "トラックと衝突し炎上 車に3遺体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596913?source=rss",
      "publishedAt": "2026-09-28T23:01:02.000Z",
      "xQuery": "トラックと衝突し炎上 車に3遺体"
    },
    {
      "time": "07:29",
      "title": "中野でも事件「窃盗ツーリズム」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596910?source=rss",
      "publishedAt": "2026-09-28T22:29:33.000Z",
      "xQuery": "中野でも事件「窃盗ツーリズム」"
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
