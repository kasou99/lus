window.LUS_X_NEWS = {
  "updatedAt": "2026-06-13T20:36:03.971Z",
  "items": [
    {
      "time": "22:09",
      "title": "米イラン 戦闘終結へ合意間近か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584127?source=rss",
      "publishedAt": "2026-06-13T13:09:21.000Z",
      "xQuery": "米イラン 戦闘終結へ合意間近か"
    },
    {
      "time": "22:16",
      "title": "AI企業幹部 G7サミットに集結へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584128?source=rss",
      "publishedAt": "2026-06-13T13:16:21.000Z",
      "xQuery": "AI企業幹部 G7サミットに集結へ"
    },
    {
      "time": "23:25",
      "title": "川遊びで流され死亡 男子中学生か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584140?source=rss",
      "publishedAt": "2026-06-13T14:25:09.000Z",
      "xQuery": "川遊びで流され死亡 男子中学生か"
    },
    {
      "time": "22:48",
      "title": "ヒノキの下敷きか 伐採作業中死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584135?source=rss",
      "publishedAt": "2026-06-13T13:48:46.000Z",
      "xQuery": "ヒノキの下敷きか 伐採作業中死亡"
    },
    {
      "time": "20:29",
      "title": "DAZNが謝罪「月980円」表示巡り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584119?source=rss",
      "publishedAt": "2026-06-13T11:29:40.000Z",
      "xQuery": "DAZNが謝罪「月980円」表示巡り"
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
