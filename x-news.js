window.LUS_X_NEWS = {
  "updatedAt": "2026-10-05T00:57:34.552Z",
  "items": [
    {
      "time": "07:55",
      "title": "DV被害者らの情報漏洩 5年で68件",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597568?source=rss",
      "publishedAt": "2026-10-04T22:55:43.000Z",
      "xQuery": "DV被害者らの情報漏洩 5年で68件"
    },
    {
      "time": "07:43",
      "title": "AI自動運航船 自衛隊に導入へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597567?source=rss",
      "publishedAt": "2026-10-04T22:43:34.000Z",
      "xQuery": "AI自動運航船 自衛隊に導入へ"
    },
    {
      "time": "09:34",
      "title": "マスク氏「スペースXSI」に改称へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597576?source=rss",
      "publishedAt": "2026-10-05T00:34:16.000Z",
      "xQuery": "マスク氏「スペースXSI」に改称へ"
    },
    {
      "time": "09:46",
      "title": "ネイリスト殺害 大晦日の「悲劇」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597577?source=rss",
      "publishedAt": "2026-10-05T00:46:10.000Z",
      "xQuery": "ネイリスト殺害 大晦日の「悲劇」"
    },
    {
      "time": "08:19",
      "title": "那覇強殺 女性の首にひも状の痕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597570?source=rss",
      "publishedAt": "2026-10-04T23:19:52.000Z",
      "xQuery": "那覇強殺 女性の首にひも状の痕"
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
