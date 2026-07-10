window.LUS_X_NEWS = {
  "updatedAt": "2026-07-10T12:02:56.378Z",
  "items": [
    {
      "time": "20:24",
      "title": "西・東日本 週末に猛暑日が続出か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587465?source=rss",
      "publishedAt": "2026-07-10T11:24:54.000Z",
      "xQuery": "西・東日本 週末に猛暑日が続出か"
    },
    {
      "time": "20:13",
      "title": "悠仁さま 公的行事で8月広島訪問",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587461?source=rss",
      "publishedAt": "2026-07-10T11:13:23.000Z",
      "xQuery": "悠仁さま 公的行事で8月広島訪問"
    },
    {
      "time": "18:29",
      "title": "女性2人殺害 男に無期懲役の判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587451?source=rss",
      "publishedAt": "2026-07-10T09:29:54.000Z",
      "xQuery": "女性2人殺害 男に無期懲役の判決"
    },
    {
      "time": "20:53",
      "title": "全東信が破産 飲食店の混乱拡大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587467?source=rss",
      "publishedAt": "2026-07-10T11:53:14.000Z",
      "xQuery": "全東信が破産 飲食店の混乱拡大"
    },
    {
      "time": "18:40",
      "title": "サンマ1匹21万6000円 客は驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587455?source=rss",
      "publishedAt": "2026-07-10T09:40:38.000Z",
      "xQuery": "サンマ1匹21万6000円 客は驚き"
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
