window.LUS_X_NEWS = {
  "updatedAt": "2026-06-03T17:49:45.935Z",
  "items": [
    {
      "time": "23:24",
      "title": "各地被害の台風6号 温帯低気圧に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582850?source=rss",
      "publishedAt": "2026-06-03T14:24:13.000Z",
      "xQuery": "各地被害の台風6号 温帯低気圧に"
    },
    {
      "time": "23:07",
      "title": "マスコミなぜ避ける 問われた首相",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582848?source=rss",
      "publishedAt": "2026-06-03T14:07:58.000Z",
      "xQuery": "マスコミなぜ避ける 問われた首相"
    },
    {
      "time": "18:02",
      "title": "内田梨瑚被告 母の証言に涙ぬぐう",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582811?source=rss",
      "publishedAt": "2026-06-03T09:02:30.000Z",
      "xQuery": "内田梨瑚被告 母の証言に涙ぬぐう"
    },
    {
      "time": "00:09",
      "title": "トクリュウか 公開手配の28歳逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582856?source=rss",
      "publishedAt": "2026-06-03T15:09:44.000Z",
      "xQuery": "トクリュウか 公開手配の28歳逮捕"
    },
    {
      "time": "22:08",
      "title": "京都で米国籍20歳男性が行方不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582843?source=rss",
      "publishedAt": "2026-06-03T13:08:32.000Z",
      "xQuery": "京都で米国籍20歳男性が行方不明"
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
