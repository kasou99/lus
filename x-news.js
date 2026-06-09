window.LUS_X_NEWS = {
  "updatedAt": "2026-06-09T15:36:10.179Z",
  "items": [
    {
      "time": "20:57",
      "title": "日銀1%に利上げへ 家計への影響",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583597?source=rss",
      "publishedAt": "2026-06-09T11:57:26.000Z",
      "xQuery": "日銀1%に利上げへ 家計への影響"
    },
    {
      "time": "22:50",
      "title": "首相秘書の参考人招致 立憲が要求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583609?source=rss",
      "publishedAt": "2026-06-09T13:50:51.000Z",
      "xQuery": "首相秘書の参考人招致 立憲が要求"
    },
    {
      "time": "21:29",
      "title": "池田小事件で重傷 今は2児の母に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583601?source=rss",
      "publishedAt": "2026-06-09T12:29:20.000Z",
      "xQuery": "池田小事件で重傷 今は2児の母に"
    },
    {
      "time": "23:10",
      "title": "クマ逃げた家の住人 中継見て驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583613?source=rss",
      "publishedAt": "2026-06-09T14:10:43.000Z",
      "xQuery": "クマ逃げた家の住人 中継見て驚き"
    },
    {
      "time": "21:05",
      "title": "NZ首都に11mの高波 数百人が避難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583598?source=rss",
      "publishedAt": "2026-06-09T12:05:56.000Z",
      "xQuery": "NZ首都に11mの高波 数百人が避難"
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
