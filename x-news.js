window.LUS_X_NEWS = {
  "updatedAt": "2026-06-11T22:41:40.696Z",
  "items": [
    {
      "time": "06:24",
      "title": "米 イラン協議受け攻撃中止と表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583899?source=rss",
      "publishedAt": "2026-06-11T21:24:04.000Z",
      "xQuery": "米 イラン協議受け攻撃中止と表明"
    },
    {
      "time": "06:53",
      "title": "マンション修繕談合 排除命令へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583902?source=rss",
      "publishedAt": "2026-06-11T21:53:11.000Z",
      "xQuery": "マンション修繕談合 排除命令へ"
    },
    {
      "time": "06:32",
      "title": "17歳殺害疑い 復縁断られたと供述",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583900?source=rss",
      "publishedAt": "2026-06-11T21:32:20.000Z",
      "xQuery": "17歳殺害疑い 復縁断られたと供述"
    },
    {
      "time": "23:21",
      "title": "神戸市で初めて「クマ」出没確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583891?source=rss",
      "publishedAt": "2026-06-11T14:21:55.000Z",
      "xQuery": "神戸市で初めて「クマ」出没確認"
    },
    {
      "time": "22:27",
      "title": "工藤会トップに勝訴 賠償払われず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583884?source=rss",
      "publishedAt": "2026-06-11T13:27:19.000Z",
      "xQuery": "工藤会トップに勝訴 賠償払われず"
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
