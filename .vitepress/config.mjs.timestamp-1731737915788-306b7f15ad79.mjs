// .vitepress/config.mjs
import { defineConfig } from "file:///E:/code/blog/vitepress-liu/node_modules/.pnpm/vitepress@1.4.0_@algolia+client-search@5.8.0_@types+node@22.7.5_markdown-it-mathjax3@4.3.2_po_bardl3e3lcu4wj2bix6qf73dqy/node_modules/vitepress/dist/node/index.js";

// .vitepress/theme/utils/generateRSS.mjs
import { createContentLoader } from "file:///E:/code/blog/vitepress-liu/node_modules/.pnpm/vitepress@1.4.0_@algolia+client-search@5.8.0_@types+node@22.7.5_markdown-it-mathjax3@4.3.2_po_bardl3e3lcu4wj2bix6qf73dqy/node_modules/vitepress/dist/node/index.js";
import { writeFileSync } from "fs";
import { Feed } from "file:///E:/code/blog/vitepress-liu/node_modules/.pnpm/feed@4.2.2/node_modules/feed/lib/feed.js";
import path from "path";
var createRssFile = async (config, themeConfig3) => {
  const siteMeta = themeConfig3.siteMeta;
  const hostLink = siteMeta.site;
  const feed = new Feed({
    title: siteMeta.title,
    description: siteMeta.description,
    id: hostLink,
    link: hostLink,
    language: "zh",
    generator: siteMeta.author.name,
    favicon: siteMeta.author.cover,
    copyright: `Copyright \xA9 2020-present ${siteMeta.author.name}`,
    updated: /* @__PURE__ */ new Date(),
  });
  let posts = await createContentLoader("posts/**/*.md", {
    render: true,
  }).load();
  posts = posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB - dateA;
  });
  for (const { url, frontmatter } of posts) {
    if (feed.items.length >= 10) break;
    let { title, description, date } = frontmatter;
    if (typeof date === "string") date = new Date(date);
    feed.addItem({
      title,
      id: `${hostLink}${url}`,
      link: `${hostLink}${url}`,
      description,
      date,
      // updated,
      author: [
        {
          name: siteMeta.author.name,
          email: siteMeta.author.email,
          link: siteMeta.author.link,
        },
      ],
    });
  }
  writeFileSync(path.join(config.outDir, "rss.xml"), feed.rss2(), "utf-8");
};

// .vitepress/config.mjs
import { withPwa } from "file:///E:/code/blog/vitepress-liu/node_modules/.pnpm/@vite-pwa+vitepress@0.4.0_vite-plugin-pwa@0.19.8_vite@5.4.8_@types+node@22.7.5_sass@1.79.4_te_4texzszdeifsnxu4vy5pq26ile/node_modules/@vite-pwa/vitepress/dist/index.mjs";

// .vitepress/theme/utils/commonTools.mjs
import { load } from "file:///E:/code/blog/vitepress-liu/node_modules/.pnpm/cheerio@1.0.0-rc.12/node_modules/cheerio/lib/esm/index.js";
var generateId = (fileName) => {
  let hash = 0;
  for (let i = 0; i < fileName.length; i++) {
    hash = (hash << 5) - hash + fileName.charCodeAt(i);
  }
  const numericId = Math.abs(hash % 1e10);
  return numericId;
};
var jumpRedirect = (html, themeConfig3, isDom = false) => {
  try {
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) return false;
    if (!themeConfig3.jumpRedirect.enable) return html;
    const redirectPage = "/redirect";
    const excludeClass = themeConfig3.jumpRedirect.exclude;
    if (isDom) {
      if (typeof window === "undefined" || typeof document === "undefined") return false;
      const allLinks = [...document.getElementsByTagName("a")];
      if (allLinks?.length === 0) return false;
      allLinks.forEach((link) => {
        if (link.getAttribute("target") === "_blank") {
          if (excludeClass.some((className) => link.classList.contains(className))) {
            return false;
          }
          const linkHref = link.getAttribute("href");
          if (linkHref && !linkHref.includes(redirectPage)) {
            const encodedHref = btoa(linkHref);
            const redirectLink = `${redirectPage}?url=${encodedHref}`;
            link.setAttribute("original-href", linkHref);
            link.setAttribute("href", redirectLink);
          }
        }
      });
    } else {
      const $ = load(html);
      $("a[target='_blank']").each((_, el) => {
        const $a = $(el);
        const href = $a.attr("href");
        const classesStr = $a.attr("class");
        const innerText = $a.text();
        const classes = classesStr ? classesStr.trim().split(" ") : [];
        if (excludeClass.some((className) => classes.includes(className))) {
          return;
        }
        if (href && !href.includes(redirectPage)) {
          const encodedHref = Buffer.from(href, "utf-8").toString("base64");
          const attributes = el.attribs;
          let attributesStr = "";
          for (let attr in attributes) {
            if (Object.prototype.hasOwnProperty.call(attributes, attr)) {
              attributesStr += ` ${attr}="${attributes[attr]}"`;
            }
          }
          const newLink = `<a href="${redirectPage}?url=${encodedHref}" original-href="${href}" ${attributesStr}>${innerText}</a>`;
          $a.replaceWith(newLink);
        }
      });
      return $.html();
    }
  } catch (error) {
    console.error("\u5904\u7406\u94FE\u63A5\u65F6\u51FA\u9519\uFF1A", error);
  }
};

// .vitepress/theme/utils/getPostData.mjs
import { globby } from "file:///E:/code/blog/vitepress-liu/node_modules/.pnpm/globby@14.0.2/node_modules/globby/index.js";
import matter from "file:///E:/code/blog/vitepress-liu/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js";
import fs from "file:///E:/code/blog/vitepress-liu/node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/index.js";
var getPostMDFilePaths = async () => {
  try {
    let paths = await globby(["**.md"], {
      ignore: ["node_modules", "pages", ".vitepress", "README.md"],
    });
    return paths.filter((item) => item.includes("posts/"));
  } catch (error) {
    console.error("\u83B7\u53D6\u6587\u7AE0\u8DEF\u5F84\u65F6\u51FA\u9519:", error);
    throw error;
  }
};
var compareDate = (obj1, obj2) => {
  return obj1.date < obj2.date ? 1 : -1;
};
var comparePostPriority = (a, b) => {
  if (a.top && !b.top) {
    return -1;
  }
  if (!a.top && b.top) {
    return 1;
  }
  return compareDate(a, b);
};
var getAllPosts = async () => {
  try {
    let paths = await getPostMDFilePaths();
    let posts = await Promise.all(
      paths.map(async (item) => {
        try {
          const content = await fs.readFile(item, "utf-8");
          const stat = await fs.stat(item);
          const { birthtimeMs, mtimeMs } = stat;
          const { data } = matter(content);
          const { title, date, categories, description, tags, top, cover } = data;
          const expired = Math.floor(
            /* @__PURE__ */ (new Date().getTime() - new Date(date).getTime()) /
              (1e3 * 60 * 60 * 24),
          );
          return {
            id: generateId(item),
            title: title || "\u672A\u547D\u540D\u6587\u7AE0",
            date: date ? new Date(date).getTime() : birthtimeMs,
            lastModified: mtimeMs,
            expired,
            tags,
            categories,
            description,
            regularPath: `/${item.replace(".md", ".html")}`,
            top,
            cover,
          };
        } catch (error) {
          console.error(
            `\u5904\u7406\u6587\u7AE0\u6587\u4EF6 '${item}' \u65F6\u51FA\u9519:`,
            error,
          );
          throw error;
        }
      }),
    );
    posts.sort(comparePostPriority);
    return posts;
  } catch (error) {
    console.error("\u83B7\u53D6\u6240\u6709\u6587\u7AE0\u65F6\u51FA\u9519:", error);
    throw error;
  }
};
var getAllType = (postData2) => {
  const tagData = {};
  postData2.map((item) => {
    if (!item.tags || item.tags.length === 0) return;
    if (typeof item.tags === "string") {
      item.tags = item.tags.split(",");
    }
    item.tags.forEach((tag) => {
      if (!tagData[tag]) {
        tagData[tag] = {
          count: 1,
          articles: [item],
        };
      } else {
        tagData[tag].count++;
        tagData[tag].articles.push(item);
      }
    });
  });
  return tagData;
};
var getAllCategories = (postData2) => {
  const catData = {};
  postData2.map((item) => {
    if (!item.categories || item.categories.length === 0) return;
    if (typeof item.categories === "string") {
      item.categories = item.categories.split(",");
    }
    item.categories.forEach((tag) => {
      if (!catData[tag]) {
        catData[tag] = {
          count: 1,
          articles: [item],
        };
      } else {
        catData[tag].count++;
        catData[tag].articles.push(item);
      }
    });
  });
  return catData;
};
var getAllArchives = (postData2) => {
  const archiveData = {};
  postData2.forEach((item) => {
    if (item.date) {
      const date = new Date(item.date);
      const year = date.getFullYear().toString();
      if (!archiveData[year]) {
        archiveData[year] = {
          count: 1,
          articles: [item],
        };
      } else {
        archiveData[year].count++;
        archiveData[year].articles.push(item);
      }
    }
  });
  const sortedYears = Object.keys(archiveData).sort((a, b) => parseInt(b) - parseInt(a));
  return { data: archiveData, year: sortedYears };
};

// .vitepress/theme/assets/themeConfig.mjs
var themeConfig = {
  // 站点信息
  siteMeta: {
    // 站点标题
    title: "Liu's LifeArc",
    // 站点描述
    description: "Hello World",
    // 站点logo
    logo: "/images/logo/logo.webp",
    // 站点地址
    site: "https://blog.imsyy.top",
    // 语言
    lang: "zh-CN",
    // 作者
    author: {
      name: "liu",
      cover: "/images/logo/logo.webp",
      email: "liujunxiang0076@foxmail.com",
      link: "",
    },
  },
  // 备案信息
  // icp: "123",
  // 建站日期
  since: "2022-07-28",
  // 每页文章数据
  postSize: 8,
  // inject
  inject: {
    // 头部
    // https://vitepress.dev/zh/reference/site-config#head
    header: [
      // favicon
      ["link", { rel: "icon", href: "/favicon.ico" }],
      // RSS
      // [
      //   "link",
      //   {
      //     rel: "alternate",
      //     type: "application/rss+xml",
      //     title: "RSS",
      //     href: "https://blog.imsyy.top/rss.xml",
      //   },
      // ],
      // 预载 CDN
      [
        "link",
        {
          crossorigin: "",
          rel: "preconnect",
          href: "https://s1.hdslb.com",
        },
      ],
      [
        "link",
        {
          crossorigin: "",
          rel: "preconnect",
          href: "https://mirrors.sustech.edu.cn",
        },
      ],
      // HarmonyOS font
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "https://s1.hdslb.com/bfs/static/jinkela/long/font/regular.css",
        },
      ],
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/lxgw-wenkai-screen-webfont/1.7.0/style.css",
        },
      ],
      // iconfont
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "https://cdn2.codesign.qq.com/icons/g5ZpEgx3z4VO6j2/latest/iconfont.css",
        },
      ],
      // Embed code
      ["link", { rel: "preconnect", href: "https://use.sevencdn.com" }],
      ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
      [
        "link",
        {
          crossorigin: "anonymous",
          href: "https://use.sevencdn.com/css2?family=Fira+Code:wght@300..700&display=swap",
          rel: "stylesheet",
        },
      ],
      // 预载 DocSearch
      [
        "link",
        {
          href: "https://X5EBEZB53I-dsn.algolia.net",
          rel: "preconnect",
          crossorigin: "",
        },
      ],
    ],
  },
  // 导航栏菜单
  nav: [
    {
      text: "\u6587\u5E93",
      items: [
        { text: "\u6587\u7AE0\u5217\u8868", link: "/pages/archives", icon: "article" },
        { text: "\u5168\u90E8\u5206\u7C7B", link: "/pages/categories", icon: "folder" },
        { text: "\u5168\u90E8\u6807\u7B7E", link: "/pages/tags", icon: "hashtag" },
      ],
    },
    {
      text: "\u4E13\u680F",
      items: [
        {
          text: "\u6280\u672F\u5206\u4EAB",
          link: "/pages/categories/\u6280\u672F\u5206\u4EAB",
          icon: "technical",
        },
        { text: "\u6211\u7684\u9879\u76EE", link: "/pages/project", icon: "code" },
        { text: "\u6548\u7387\u5DE5\u5177", link: "/pages/tools", icon: "tools" },
      ],
    },
    {
      text: "\u53CB\u94FE",
      items: [
        { text: "\u53CB\u94FE\u9C7C\u5858", link: "/pages/friends", icon: "fish" },
        { text: "\u53CB\u60C5\u94FE\u63A5", link: "/pages/link", icon: "people" },
      ],
    },
    {
      text: "\u6211\u7684",
      items: [
        { text: "\u7545\u6240\u6B32\u8A00", link: "/pages/message", icon: "chat" },
        { text: "\u81F4\u8C22\u540D\u5355", link: "/pages/thanks", icon: "reward" },
        { text: "\u5173\u4E8E\u672C\u7AD9", link: "/pages/about", icon: "contacts" },
      ],
    },
  ],
  // 导航栏菜单 - 左侧
  navMore: [
    {
      name: "\u535A\u5BA2",
      list: [
        {
          icon: "/images/logo/logo.webp",
          name: "\u4E3B\u7AD9",
          url: "/",
        },
        {
          icon: "/images/logo/logo.webp",
          name: "\u535A\u5BA2\u955C\u50CF\u7AD9",
          url: "https://blog-backup.imsyy.top/",
        },
      ],
    },
    // {
    //   name: "服务",
    //   list: [
    //     {
    //       icon: "https://pic.efefee.cn/uploads/2024/04/08/6613465358077.png",
    //       name: "起始页",
    //       url: "https://nav.imsyy.top/",
    //     },
    //     {
    //       icon: "https://pic.efefee.cn/uploads/2024/04/08/661346d418ad7.png",
    //       name: "今日热榜",
    //       url: "https://hot.imsyy.top/",
    //     },
    //     {
    //       icon: "https://pic.efefee.cn/uploads/2024/04/08/66134722586fa.png",
    //       name: "站点监测",
    //       url: "https://status.imsyy.top/",
    //     },
    //   ],
    // },
    // {
    //   name: "项目",
    //   list: [
    //     {
    //       icon: "/images/logo/logo.webp",
    //       name: "Curve",
    //       url: "https://github.com/imsyy/vitepress-theme-curve",
    //     },
    //     {
    //       icon: "https://pic.efefee.cn/uploads/2024/04/07/66124f5fc63c8.png",
    //       name: "SPlayer",
    //       url: "https://github.com/imsyy/SPlayer",
    //     },
    //     {
    //       icon: "https://pic.efefee.cn/uploads/2024/04/08/6613465358077.png",
    //       name: "Snavigation",
    //       url: "https://github.com/imsyy/SPlayer",
    //     },
    //     {
    //       icon: "/images/logo/logo.webp",
    //       name: "Home",
    //       url: "https://github.com/imsyy/home",
    //     },
    //     {
    //       icon: "https://pic.efefee.cn/uploads/2024/04/08/661346d418ad7.png",
    //       name: "DailyHotApi",
    //       url: "https://github.com/imsyy/DailyHotApi",
    //     },
    //     {
    //       icon: "https://pic.efefee.cn/uploads/2024/04/08/66134722586fa.png",
    //       name: "site-status",
    //       url: "https://github.com/imsyy/site-status",
    //     },
    //   ],
    // },
  ],
  // 封面配置
  cover: {
    // 是否开启双栏布局
    twoColumns: false,
    // 是否开启封面显示
    showCover: {
      // 是否开启封面显示 文章不设置cover封面会显示异常，可以设置下方默认封面
      enable: true,
      // 封面布局方式: left | right | both
      coverLayout: "both",
      // 默认封面(随机展示)
      defaultCover: [
        "https://example.com/1.avif",
        "https://example.com/2.avif",
        "https://example.com/3.avif",
      ],
    },
  },
  // 页脚信息
  footer: {
    // 社交链接（请确保为偶数个）
    social: [
      // {
      //   icon: "email",
      //   link: "mailto:one@imsyy.top",
      // },
      // {
      //   icon: "github",
      //   link: "https://www.github.com/imsyy/",
      // },
      // {
      //   icon: "telegram",
      //   link: "https://t.me/bottom_user",
      // },
      // {
      //   icon: "bilibili",
      //   link: "https://space.bilibili.com/98544142",
      // },
      // {
      //   icon: "qq",
      //   link: "https://res.abeim.cn/api/qq/?qq=2592524217",
      // },
      // {
      //   icon: "twitter-x",
      //   link: "https://twitter.com/iimmsyy",
      // },
    ],
    // sitemap
    sitemap: [
      // {
      //   text: "博客",
      //   items: [
      //     { text: "近期文章", link: "/" },
      //     { text: "全部分类", link: "/pages/categories" },
      //     { text: "全部标签", link: "/pages/tags" },
      //     { text: "文章归档", link: "/pages/archives", newTab: true },
      //   ],
      // },
      // {
      //   text: "项目",
      //   items: [
      //     { text: "Home", link: "https://github.com/imsyy/home/", newTab: true },
      //     { text: "SPlayer", link: "https://github.com/imsyy/SPlayer/", newTab: true },
      //     { text: "DailyHotApi", link: "https://github.com/imsyy/DailyHotApi/", newTab: true },
      //     { text: "Snavigation", link: "https://github.com/imsyy/Snavigation/", newTab: true },
      //   ],
      // },
      // {
      //   text: "专栏",
      //   items: [
      //     { text: "技术分享", link: "/pages/categories/technology" },
      //     { text: "我的项目", link: "/pages/project" },
      //     { text: "效率工具", link: "/pages/tools" },
      //   ],
      // },
      // {
      //   text: "页面",
      //   items: [
      //     { text: "畅所欲言", link: "/pages/message" },
      //     { text: "关于本站", link: "/pages/about" },
      //     { text: "隐私政策", link: "/pages/privacy" },
      //     { text: "版权协议", link: "/pages/cc" },
      //   ],
      // },
      // {
      //   text: "服务",
      //   items: [
      //     { text: "站点状态", link: "https://status.imsyy.top/", newTab: true },
      //     { text: "一个导航", link: "https://nav.imsyy.top/", newTab: true },
      //     { text: "站点订阅", link: "https://blog.imsyy.top/rss.xml", newTab: true },
      //     {
      //       text: "反馈投诉",
      //       link: "https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre",
      //       newTab: true,
      //     },
      //   ],
      // },
    ],
  },
  // 评论
  comment: {
    enable: true,
    // 评论系统选择
    // artalk / twikoo
    type: "artalk",
    // artalk
    // https://artalk.js.org/
    artalk: {
      site: "Artalk \u7684\u535A\u5BA2",
      server: "",
    },
    // twikoo
    // https://twikoo.js.org/
    twikoo: {
      // 必填，若不想使用 CDN，可以使用 pnpm add twikoo 安装并引入
      js: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/twikoo/1.6.39/twikoo.all.min.js",
      envId: "",
      // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
      region: "ap-shanghai",
      lang: "zh-CN",
    },
  },
  // 侧边栏
  aside: {
    // 站点简介
    hello: {
      enable: true,
      text: "\u8FD9\u91CC\u6709\u5173\u4E8E<strong>\u5F00\u53D1</strong>\u76F8\u5173\u7684\u95EE\u9898\u548C\u770B\u6CD5\uFF0C\u4E5F\u4F1A\u6709\u4E00\u4E9B<strong>\u5947\u6280\u6DEB\u5DE7</strong>\u7684\u5206\u4EAB\uFF0C\u5176\u4E2D\u5927\u90E8\u5206\u5185\u5BB9\u4F1A\u4FA7\u91CD\u4E8E<strong>\u524D\u7AEF\u5F00\u53D1</strong>\u3002\u5E0C\u671B\u4F60\u53EF\u4EE5\u5728\u8FD9\u91CC\u627E\u5230\u5BF9\u4F60\u6709\u7528\u7684\u77E5\u8BC6\u548C\u6559\u7A0B\u3002",
    },
    // 目录
    toc: {
      enable: true,
    },
    // 标签
    tags: {
      enable: true,
    },
    // 倒计时
    countDown: {
      enable: true,
      // 倒计时日期
      data: {
        name: "\u6625\u8282",
        date: "2025-01-29",
      },
    },
    // 站点数据
    siteData: {
      enable: true,
    },
  },
  // 友链
  friends: {
    // 友链朋友圈
    circleOfFriends: "",
    // 动态友链
    dynamicLink: {
      server: "",
      app_token: "",
      table_id: "",
    },
  },
  // 音乐播放器
  // https://github.com/imsyy/Meting-API
  music: {
    enable: false,
    // url
    url: "https://api-meting.example.com",
    // id
    id: 9379831714,
    // netease / tencent / kugou
    server: "netease",
    // playlist / album / song
    type: "playlist",
  },
  // 搜索
  // https://www.algolia.com/
  search: {
    enable: false,
    appId: "",
    apiKey: "",
  },
  // 打赏
  rewardData: {
    enable: true,
    // 微信二维码
    // wechat: "https://pic.efefee.cn/uploads/2024/04/07/66121049d1e80.webp",
    // 支付宝二维码
    // alipay: "https://pic.efefee.cn/uploads/2024/04/07/661206631d3b5.webp",
  },
  // 图片灯箱
  fancybox: {
    enable: true,
    js: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.umd.min.js",
    css: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.min.css",
  },
  // 外链中转
  jumpRedirect: {
    enable: true,
    // 排除类名
    exclude: [
      "cf-friends-link",
      "upyun",
      "icp",
      "author",
      "rss",
      "cc",
      "power",
      "social-link",
      "link-text",
      "travellings",
      "post-link",
      "report",
      "more-link",
      "skills-item",
      "right-menu-link",
      "link-card",
    ],
  },
  // 站点统计
  tongji: {
    "51la": "",
  },
};

// .vitepress/init.mjs
import { existsSync } from "fs";
import path2 from "path";
var __vite_injected_original_dirname = "E:\\code\\blog\\vitepress-liu\\.vitepress";
var getThemeConfig = async () => {
  try {
    const configPath = path2.resolve(__vite_injected_original_dirname, "../themeConfig.mjs");
    if (existsSync(configPath)) {
      const userConfig = await import("../themeConfig.mjs");
      return Object.assign(themeConfig, userConfig?.themeConfig || {});
    } else {
      console.warn("User configuration file not found, using default themeConfig.");
      return themeConfig;
    }
  } catch (error) {
    console.error("An error occurred while loading the configuration:", error);
    return themeConfig;
  }
};

// .vitepress/theme/utils/markdownConfig.mjs
import { tabsMarkdownPlugin } from "file:///E:/code/blog/vitepress-liu/node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.4.0_@algolia+client-search@5.8.0_@types+node@22.7.5_m_mgntr6j2azrjb2mnoamjsn5sfy/node_modules/vitepress-plugin-tabs/dist/index.js";
import markdownItAttrs from "file:///E:/code/blog/vitepress-liu/node_modules/.pnpm/markdown-it-attrs@4.2.0_markdown-it@14.1.0/node_modules/markdown-it-attrs/index.js";
import container from "file:///E:/code/blog/vitepress-liu/node_modules/.pnpm/markdown-it-container@4.0.0/node_modules/markdown-it-container/index.mjs";
var markdownConfig = (md, themeConfig3) => {
  md.use(markdownItAttrs);
  md.use(tabsMarkdownPlugin);
  md.use(container, "timeline", {
    validate: (params) => params.trim().match(/^timeline\s+(.*)$/),
    render: (tokens, idx) => {
      const m = tokens[idx].info.trim().match(/^timeline\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        return `<div class="timeline">
                    <span class="timeline-title">${md.utils.escapeHtml(m[1])}</span>
                    <div class="timeline-content">`;
      } else {
        return "</div></div>\n";
      }
    },
  });
  md.use(container, "radio", {
    render: (tokens, idx, _options, env) => {
      const token = tokens[idx];
      const check = token.info.trim().slice("radio".length).trim();
      if (token.nesting === 1) {
        const isChecked = md.renderInline(check, {
          references: env.references,
        });
        return `<div class="radio">
          <div class="radio-point ${isChecked}" />`;
      } else {
        return "</div>";
      }
    },
  });
  md.use(container, "button", {
    render: (tokens, idx, _options) => {
      const token = tokens[idx];
      const check = token.info.trim().slice("button".length).trim();
      if (token.nesting === 1) {
        return `<button class="button ${check}">`;
      } else {
        return "</button>";
      }
    },
  });
  md.use(container, "card", {
    render: (tokens, idx, _options) => {
      const token = tokens[idx];
      if (token.nesting === 1) {
        return `<div class="card">`;
      } else {
        return "</div>";
      }
    },
  });
  md.renderer.rules.table_open = () => {
    return '<div class="table-container"><table>';
  };
  md.renderer.rules.table_close = () => {
    return "</table></div>";
  };
  md.renderer.rules.image = (tokens, idx) => {
    const token = tokens[idx];
    const src = token.attrs[token.attrIndex("src")][1];
    const alt = token.content;
    if (!themeConfig3.fancybox.enable) {
      return `<img src="${src}" alt="${alt}" loading="lazy">`;
    }
    return `<a class="img-fancybox" href="${src}" data-fancybox="gallery" data-caption="${alt}">
                <img class="post-img" src="${src}" alt="${alt}" loading="lazy" />
                <span class="post-img-tip">${alt}</span>
              </a>`;
  };
};
var markdownConfig_default = markdownConfig;

// .vitepress/config.mjs
import AutoImport from "file:///E:/code/blog/vitepress-liu/node_modules/.pnpm/unplugin-auto-import@0.18.3_@vueuse+core@11.1.0_vue@3.5.11_typescript@4.9.5___rollup@2.79.2_webpack-sources@3.2.3/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/code/blog/vitepress-liu/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.25.7_rollup@2.79.2_vue@3.5.11_typescript@4.9.5__webpack-sources@3.2.3/node_modules/unplugin-vue-components/dist/vite.js";
import path3 from "path";
var __vite_injected_original_dirname2 = "E:\\code\\blog\\vitepress-liu\\.vitepress";
var postData = await getAllPosts();
var themeConfig2 = await getThemeConfig();
var config_default = withPwa(
  defineConfig({
    title: themeConfig2.siteMeta.title,
    description: themeConfig2.siteMeta.description,
    lang: themeConfig2.siteMeta.lang,
    // 简洁的 URL
    cleanUrls: true,
    // 最后更新时间戳
    lastUpdated: true,
    // 主题
    appearance: "light",
    // Head
    head: themeConfig2.inject.header,
    // sitemap
    sitemap: {
      hostname: themeConfig2.siteMeta.site,
    },
    // 主题配置
    themeConfig: {
      ...themeConfig2,
      // 必要数据
      postData,
      tagsData: getAllType(postData),
      categoriesData: getAllCategories(postData),
      archivesData: getAllArchives(postData),
    },
    // markdown
    markdown: {
      math: true,
      lineNumbers: true,
      toc: { level: [1, 2, 3] },
      image: {
        lazyLoading: true,
      },
      config: (md) => markdownConfig_default(md, themeConfig2),
    },
    // 构建排除
    srcExclude: ["**/README.md", "**/TODO.md"],
    // transformHead
    transformPageData: async (pageData) => {
      const canonicalUrl = `${themeConfig2.siteMeta.site}/${pageData.relativePath}`
        .replace(/index\.md$/, "")
        .replace(/\.md$/, "");
      pageData.frontmatter.head ??= [];
      pageData.frontmatter.head.push(["link", { rel: "canonical", href: canonicalUrl }]);
    },
    // transformHtml
    transformHtml: (html) => {
      return jumpRedirect(html, themeConfig2);
    },
    // buildEnd
    buildEnd: async (config) => {
      await createRssFile(config, themeConfig2);
    },
    // vite
    vite: {
      plugins: [
        AutoImport({
          imports: ["vue", "vitepress"],
          dts: ".vitepress/auto-imports.d.ts",
        }),
        Components({
          dirs: [".vitepress/theme/components", ".vitepress/theme/views"],
          extensions: ["vue", "md"],
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
          dts: ".vitepress/components.d.ts",
        }),
      ],
      resolve: {
        // 配置路径别名
        alias: {
          // eslint-disable-next-line no-undef
          "@": path3.resolve(__vite_injected_original_dirname2, "./theme"),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            silenceDeprecations: ["legacy-js-api"],
          },
        },
      },
      // 服务器
      server: {
        port: 9877,
      },
      // 构建
      build: {
        minify: "terser",
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      },
    },
    // PWA
    pwa: {
      registerType: "autoUpdate",
      selfDestroying: true,
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        // 资源缓存
        runtimeCaching: [
          {
            urlPattern: /(.*?)\.(woff2|woff|ttf|css)/,
            handler: "CacheFirst",
            options: {
              cacheName: "file-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(ico|webp|png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
            },
          },
          {
            urlPattern: /^https:\/\/cdn2\.codesign\.qq\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "iconfont-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 2,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        // 缓存文件
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,gif,svg,woff2,ttf}"],
        // 排除路径
        navigateFallbackDenylist: [/^\/sitemap.xml$/, /^\/rss.xml$/, /^\/robots.txt$/],
      },
      manifest: {
        name: themeConfig2.siteMeta.title,
        short_name: themeConfig2.siteMeta.title,
        description: themeConfig2.siteMeta.description,
        display: "standalone",
        start_url: "/",
        theme_color: "#fff",
        background_color: "#efefef",
        icons: [
          {
            src: "/images/logo/favicon-32x32.webp",
            sizes: "32x32",
            type: "image/webp",
          },
          {
            src: "/images/logo/favicon-96x96.webp",
            sizes: "96x96",
            type: "image/webp",
          },
          {
            src: "/images/logo/favicon-256x256.webp",
            sizes: "256x256",
            type: "image/webp",
          },
          {
            src: "/images/logo/favicon-512x512.webp",
            sizes: "512x512",
            type: "image/webp",
          },
        ],
      },
    },
  }),
);
export { config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubWpzIiwgIi52aXRlcHJlc3MvdGhlbWUvdXRpbHMvZ2VuZXJhdGVSU1MubWpzIiwgIi52aXRlcHJlc3MvdGhlbWUvdXRpbHMvY29tbW9uVG9vbHMubWpzIiwgIi52aXRlcHJlc3MvdGhlbWUvdXRpbHMvZ2V0UG9zdERhdGEubWpzIiwgIi52aXRlcHJlc3MvdGhlbWUvYXNzZXRzL3RoZW1lQ29uZmlnLm1qcyIsICIudml0ZXByZXNzL2luaXQubWpzIiwgIi52aXRlcHJlc3MvdGhlbWUvdXRpbHMvbWFya2Rvd25Db25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxibG9nXFxcXHZpdGVwcmVzcy1saXVcXFxcLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxibG9nXFxcXHZpdGVwcmVzcy1saXVcXFxcLnZpdGVwcmVzc1xcXFxjb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL2Jsb2cvdml0ZXByZXNzLWxpdS8udml0ZXByZXNzL2NvbmZpZy5tanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZXByZXNzXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVJzc0ZpbGUgfSBmcm9tIFwiLi90aGVtZS91dGlscy9nZW5lcmF0ZVJTUy5tanNcIjtcclxuaW1wb3J0IHsgd2l0aFB3YSB9IGZyb20gXCJAdml0ZS1wd2Evdml0ZXByZXNzXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0QWxsUG9zdHMsXHJcbiAgZ2V0QWxsVHlwZSxcclxuICBnZXRBbGxDYXRlZ29yaWVzLFxyXG4gIGdldEFsbEFyY2hpdmVzLFxyXG59IGZyb20gXCIuL3RoZW1lL3V0aWxzL2dldFBvc3REYXRhLm1qc1wiO1xyXG5pbXBvcnQgeyBqdW1wUmVkaXJlY3QgfSBmcm9tIFwiLi90aGVtZS91dGlscy9jb21tb25Ub29scy5tanNcIjtcclxuaW1wb3J0IHsgZ2V0VGhlbWVDb25maWcgfSBmcm9tIFwiLi9pbml0Lm1qc1wiO1xyXG5pbXBvcnQgbWFya2Rvd25Db25maWcgZnJvbSBcIi4vdGhlbWUvdXRpbHMvbWFya2Rvd25Db25maWcubWpzXCI7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG4vLyBcdTgzQjdcdTUzRDZcdTUxNjhcdTVDNDBcdTY1NzBcdTYzNkVcclxuY29uc3QgcG9zdERhdGEgPSBhd2FpdCBnZXRBbGxQb3N0cygpO1xyXG5cclxuLy8gXHU4M0I3XHU1M0Q2XHU0RTNCXHU5ODk4XHU5MTREXHU3RjZFXHJcbmNvbnN0IHRoZW1lQ29uZmlnID0gYXdhaXQgZ2V0VGhlbWVDb25maWcoKTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2Uvc2l0ZS1jb25maWdcclxuZXhwb3J0IGRlZmF1bHQgd2l0aFB3YShcclxuICBkZWZpbmVDb25maWcoe1xyXG4gICAgdGl0bGU6IHRoZW1lQ29uZmlnLnNpdGVNZXRhLnRpdGxlLFxyXG4gICAgZGVzY3JpcHRpb246IHRoZW1lQ29uZmlnLnNpdGVNZXRhLmRlc2NyaXB0aW9uLFxyXG4gICAgbGFuZzogdGhlbWVDb25maWcuc2l0ZU1ldGEubGFuZyxcclxuICAgIC8vIFx1N0I4MFx1NkQwMVx1NzY4NCBVUkxcclxuICAgIGNsZWFuVXJsczogdHJ1ZSxcclxuICAgIC8vIFx1NjcwMFx1NTQwRVx1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNFx1NjIzM1xyXG4gICAgbGFzdFVwZGF0ZWQ6IHRydWUsXHJcbiAgICAvLyBcdTRFM0JcdTk4OThcclxuICAgIGFwcGVhcmFuY2U6IFwibGlnaHRcIixcclxuICAgIC8vIEhlYWRcclxuICAgIGhlYWQ6IHRoZW1lQ29uZmlnLmluamVjdC5oZWFkZXIsXHJcbiAgICAvLyBzaXRlbWFwXHJcbiAgICBzaXRlbWFwOiB7XHJcbiAgICAgIGhvc3RuYW1lOiB0aGVtZUNvbmZpZy5zaXRlTWV0YS5zaXRlLFxyXG4gICAgfSxcclxuICAgIC8vIFx1NEUzQlx1OTg5OFx1OTE0RFx1N0Y2RVxyXG4gICAgdGhlbWVDb25maWc6IHtcclxuICAgICAgLi4udGhlbWVDb25maWcsXHJcbiAgICAgIC8vIFx1NUZDNVx1ODk4MVx1NjU3MFx1NjM2RVxyXG4gICAgICBwb3N0RGF0YTogcG9zdERhdGEsXHJcbiAgICAgIHRhZ3NEYXRhOiBnZXRBbGxUeXBlKHBvc3REYXRhKSxcclxuICAgICAgY2F0ZWdvcmllc0RhdGE6IGdldEFsbENhdGVnb3JpZXMocG9zdERhdGEpLFxyXG4gICAgICBhcmNoaXZlc0RhdGE6IGdldEFsbEFyY2hpdmVzKHBvc3REYXRhKSxcclxuICAgIH0sXHJcbiAgICAvLyBtYXJrZG93blxyXG4gICAgbWFya2Rvd246IHtcclxuICAgICAgbWF0aDogdHJ1ZSxcclxuICAgICAgbGluZU51bWJlcnM6IHRydWUsXHJcbiAgICAgIHRvYzogeyBsZXZlbDogWzEsIDIsIDNdIH0sXHJcbiAgICAgIGltYWdlOiB7XHJcbiAgICAgICAgbGF6eUxvYWRpbmc6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbmZpZzogKG1kKSA9PiBtYXJrZG93bkNvbmZpZyhtZCwgdGhlbWVDb25maWcpLFxyXG4gICAgfSxcclxuICAgIC8vIFx1Njc4NFx1NUVGQVx1NjM5Mlx1OTY2NFxyXG4gICAgc3JjRXhjbHVkZTogW1wiKiovUkVBRE1FLm1kXCIsIFwiKiovVE9ETy5tZFwiXSxcclxuICAgIC8vIHRyYW5zZm9ybUhlYWRcclxuICAgIHRyYW5zZm9ybVBhZ2VEYXRhOiBhc3luYyAocGFnZURhdGEpID0+IHtcclxuICAgICAgLy8gY2Fub25pY2FsIFVSTFxyXG4gICAgICBjb25zdCBjYW5vbmljYWxVcmwgPSBgJHt0aGVtZUNvbmZpZy5zaXRlTWV0YS5zaXRlfS8ke3BhZ2VEYXRhLnJlbGF0aXZlUGF0aH1gXHJcbiAgICAgICAgLnJlcGxhY2UoL2luZGV4XFwubWQkLywgXCJcIilcclxuICAgICAgICAucmVwbGFjZSgvXFwubWQkLywgXCJcIik7XHJcbiAgICAgIHBhZ2VEYXRhLmZyb250bWF0dGVyLmhlYWQgPz89IFtdO1xyXG4gICAgICBwYWdlRGF0YS5mcm9udG1hdHRlci5oZWFkLnB1c2goW1wibGlua1wiLCB7IHJlbDogXCJjYW5vbmljYWxcIiwgaHJlZjogY2Fub25pY2FsVXJsIH1dKTtcclxuICAgIH0sXHJcbiAgICAvLyB0cmFuc2Zvcm1IdG1sXHJcbiAgICB0cmFuc2Zvcm1IdG1sOiAoaHRtbCkgPT4ge1xyXG4gICAgICByZXR1cm4ganVtcFJlZGlyZWN0KGh0bWwsIHRoZW1lQ29uZmlnKTtcclxuICAgIH0sXHJcbiAgICAvLyBidWlsZEVuZFxyXG4gICAgYnVpbGRFbmQ6IGFzeW5jIChjb25maWcpID0+IHtcclxuICAgICAgYXdhaXQgY3JlYXRlUnNzRmlsZShjb25maWcsIHRoZW1lQ29uZmlnKTtcclxuICAgIH0sXHJcbiAgICAvLyB2aXRlXHJcbiAgICB2aXRlOiB7XHJcbiAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICAgIGltcG9ydHM6IFtcInZ1ZVwiLCBcInZpdGVwcmVzc1wiXSxcclxuICAgICAgICAgIGR0czogXCIudml0ZXByZXNzL2F1dG8taW1wb3J0cy5kLnRzXCIsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgICBkaXJzOiBbXCIudml0ZXByZXNzL3RoZW1lL2NvbXBvbmVudHNcIiwgXCIudml0ZXByZXNzL3RoZW1lL3ZpZXdzXCJdLFxyXG4gICAgICAgICAgZXh0ZW5zaW9uczogW1widnVlXCIsIFwibWRcIl0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLm1kJC9dLFxyXG4gICAgICAgICAgZHRzOiBcIi52aXRlcHJlc3MvY29tcG9uZW50cy5kLnRzXCIsXHJcbiAgICAgICAgfSksXHJcbiAgICAgIF0sXHJcbiAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAvLyBcdTkxNERcdTdGNkVcdThERUZcdTVGODRcdTUyMkJcdTU0MERcclxuICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXHJcbiAgICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3RoZW1lXCIpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGNzczoge1xyXG4gICAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgICAgc2lsZW5jZURlcHJlY2F0aW9uczogW1wibGVnYWN5LWpzLWFwaVwiXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgLy8gXHU2NzBEXHU1MkExXHU1NjY4XHJcbiAgICAgIHNlcnZlcjoge1xyXG4gICAgICAgIHBvcnQ6IDk4NzcsXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIFx1Njc4NFx1NUVGQVxyXG4gICAgICBidWlsZDoge1xyXG4gICAgICAgIG1pbmlmeTogXCJ0ZXJzZXJcIixcclxuICAgICAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAgICBwdXJlX2Z1bmNzOiBbXCJjb25zb2xlLmxvZ1wiXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvLyBQV0FcclxuICAgIHB3YToge1xyXG4gICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxyXG4gICAgICBzZWxmRGVzdHJveWluZzogdHJ1ZSxcclxuICAgICAgd29ya2JveDoge1xyXG4gICAgICAgIGNsaWVudHNDbGFpbTogdHJ1ZSxcclxuICAgICAgICBza2lwV2FpdGluZzogdHJ1ZSxcclxuICAgICAgICBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXM6IHRydWUsXHJcbiAgICAgICAgLy8gXHU4RDQ0XHU2RTkwXHU3RjEzXHU1QjU4XHJcbiAgICAgICAgcnVudGltZUNhY2hpbmc6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdXJsUGF0dGVybjogLyguKj8pXFwuKHdvZmYyfHdvZmZ8dHRmfGNzcykvLFxyXG4gICAgICAgICAgICBoYW5kbGVyOiBcIkNhY2hlRmlyc3RcIixcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogXCJmaWxlLWNhY2hlXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvKC4qPylcXC4oaWNvfHdlYnB8cG5nfGpwZT9nfHN2Z3xnaWZ8Ym1wfHBzZHx0aWZmfHRnYXxlcHMpLyxcclxuICAgICAgICAgICAgaGFuZGxlcjogXCJDYWNoZUZpcnN0XCIsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICBjYWNoZU5hbWU6IFwiaW1hZ2UtY2FjaGVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9eaHR0cHM6XFwvXFwvY2RuMlxcLmNvZGVzaWduXFwucXFcXC5jb21cXC8uKi9pLFxyXG4gICAgICAgICAgICBoYW5kbGVyOiBcIkNhY2hlRmlyc3RcIixcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogXCJpY29uZm9udC1jYWNoZVwiLFxyXG4gICAgICAgICAgICAgIGV4cGlyYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwLFxyXG4gICAgICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0ICogMixcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhY2hlYWJsZVJlc3BvbnNlOiB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWzAsIDIwMF0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICAvLyBcdTdGMTNcdTVCNThcdTY1ODdcdTRFRjZcclxuICAgICAgICBnbG9iUGF0dGVybnM6IFtcIioqLyoue2pzLGNzcyxodG1sLGljbyxwbmcsanBnLGpwZWcsZ2lmLHN2Zyx3b2ZmMix0dGZ9XCJdLFxyXG4gICAgICAgIC8vIFx1NjM5Mlx1OTY2NFx1OERFRlx1NUY4NFxyXG4gICAgICAgIG5hdmlnYXRlRmFsbGJhY2tEZW55bGlzdDogWy9eXFwvc2l0ZW1hcC54bWwkLywgL15cXC9yc3MueG1sJC8sIC9eXFwvcm9ib3RzLnR4dCQvXSxcclxuICAgICAgfSxcclxuICAgICAgbWFuaWZlc3Q6IHtcclxuICAgICAgICBuYW1lOiB0aGVtZUNvbmZpZy5zaXRlTWV0YS50aXRsZSxcclxuICAgICAgICBzaG9ydF9uYW1lOiB0aGVtZUNvbmZpZy5zaXRlTWV0YS50aXRsZSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogdGhlbWVDb25maWcuc2l0ZU1ldGEuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXHJcbiAgICAgICAgc3RhcnRfdXJsOiBcIi9cIixcclxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjZmZmXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjZWZlZmVmXCIsXHJcbiAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBcIi9pbWFnZXMvbG9nby9mYXZpY29uLTMyeDMyLndlYnBcIixcclxuICAgICAgICAgICAgc2l6ZXM6IFwiMzJ4MzJcIixcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS93ZWJwXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwiL2ltYWdlcy9sb2dvL2Zhdmljb24tOTZ4OTYud2VicFwiLFxyXG4gICAgICAgICAgICBzaXplczogXCI5Nng5NlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3dlYnBcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogXCIvaW1hZ2VzL2xvZ28vZmF2aWNvbi0yNTZ4MjU2LndlYnBcIixcclxuICAgICAgICAgICAgc2l6ZXM6IFwiMjU2eDI1NlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3dlYnBcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogXCIvaW1hZ2VzL2xvZ28vZmF2aWNvbi01MTJ4NTEyLndlYnBcIixcclxuICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3dlYnBcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSksXHJcbik7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxibG9nXFxcXHZpdGVwcmVzcy1saXVcXFxcLnZpdGVwcmVzc1xcXFx0aGVtZVxcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxibG9nXFxcXHZpdGVwcmVzcy1saXVcXFxcLnZpdGVwcmVzc1xcXFx0aGVtZVxcXFx1dGlsc1xcXFxnZW5lcmF0ZVJTUy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvYmxvZy92aXRlcHJlc3MtbGl1Ly52aXRlcHJlc3MvdGhlbWUvdXRpbHMvZ2VuZXJhdGVSU1MubWpzXCI7aW1wb3J0IHsgY3JlYXRlQ29udGVudExvYWRlciB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcclxuaW1wb3J0IHsgd3JpdGVGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgeyBGZWVkIH0gZnJvbSBcImZlZWRcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbi8qKlxyXG4gKiBcdTc1MUZcdTYyMTAgUlNTXHJcbiAqIEBwYXJhbSB7Kn0gY29uZmlnIFZpdGVQcmVzcyBidWlsZEVuZFxyXG4gKiBAcGFyYW0geyp9IHRoZW1lQ29uZmlnIFx1NEUzQlx1OTg5OFx1OTE0RFx1N0Y2RVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVJzc0ZpbGUgPSBhc3luYyAoY29uZmlnLCB0aGVtZUNvbmZpZykgPT4ge1xyXG4gIC8vIFx1OTE0RFx1N0Y2RVx1NEZFMVx1NjA2RlxyXG4gIGNvbnN0IHNpdGVNZXRhID0gdGhlbWVDb25maWcuc2l0ZU1ldGE7XHJcbiAgY29uc3QgaG9zdExpbmsgPSBzaXRlTWV0YS5zaXRlO1xyXG4gIC8vIEZlZWQgXHU1QjlFXHU0RjhCXHJcbiAgY29uc3QgZmVlZCA9IG5ldyBGZWVkKHtcclxuICAgIHRpdGxlOiBzaXRlTWV0YS50aXRsZSxcclxuICAgIGRlc2NyaXB0aW9uOiBzaXRlTWV0YS5kZXNjcmlwdGlvbixcclxuICAgIGlkOiBob3N0TGluayxcclxuICAgIGxpbms6IGhvc3RMaW5rLFxyXG4gICAgbGFuZ3VhZ2U6IFwiemhcIixcclxuICAgIGdlbmVyYXRvcjogc2l0ZU1ldGEuYXV0aG9yLm5hbWUsXHJcbiAgICBmYXZpY29uOiBzaXRlTWV0YS5hdXRob3IuY292ZXIsXHJcbiAgICBjb3B5cmlnaHQ6IGBDb3B5cmlnaHQgXHUwMEE5IDIwMjAtcHJlc2VudCAke3NpdGVNZXRhLmF1dGhvci5uYW1lfWAsXHJcbiAgICB1cGRhdGVkOiBuZXcgRGF0ZSgpLFxyXG4gIH0pO1xyXG4gIC8vIFx1NTJBMFx1OEY3RFx1NjU4N1x1N0FFMFxyXG4gIGxldCBwb3N0cyA9IGF3YWl0IGNyZWF0ZUNvbnRlbnRMb2FkZXIoXCJwb3N0cy8qKi8qLm1kXCIsIHtcclxuICAgIHJlbmRlcjogdHJ1ZSxcclxuICB9KS5sb2FkKCk7XHJcbiAgLy8gXHU2NUU1XHU2NzFGXHU5NjREXHU1RThGXHU2MzkyXHU1RThGXHJcbiAgcG9zdHMgPSBwb3N0cy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICBjb25zdCBkYXRlQSA9IG5ldyBEYXRlKGEuZnJvbnRtYXR0ZXIuZGF0ZSk7XHJcbiAgICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGIuZnJvbnRtYXR0ZXIuZGF0ZSk7XHJcbiAgICByZXR1cm4gZGF0ZUIgLSBkYXRlQTtcclxuICB9KTtcclxuICBmb3IgKGNvbnN0IHsgdXJsLCBmcm9udG1hdHRlciB9IG9mIHBvc3RzKSB7XHJcbiAgICAvLyBcdTRFQzVcdTRGRERcdTc1NTlcdTY3MDBcdThGRDEgMTAgXHU3QkM3XHU2NTg3XHU3QUUwXHJcbiAgICBpZiAoZmVlZC5pdGVtcy5sZW5ndGggPj0gMTApIGJyZWFrO1xyXG4gICAgLy8gXHU2NTg3XHU3QUUwXHU0RkUxXHU2MDZGXHJcbiAgICBsZXQgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUgfSA9IGZyb250bWF0dGVyO1xyXG4gICAgLy8gXHU1OTA0XHU3NDA2XHU2NUU1XHU2NzFGXHJcbiAgICBpZiAodHlwZW9mIGRhdGUgPT09IFwic3RyaW5nXCIpIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgIC8vIFx1NkRGQlx1NTJBMFx1NjU4N1x1N0FFMFxyXG4gICAgZmVlZC5hZGRJdGVtKHtcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGlkOiBgJHtob3N0TGlua30ke3VybH1gLFxyXG4gICAgICBsaW5rOiBgJHtob3N0TGlua30ke3VybH1gLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgZGF0ZSxcclxuICAgICAgLy8gdXBkYXRlZCxcclxuICAgICAgYXV0aG9yOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogc2l0ZU1ldGEuYXV0aG9yLm5hbWUsXHJcbiAgICAgICAgICBlbWFpbDogc2l0ZU1ldGEuYXV0aG9yLmVtYWlsLFxyXG4gICAgICAgICAgbGluazogc2l0ZU1ldGEuYXV0aG9yLmxpbmssXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0pO1xyXG4gIH1cclxuICAvLyBcdTUxOTlcdTUxNjVcdTY1ODdcdTRFRjZcclxuICB3cml0ZUZpbGVTeW5jKHBhdGguam9pbihjb25maWcub3V0RGlyLCBcInJzcy54bWxcIiksIGZlZWQucnNzMigpLCBcInV0Zi04XCIpO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcYmxvZ1xcXFx2aXRlcHJlc3MtbGl1XFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcYmxvZ1xcXFx2aXRlcHJlc3MtbGl1XFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcdXRpbHNcXFxcY29tbW9uVG9vbHMubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL2Jsb2cvdml0ZXByZXNzLWxpdS8udml0ZXByZXNzL3RoZW1lL3V0aWxzL2NvbW1vblRvb2xzLm1qc1wiO2ltcG9ydCB7IGxvYWQgfSBmcm9tIFwiY2hlZXJpb1wiO1xyXG5cclxuLyoqXHJcbiAqIFx1NEVDRVx1NjU4N1x1NEVGNlx1NTQwRFx1NzUxRlx1NjIxMFx1NjU3MFx1NUI1NyBJRFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZU5hbWUgLSBcdTY1ODdcdTRFRjZcdTU0MERcclxuICogQHJldHVybnMge251bWJlcn0gLSBcdTc1MUZcdTYyMTBcdTc2ODRcdTY1NzBcdTVCNTdJRFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlSWQgPSAoZmlsZU5hbWUpID0+IHtcclxuICAvLyBcdTVDMDZcdTY1ODdcdTRFRjZcdTU0MERcdThGNkNcdTYzNjJcdTRFM0FcdTU0QzhcdTVFMENcdTUwM0NcclxuICBsZXQgaGFzaCA9IDA7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlTmFtZS5sZW5ndGg7IGkrKykge1xyXG4gICAgaGFzaCA9IChoYXNoIDw8IDUpIC0gaGFzaCArIGZpbGVOYW1lLmNoYXJDb2RlQXQoaSk7XHJcbiAgfVxyXG4gIC8vIFx1NUMwNlx1NTRDOFx1NUUwQ1x1NTAzQ1x1OEY2Q1x1NjM2Mlx1NEUzQVx1NkI2M1x1NjU3NFx1NjU3MFxyXG4gIGNvbnN0IG51bWVyaWNJZCA9IE1hdGguYWJzKGhhc2ggJSAxMDAwMDAwMDAwMCk7XHJcbiAgcmV0dXJuIG51bWVyaWNJZDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBcdTUyQThcdTYwMDFcdTUyQTBcdThGN0RcdTgxMUFcdTY3MkNcclxuICogQHBhcmFtIHtzdHJpbmd9IHNyYyAtIFx1ODExQVx1NjcyQyBVUkxcclxuICogKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uIC0gXHU5MTREXHU3RjZFXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbG9hZFNjcmlwdCA9IChzcmMsIG9wdGlvbiA9IHt9KSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhc3JjKSByZXR1cm4gZmFsc2U7XHJcbiAgLy8gXHU4M0I3XHU1M0Q2XHU5MTREXHU3RjZFXHJcbiAgY29uc3QgeyBhc3luYyA9IGZhbHNlLCByZWxvYWQgPSBmYWxzZSwgY2FsbGJhY2sgfSA9IG9wdGlvbjtcclxuICAvLyBcdTY4QzBcdTY3RTVcdTY2MkZcdTU0MjZcdTVERjJcdTdFQ0ZcdTUyQTBcdThGN0RcdThGQzdcdTZCNjRcdTgxMUFcdTY3MkNcclxuICBjb25zdCBleGlzdGluZ1NjcmlwdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNjcmlwdFtzcmM9XCIke3NyY31cIl1gKTtcclxuICBpZiAoZXhpc3RpbmdTY3JpcHQpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiXHU1REYyXHU2NzA5XHU5MUNEXHU1OTBEXHU4MTFBXHU2NzJDXCIpO1xyXG4gICAgaWYgKCFyZWxvYWQpIHtcclxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCwgZXhpc3RpbmdTY3JpcHQpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBleGlzdGluZ1NjcmlwdC5yZW1vdmUoKTtcclxuICB9XHJcbiAgLy8gXHU1MjFCXHU1RUZBXHU0RTAwXHU0RTJBXHU2NUIwXHU3Njg0c2NyaXB0XHU2ODA3XHU3QjdFXHU1RTc2XHU1MkEwXHU4RjdEXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiAgICBzY3JpcHQuc3JjID0gc3JjO1xyXG4gICAgaWYgKGFzeW5jKSBzY3JpcHQuYXN5bmMgPSB0cnVlO1xyXG4gICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgcmVzb2x2ZShzY3JpcHQpO1xyXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCBzY3JpcHQpO1xyXG4gICAgfTtcclxuICAgIHNjcmlwdC5vbmVycm9yID0gKGVycm9yKSA9PiB7XHJcbiAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGVycm9yKTtcclxuICAgIH07XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogXHU1MkE4XHU2MDAxXHU1MkEwXHU4RjdEXHU2ODM3XHU1RjBGXHU4ODY4XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmIC0gXHU2ODM3XHU1RjBGXHU4ODY4IFVSTFxyXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uIC0gXHU5MTREXHU3RjZFXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbG9hZENTUyA9IChocmVmLCBvcHRpb24gPSB7fSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgIWhyZWYpIHJldHVybiBmYWxzZTtcclxuICAvLyBcdTgzQjdcdTUzRDZcdTkxNERcdTdGNkVcclxuICBjb25zdCB7IHJlbG9hZCA9IGZhbHNlLCBjYWxsYmFjayB9ID0gb3B0aW9uO1xyXG4gIC8vIFx1NjhDMFx1NjdFNVx1NjYyRlx1NTQyNlx1NURGMlx1N0VDRlx1NTJBMFx1OEY3RFx1OEZDN1x1NkI2NFx1NjgzN1x1NUYwRlx1ODg2OFxyXG4gIGNvbnN0IGV4aXN0aW5nTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxpbmtbaHJlZj1cIiR7aHJlZn1cIl1gKTtcclxuICBpZiAoZXhpc3RpbmdMaW5rKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlx1NURGMlx1NjcwOVx1OTFDRFx1NTkwRFx1NjgzN1x1NUYwRlwiKTtcclxuICAgIGlmICghcmVsb2FkKSB7XHJcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIGV4aXN0aW5nTGluayk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGV4aXN0aW5nTGluay5yZW1vdmUoKTtcclxuICB9XHJcbiAgLy8gXHU1MjFCXHU1RUZBXHU2NUIwXHU3Njg0bGlua1x1NjgwN1x1N0I3RVx1NUU3Nlx1OEJCRVx1N0Y2RVx1NUM1RVx1NjAyN1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcbiAgICBsaW5rLmhyZWYgPSBocmVmO1xyXG4gICAgbGluay5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuICAgIGxpbmsudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuICAgIGxpbmsub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICByZXNvbHZlKGxpbmspO1xyXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCBsaW5rKTtcclxuICAgIH07XHJcbiAgICBsaW5rLm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcclxuICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZXJyb3IpO1xyXG4gICAgfTtcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogXHU4REYzXHU4RjZDXHU0RTJEXHU4RjZDXHU5ODc1XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sIC0gXHU5ODc1XHU5NzYyXHU1MTg1XHU1QkI5XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEb20gLSBcdTY2MkZcdTU0MjZcdTRFM0EgRE9NIFx1NUJGOVx1OEM2MVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGp1bXBSZWRpcmVjdCA9IChodG1sLCB0aGVtZUNvbmZpZywgaXNEb20gPSBmYWxzZSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBcdTY2MkZcdTU0MjZcdTRFM0FcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcclxuICAgIGNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIjtcclxuICAgIGlmIChpc0RldikgcmV0dXJuIGZhbHNlO1xyXG4gICAgLy8gXHU2NjJGXHU1NDI2XHU1NDJGXHU3NTI4XHJcbiAgICBpZiAoIXRoZW1lQ29uZmlnLmp1bXBSZWRpcmVjdC5lbmFibGUpIHJldHVybiBodG1sO1xyXG4gICAgLy8gXHU0RTJEXHU4RjZDXHU5ODc1XHU1NzMwXHU1NzQwXHJcbiAgICBjb25zdCByZWRpcmVjdFBhZ2UgPSBcIi9yZWRpcmVjdFwiO1xyXG4gICAgLy8gXHU2MzkyXHU5NjY0XHU3Njg0IGNsYXNzTmFtZVxyXG4gICAgY29uc3QgZXhjbHVkZUNsYXNzID0gdGhlbWVDb25maWcuanVtcFJlZGlyZWN0LmV4Y2x1ZGU7XHJcbiAgICBpZiAoaXNEb20pIHtcclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIC8vIFx1NjI0MFx1NjcwOVx1OTRGRVx1NjNBNVxyXG4gICAgICBjb25zdCBhbGxMaW5rcyA9IFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImFcIildO1xyXG4gICAgICBpZiAoYWxsTGlua3M/Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBhbGxMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XHJcbiAgICAgICAgLy8gXHU2OEMwXHU2N0U1XHU5NEZFXHU2M0E1XHU2NjJGXHU1NDI2XHU1MzA1XHU1NDJCIHRhcmdldD1cIl9ibGFua1wiIFx1NUM1RVx1NjAyN1xyXG4gICAgICAgIGlmIChsaW5rLmdldEF0dHJpYnV0ZShcInRhcmdldFwiKSA9PT0gXCJfYmxhbmtcIikge1xyXG4gICAgICAgICAgLy8gXHU2OEMwXHU2N0U1XHU5NEZFXHU2M0E1XHU2NjJGXHU1NDI2XHU1MzA1XHU1NDJCXHU2MzkyXHU5NjY0XHU3Njg0XHU3QzdCXHJcbiAgICAgICAgICBpZiAoZXhjbHVkZUNsYXNzLnNvbWUoKGNsYXNzTmFtZSkgPT4gbGluay5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgbGlua0hyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XHJcbiAgICAgICAgICAvLyBcdTVCNThcdTU3MjhcdTk0RkVcdTYzQTVcdTRFMTRcdTk3NUVcdTRFMkRcdThGNkNcdTk4NzVcclxuICAgICAgICAgIGlmIChsaW5rSHJlZiAmJiAhbGlua0hyZWYuaW5jbHVkZXMocmVkaXJlY3RQYWdlKSkge1xyXG4gICAgICAgICAgICAvLyBCYXNlNjRcclxuICAgICAgICAgICAgY29uc3QgZW5jb2RlZEhyZWYgPSBidG9hKGxpbmtIcmVmKTtcclxuICAgICAgICAgICAgY29uc3QgcmVkaXJlY3RMaW5rID0gYCR7cmVkaXJlY3RQYWdlfT91cmw9JHtlbmNvZGVkSHJlZn1gO1xyXG4gICAgICAgICAgICAvLyBcdTRGRERcdTVCNThcdTUzOUZcdTU5Q0JcdTk0RkVcdTYzQTVcclxuICAgICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoXCJvcmlnaW5hbC1ocmVmXCIsIGxpbmtIcmVmKTtcclxuICAgICAgICAgICAgLy8gXHU4OTg2XHU3NkQ2IGhyZWZcclxuICAgICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHJlZGlyZWN0TGluayk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0ICQgPSBsb2FkKGh0bWwpO1xyXG4gICAgICAvLyBcdTY2RkZcdTYzNjJcdTdCMjZcdTU0MDhcdTY3NjFcdTRFRjZcdTc2ODRcdTY4MDdcdTdCN0VcclxuICAgICAgJChcImFbdGFyZ2V0PSdfYmxhbmsnXVwiKS5lYWNoKChfLCBlbCkgPT4ge1xyXG4gICAgICAgIGNvbnN0ICRhID0gJChlbCk7XHJcbiAgICAgICAgY29uc3QgaHJlZiA9ICRhLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgIGNvbnN0IGNsYXNzZXNTdHIgPSAkYS5hdHRyKFwiY2xhc3NcIik7XHJcbiAgICAgICAgY29uc3QgaW5uZXJUZXh0ID0gJGEudGV4dCgpO1xyXG4gICAgICAgIC8vIFx1NjhDMFx1NjdFNVx1NjYyRlx1NTQyNlx1NTMwNVx1NTQyQlx1NjM5Mlx1OTY2NFx1NzY4NFx1N0M3QlxyXG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc2VzU3RyID8gY2xhc3Nlc1N0ci50cmltKCkuc3BsaXQoXCIgXCIpIDogW107XHJcbiAgICAgICAgaWYgKGV4Y2x1ZGVDbGFzcy5zb21lKChjbGFzc05hbWUpID0+IGNsYXNzZXMuaW5jbHVkZXMoY2xhc3NOYW1lKSkpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gXHU1QjU4XHU1NzI4XHU5NEZFXHU2M0E1XHU0RTE0XHU5NzVFXHU0RTJEXHU4RjZDXHU5ODc1XHJcbiAgICAgICAgaWYgKGhyZWYgJiYgIWhyZWYuaW5jbHVkZXMocmVkaXJlY3RQYWdlKSkge1xyXG4gICAgICAgICAgLy8gQmFzZTY0IFx1N0YxNlx1NzgwMSBocmVmXHJcbiAgICAgICAgICBjb25zdCBlbmNvZGVkSHJlZiA9IEJ1ZmZlci5mcm9tKGhyZWYsIFwidXRmLThcIikudG9TdHJpbmcoXCJiYXNlNjRcIik7XHJcbiAgICAgICAgICAvLyBcdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDlcdTVDNUVcdTYwMjdcclxuICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBlbC5hdHRyaWJzO1xyXG4gICAgICAgICAgLy8gXHU5MUNEXHU2Nzg0XHU1QzVFXHU2MDI3XHU1QjU3XHU3QjI2XHU0RTMyXHVGRjBDXHU0RkREXHU3NTU5XHU1MzlGXHU2NzA5XHU1QzVFXHU2MDI3XHJcbiAgICAgICAgICBsZXQgYXR0cmlidXRlc1N0ciA9IFwiXCI7XHJcbiAgICAgICAgICBmb3IgKGxldCBhdHRyIGluIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhdHRyaWJ1dGVzLCBhdHRyKSkge1xyXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXNTdHIgKz0gYCAke2F0dHJ9PVwiJHthdHRyaWJ1dGVzW2F0dHJdfVwiYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gXHU2Nzg0XHU5MDIwXHU2NUIwXHU2ODA3XHU3QjdFXHJcbiAgICAgICAgICBjb25zdCBuZXdMaW5rID0gYDxhIGhyZWY9XCIke3JlZGlyZWN0UGFnZX0/dXJsPSR7ZW5jb2RlZEhyZWZ9XCIgb3JpZ2luYWwtaHJlZj1cIiR7aHJlZn1cIiAke2F0dHJpYnV0ZXNTdHJ9PiR7aW5uZXJUZXh0fTwvYT5gO1xyXG4gICAgICAgICAgLy8gXHU2NkZGXHU2MzYyXHU1MzlGXHU2NzA5XHU2ODA3XHU3QjdFXHJcbiAgICAgICAgICAkYS5yZXBsYWNlV2l0aChuZXdMaW5rKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gJC5odG1sKCk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJcdTU5MDRcdTc0MDZcdTk0RkVcdTYzQTVcdTY1RjZcdTUxRkFcdTk1MTlcdUZGMUFcIiwgZXJyb3IpO1xyXG4gIH1cclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXGJsb2dcXFxcdml0ZXByZXNzLWxpdVxcXFwudml0ZXByZXNzXFxcXHRoZW1lXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlXFxcXGJsb2dcXFxcdml0ZXByZXNzLWxpdVxcXFwudml0ZXByZXNzXFxcXHRoZW1lXFxcXHV0aWxzXFxcXGdldFBvc3REYXRhLm1qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9ibG9nL3ZpdGVwcmVzcy1saXUvLnZpdGVwcmVzcy90aGVtZS91dGlscy9nZXRQb3N0RGF0YS5tanNcIjtpbXBvcnQgeyBnZW5lcmF0ZUlkIH0gZnJvbSBcIi4vY29tbW9uVG9vbHMubWpzXCI7XHJcbmltcG9ydCB7IGdsb2JieSB9IGZyb20gXCJnbG9iYnlcIjtcclxuaW1wb3J0IG1hdHRlciBmcm9tIFwiZ3JheS1tYXR0ZXJcIjtcclxuaW1wb3J0IGZzIGZyb20gXCJmcy1leHRyYVwiO1xyXG5cclxuLyoqXHJcbiAqIFx1ODNCN1x1NTNENiBwb3N0cyBcdTc2RUVcdTVGNTVcdTRFMEJcdTYyNDBcdTY3MDkgTWFya2Rvd24gXHU2NTg3XHU0RUY2XHU3Njg0XHU4REVGXHU1Rjg0XHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZ1tdPn0gLSBcdTY1ODdcdTRFRjZcdThERUZcdTVGODRcdTY1NzBcdTdFQzRcclxuICovXHJcbmNvbnN0IGdldFBvc3RNREZpbGVQYXRocyA9IGFzeW5jICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgLy8gXHU4M0I3XHU1M0Q2XHU2MjQwXHU2NzA5IG1kIFx1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFxyXG4gICAgbGV0IHBhdGhzID0gYXdhaXQgZ2xvYmJ5KFtcIioqLm1kXCJdLCB7XHJcbiAgICAgIGlnbm9yZTogW1wibm9kZV9tb2R1bGVzXCIsIFwicGFnZXNcIiwgXCIudml0ZXByZXNzXCIsIFwiUkVBRE1FLm1kXCJdLFxyXG4gICAgfSk7XHJcbiAgICAvLyBcdThGQzdcdTZFRTRcdThERUZcdTVGODRcdUZGMENcdTUzRUFcdTUzMDVcdTYyRUMgJ3Bvc3RzJyBcdTc2RUVcdTVGNTVcdTRFMEJcdTc2ODRcdTY1ODdcdTRFRjZcclxuICAgIHJldHVybiBwYXRocy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaW5jbHVkZXMoXCJwb3N0cy9cIikpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiXHU4M0I3XHU1M0Q2XHU2NTg3XHU3QUUwXHU4REVGXHU1Rjg0XHU2NUY2XHU1MUZBXHU5NTE5OlwiLCBlcnJvcik7XHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogXHU1N0ZBXHU0RThFIGZyb250TWF0dGVyIFx1NjVFNVx1NjcxRlx1OTY0RFx1NUU4Rlx1NjM5Mlx1NUU4Rlx1NjU4N1x1N0FFMFxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSAtIFx1N0IyQ1x1NEUwMFx1N0JDN1x1NjU4N1x1N0FFMFx1NUJGOVx1OEM2MVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMiAtIFx1N0IyQ1x1NEU4Q1x1N0JDN1x1NjU4N1x1N0FFMFx1NUJGOVx1OEM2MVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIFx1NkJENFx1OEY4M1x1N0VEM1x1Njc5Q1xyXG4gKi9cclxuY29uc3QgY29tcGFyZURhdGUgPSAob2JqMSwgb2JqMikgPT4ge1xyXG4gIHJldHVybiBvYmoxLmRhdGUgPCBvYmoyLmRhdGUgPyAxIDogLTE7XHJcbn07XHJcbmNvbnN0IGNvbXBhcmVQb3N0UHJpb3JpdHkgPSAoYSwgYikgPT4ge1xyXG4gIGlmIChhLnRvcCAmJiAhYi50b3ApIHtcclxuICAgIHJldHVybiAtMTtcclxuICB9XHJcbiAgaWYgKCFhLnRvcCAmJiBiLnRvcCkge1xyXG4gICAgcmV0dXJuIDE7XHJcbiAgfVxyXG4gIHJldHVybiBjb21wYXJlRGF0ZShhLCBiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBcdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDlcdTY1ODdcdTdBRTBcdUZGMENcdThCRkJcdTUzRDZcdTUxNzZcdTUxODVcdTVCQjlcdTVFNzZcdTg5RTNcdTY3OTAgZnJvbnQgbWF0dGVyXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdFtdPn0gLSBcdTY1ODdcdTdBRTBcdTVCRjlcdThDNjFcdTY1NzBcdTdFQzRcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxQb3N0cyA9IGFzeW5jICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgLy8gXHU4M0I3XHU1M0Q2XHU2MjQwXHU2NzA5IE1hcmtkb3duIFx1NjU4N1x1NEVGNlx1NzY4NFx1OERFRlx1NUY4NFxyXG4gICAgbGV0IHBhdGhzID0gYXdhaXQgZ2V0UG9zdE1ERmlsZVBhdGhzKCk7XHJcbiAgICAvLyBcdThCRkJcdTUzRDZcdTU0OENcdTU5MDRcdTc0MDZcdTZCQ0ZcdTRFMkEgTWFya2Rvd24gXHU2NTg3XHU0RUY2XHU3Njg0XHU1MTg1XHU1QkI5XHJcbiAgICBsZXQgcG9zdHMgPSBhd2FpdCBQcm9taXNlLmFsbChcclxuICAgICAgcGF0aHMubWFwKGFzeW5jIChpdGVtKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIFx1OEJGQlx1NTNENlx1NjU4N1x1NEVGNlx1NTE4NVx1NUJCOVxyXG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnJlYWRGaWxlKGl0ZW0sIFwidXRmLThcIik7XHJcbiAgICAgICAgICAvLyBcdTY1ODdcdTRFRjZcdTc2ODRcdTUxNDNcdTY1NzBcdTYzNkVcclxuICAgICAgICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBmcy5zdGF0KGl0ZW0pO1xyXG4gICAgICAgICAgLy8gXHU4M0I3XHU1M0Q2XHU2NTg3XHU0RUY2XHU1MjFCXHU1RUZBXHU2NUY2XHU5NUY0XHU1NDhDXHU2NzAwXHU1NDBFXHU0RkVFXHU2NTM5XHU2NUY2XHU5NUY0XHJcbiAgICAgICAgICBjb25zdCB7IGJpcnRodGltZU1zLCBtdGltZU1zIH0gPSBzdGF0O1xyXG4gICAgICAgICAgLy8gXHU4OUUzXHU2NzkwIGZyb250IG1hdHRlclxyXG4gICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBtYXR0ZXIoY29udGVudCk7XHJcbiAgICAgICAgICBjb25zdCB7IHRpdGxlLCBkYXRlLCBjYXRlZ29yaWVzLCBkZXNjcmlwdGlvbiwgdGFncywgdG9wLCBjb3ZlciB9ID0gZGF0YTtcclxuICAgICAgICAgIC8vIFx1OEJBMVx1N0I5N1x1NjU4N1x1N0FFMFx1NzY4NFx1OEZDN1x1NjcxRlx1NTkyOVx1NjU3MFxyXG4gICAgICAgICAgY29uc3QgZXhwaXJlZCA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCksXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgLy8gXHU4RkQ0XHU1NkRFXHU2NTg3XHU3QUUwXHU1QkY5XHU4QzYxXHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZDogZ2VuZXJhdGVJZChpdGVtKSxcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlIHx8IFwiXHU2NzJBXHU1NDdEXHU1NDBEXHU2NTg3XHU3QUUwXCIsXHJcbiAgICAgICAgICAgIGRhdGU6IGRhdGUgPyBuZXcgRGF0ZShkYXRlKS5nZXRUaW1lKCkgOiBiaXJ0aHRpbWVNcyxcclxuICAgICAgICAgICAgbGFzdE1vZGlmaWVkOiBtdGltZU1zLFxyXG4gICAgICAgICAgICBleHBpcmVkLFxyXG4gICAgICAgICAgICB0YWdzLFxyXG4gICAgICAgICAgICBjYXRlZ29yaWVzLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgcmVndWxhclBhdGg6IGAvJHtpdGVtLnJlcGxhY2UoXCIubWRcIiwgXCIuaHRtbFwiKX1gLFxyXG4gICAgICAgICAgICB0b3AsXHJcbiAgICAgICAgICAgIGNvdmVyLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgXHU1OTA0XHU3NDA2XHU2NTg3XHU3QUUwXHU2NTg3XHU0RUY2ICcke2l0ZW19JyBcdTY1RjZcdTUxRkFcdTk1MTk6YCwgZXJyb3IpO1xyXG4gICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSxcclxuICAgICk7XHJcbiAgICAvLyBcdTY4MzlcdTYzNkVcdTY1RTVcdTY3MUZcdTYzOTJcdTVFOEZcdTY1ODdcdTdBRTBcclxuICAgIHBvc3RzLnNvcnQoY29tcGFyZVBvc3RQcmlvcml0eSk7XHJcbiAgICByZXR1cm4gcG9zdHM7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJcdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDlcdTY1ODdcdTdBRTBcdTY1RjZcdTUxRkFcdTk1MTk6XCIsIGVycm9yKTtcclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBcdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDlcdTY4MDdcdTdCN0VcdTUzQ0FcdTUxNzZcdTc2RjhcdTUxNzNcdTY1ODdcdTdBRTBcdTc2ODRcdTdFREZcdThCQTFcdTRGRTFcdTYwNkZcclxuICogQHBhcmFtIHtPYmplY3RbXX0gcG9zdERhdGEgLSBcdTUzMDVcdTU0MkJcdTY1ODdcdTdBRTBcdTRGRTFcdTYwNkZcdTc2ODRcdTY1NzBcdTdFQzRcclxuICogQHJldHVybnMge09iamVjdH0gLSBcdTUzMDVcdTU0MkJcdTY4MDdcdTdCN0VcdTdFREZcdThCQTFcdTRGRTFcdTYwNkZcdTc2ODRcdTVCRjlcdThDNjFcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxUeXBlID0gKHBvc3REYXRhKSA9PiB7XHJcbiAgY29uc3QgdGFnRGF0YSA9IHt9O1xyXG4gIC8vIFx1OTA0RFx1NTM4Nlx1NjU3MFx1NjM2RVxyXG4gIHBvc3REYXRhLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgLy8gXHU2OEMwXHU2N0U1XHU2NjJGXHU1NDI2XHU2NzA5IHRhZ3MgXHU1QzVFXHU2MDI3XHJcbiAgICBpZiAoIWl0ZW0udGFncyB8fCBpdGVtLnRhZ3MubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICAvLyBcdTU5MDRcdTc0MDZcdTY4MDdcdTdCN0VcclxuICAgIGlmICh0eXBlb2YgaXRlbS50YWdzID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIC8vIFx1NEVFNVx1OTAxN1x1NTNGN1x1NTIwNlx1OTY5NFxyXG4gICAgICBpdGVtLnRhZ3MgPSBpdGVtLnRhZ3Muc3BsaXQoXCIsXCIpO1xyXG4gICAgfVxyXG4gICAgLy8gXHU5MDREXHU1Mzg2XHU2NTg3XHU3QUUwXHU3Njg0XHU2QkNGXHU0RTJBXHU2ODA3XHU3QjdFXHJcbiAgICBpdGVtLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XHJcbiAgICAgIC8vIFx1NTIxRFx1NTlDQlx1NTMxNlx1NjgwN1x1N0I3RVx1NzY4NFx1N0VERlx1OEJBMVx1NEZFMVx1NjA2Rlx1RkYwQ1x1NTk4Mlx1Njc5Q1x1NEUwRFx1NUI1OFx1NTcyOFxyXG4gICAgICBpZiAoIXRhZ0RhdGFbdGFnXSkge1xyXG4gICAgICAgIHRhZ0RhdGFbdGFnXSA9IHtcclxuICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgYXJ0aWNsZXM6IFtpdGVtXSxcclxuICAgICAgICB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NjgwN1x1N0I3RVx1NURGMlx1NUI1OFx1NTcyOFx1RkYwQ1x1NTIxOVx1NTg5RVx1NTJBMFx1OEJBMVx1NjU3MFx1NTQ4Q1x1OEJCMFx1NUY1NVx1NjI0MFx1NUM1RVx1NjU4N1x1N0FFMFxyXG4gICAgICAgIHRhZ0RhdGFbdGFnXS5jb3VudCsrO1xyXG4gICAgICAgIHRhZ0RhdGFbdGFnXS5hcnRpY2xlcy5wdXNoKGl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxuICByZXR1cm4gdGFnRGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBcdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDlcdTUyMDZcdTdDN0JcdTUzQ0FcdTUxNzZcdTc2RjhcdTUxNzNcdTY1ODdcdTdBRTBcdTc2ODRcdTdFREZcdThCQTFcdTRGRTFcdTYwNkZcclxuICogQHBhcmFtIHtPYmplY3RbXX0gcG9zdERhdGEgLSBcdTUzMDVcdTU0MkJcdTY1ODdcdTdBRTBcdTRGRTFcdTYwNkZcdTc2ODRcdTY1NzBcdTdFQzRcclxuICogQHJldHVybnMge09iamVjdH0gLSBcdTUzMDVcdTU0MkJcdTY4MDdcdTdCN0VcdTdFREZcdThCQTFcdTRGRTFcdTYwNkZcdTc2ODRcdTVCRjlcdThDNjFcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxDYXRlZ29yaWVzID0gKHBvc3REYXRhKSA9PiB7XHJcbiAgY29uc3QgY2F0RGF0YSA9IHt9O1xyXG4gIC8vIFx1OTA0RFx1NTM4Nlx1NjU3MFx1NjM2RVxyXG4gIHBvc3REYXRhLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgaWYgKCFpdGVtLmNhdGVnb3JpZXMgfHwgaXRlbS5jYXRlZ29yaWVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgLy8gXHU1OTA0XHU3NDA2XHU2ODA3XHU3QjdFXHJcbiAgICBpZiAodHlwZW9mIGl0ZW0uY2F0ZWdvcmllcyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAvLyBcdTRFRTVcdTkwMTdcdTUzRjdcdTUyMDZcdTk2OTRcclxuICAgICAgaXRlbS5jYXRlZ29yaWVzID0gaXRlbS5jYXRlZ29yaWVzLnNwbGl0KFwiLFwiKTtcclxuICAgIH1cclxuICAgIC8vIFx1OTA0RFx1NTM4Nlx1NjU4N1x1N0FFMFx1NzY4NFx1NkJDRlx1NEUyQVx1NjgwN1x1N0I3RVxyXG4gICAgaXRlbS5jYXRlZ29yaWVzLmZvckVhY2goKHRhZykgPT4ge1xyXG4gICAgICAvLyBcdTUyMURcdTU5Q0JcdTUzMTZcdTY4MDdcdTdCN0VcdTc2ODRcdTdFREZcdThCQTFcdTRGRTFcdTYwNkZcdUZGMENcdTU5ODJcdTY3OUNcdTRFMERcdTVCNThcdTU3MjhcclxuICAgICAgaWYgKCFjYXREYXRhW3RhZ10pIHtcclxuICAgICAgICBjYXREYXRhW3RhZ10gPSB7XHJcbiAgICAgICAgICBjb3VudDogMSxcclxuICAgICAgICAgIGFydGljbGVzOiBbaXRlbV0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTY4MDdcdTdCN0VcdTVERjJcdTVCNThcdTU3MjhcdUZGMENcdTUyMTlcdTU4OUVcdTUyQTBcdThCQTFcdTY1NzBcdTU0OENcdThCQjBcdTVGNTVcdTYyNDBcdTVDNUVcdTY1ODdcdTdBRTBcclxuICAgICAgICBjYXREYXRhW3RhZ10uY291bnQrKztcclxuICAgICAgICBjYXREYXRhW3RhZ10uYXJ0aWNsZXMucHVzaChpdGVtKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGNhdERhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogXHU4M0I3XHU1M0Q2XHU2MjQwXHU2NzA5XHU1RTc0XHU0RUZEXHU1M0NBXHU1MTc2XHU3NkY4XHU1MTczXHU2NTg3XHU3QUUwXHU3Njg0XHU3RURGXHU4QkExXHU0RkUxXHU2MDZGXHJcbiAqIEBwYXJhbSB7T2JqZWN0W119IHBvc3REYXRhIC0gXHU1MzA1XHU1NDJCXHU2NTg3XHU3QUUwXHU0RkUxXHU2MDZGXHU3Njg0XHU2NTcwXHU3RUM0XHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IC0gXHU1MzA1XHU1NDJCXHU1RjUyXHU2ODYzXHU3RURGXHU4QkExXHU0RkUxXHU2MDZGXHU3Njg0XHU1QkY5XHU4QzYxXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0QWxsQXJjaGl2ZXMgPSAocG9zdERhdGEpID0+IHtcclxuICBjb25zdCBhcmNoaXZlRGF0YSA9IHt9O1xyXG4gIC8vIFx1OTA0RFx1NTM4Nlx1NjU3MFx1NjM2RVxyXG4gIHBvc3REYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgIC8vIFx1NjhDMFx1NjdFNVx1NjYyRlx1NTQyNlx1NjcwOSBkYXRlIFx1NUM1RVx1NjAyN1xyXG4gICAgaWYgKGl0ZW0uZGF0ZSkge1xyXG4gICAgICAvLyBcdTVDMDZcdTY1RjZcdTk1RjRcdTYyMzNcdThGNkNcdTYzNjJcdTRFM0FcdTY1RTVcdTY3MUZcdTVCRjlcdThDNjFcclxuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGl0ZW0uZGF0ZSk7XHJcbiAgICAgIC8vIFx1ODNCN1x1NTNENlx1NUU3NFx1NEVGRFxyXG4gICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCk7XHJcbiAgICAgIC8vIFx1NTIxRFx1NTlDQlx1NTMxNlx1OEJFNVx1NUU3NFx1NEVGRFx1NzY4NFx1N0VERlx1OEJBMVx1NEZFMVx1NjA2Rlx1RkYwQ1x1NTk4Mlx1Njc5Q1x1NEUwRFx1NUI1OFx1NTcyOFxyXG4gICAgICBpZiAoIWFyY2hpdmVEYXRhW3llYXJdKSB7XHJcbiAgICAgICAgYXJjaGl2ZURhdGFbeWVhcl0gPSB7XHJcbiAgICAgICAgICBjb3VudDogMSxcclxuICAgICAgICAgIGFydGljbGVzOiBbaXRlbV0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTVFNzRcdTRFRkRcdTVERjJcdTVCNThcdTU3MjhcdUZGMENcdTUyMTlcdTU4OUVcdTUyQTBcdThCQTFcdTY1NzBcdTU0OENcdThCQjBcdTVGNTVcdTYyNDBcdTVDNUVcdTY1ODdcdTdBRTBcclxuICAgICAgICBhcmNoaXZlRGF0YVt5ZWFyXS5jb3VudCsrO1xyXG4gICAgICAgIGFyY2hpdmVEYXRhW3llYXJdLmFydGljbGVzLnB1c2goaXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuICAvLyBcdTYzRDBcdTUzRDZcdTVFNzRcdTRFRkRcdTVFNzZcdTYzMDlcdTk2NERcdTVFOEZcdTYzOTJcdTVFOEZcclxuICBjb25zdCBzb3J0ZWRZZWFycyA9IE9iamVjdC5rZXlzKGFyY2hpdmVEYXRhKS5zb3J0KChhLCBiKSA9PiBwYXJzZUludChiKSAtIHBhcnNlSW50KGEpKTtcclxuICByZXR1cm4geyBkYXRhOiBhcmNoaXZlRGF0YSwgeWVhcjogc29ydGVkWWVhcnMgfTtcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXGJsb2dcXFxcdml0ZXByZXNzLWxpdVxcXFwudml0ZXByZXNzXFxcXHRoZW1lXFxcXGFzc2V0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxibG9nXFxcXHZpdGVwcmVzcy1saXVcXFxcLnZpdGVwcmVzc1xcXFx0aGVtZVxcXFxhc3NldHNcXFxcdGhlbWVDb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL2Jsb2cvdml0ZXByZXNzLWxpdS8udml0ZXByZXNzL3RoZW1lL2Fzc2V0cy90aGVtZUNvbmZpZy5tanNcIjsvLyBcdTRFM0JcdTk4OThcdTkxNERcdTdGNkVcclxuZXhwb3J0IGNvbnN0IHRoZW1lQ29uZmlnID0ge1xyXG4gIC8vIFx1N0FEOVx1NzBCOVx1NEZFMVx1NjA2RlxyXG4gIHNpdGVNZXRhOiB7XHJcbiAgICAvLyBcdTdBRDlcdTcwQjlcdTY4MDdcdTk4OThcclxuICAgIHRpdGxlOiBcIkxpdSdzIExpZmVBcmNcIixcclxuICAgIC8vIFx1N0FEOVx1NzBCOVx1NjNDRlx1OEZGMFxyXG4gICAgZGVzY3JpcHRpb246IFwiSGVsbG8gV29ybGRcIixcclxuICAgIC8vIFx1N0FEOVx1NzBCOWxvZ29cclxuICAgIGxvZ286IFwiL2ltYWdlcy9sb2dvL2xvZ28ud2VicFwiLFxyXG4gICAgLy8gXHU3QUQ5XHU3MEI5XHU1NzMwXHU1NzQwXHJcbiAgICBzaXRlOiBcImh0dHBzOi8vYmxvZy5pbXN5eS50b3BcIixcclxuICAgIC8vIFx1OEJFRFx1OEEwMFxyXG4gICAgbGFuZzogXCJ6aC1DTlwiLFxyXG4gICAgLy8gXHU0RjVDXHU4MDA1XHJcbiAgICBhdXRob3I6IHtcclxuICAgICAgbmFtZTogXCJsaXVcIixcclxuICAgICAgY292ZXI6IFwiL2ltYWdlcy9sb2dvL2xvZ28ud2VicFwiLFxyXG4gICAgICBlbWFpbDogXCJsaXVqdW54aWFuZzAwNzZAZm94bWFpbC5jb21cIixcclxuICAgICAgbGluazogXCJcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICAvLyBcdTU5MDdcdTY4NDhcdTRGRTFcdTYwNkZcclxuICAvLyBpY3A6IFwiMTIzXCIsXHJcbiAgLy8gXHU1RUZBXHU3QUQ5XHU2NUU1XHU2NzFGXHJcbiAgc2luY2U6IFwiMjAyMi0wNy0yOFwiLFxyXG4gIC8vIFx1NkJDRlx1OTg3NVx1NjU4N1x1N0FFMFx1NjU3MFx1NjM2RVxyXG4gIHBvc3RTaXplOiA4LFxyXG4gIC8vIGluamVjdFxyXG4gIGluamVjdDoge1xyXG4gICAgLy8gXHU1OTM0XHU5MEU4XHJcbiAgICAvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvemgvcmVmZXJlbmNlL3NpdGUtY29uZmlnI2hlYWRcclxuICAgIGhlYWRlcjogW1xyXG4gICAgICAvLyBmYXZpY29uXHJcbiAgICAgIFtcImxpbmtcIiwgeyByZWw6IFwiaWNvblwiLCBocmVmOiBcIi9mYXZpY29uLmljb1wiIH1dLFxyXG4gICAgICAvLyBSU1NcclxuICAgICAgLy8gW1xyXG4gICAgICAvLyAgIFwibGlua1wiLFxyXG4gICAgICAvLyAgIHtcclxuICAgICAgLy8gICAgIHJlbDogXCJhbHRlcm5hdGVcIixcclxuICAgICAgLy8gICAgIHR5cGU6IFwiYXBwbGljYXRpb24vcnNzK3htbFwiLFxyXG4gICAgICAvLyAgICAgdGl0bGU6IFwiUlNTXCIsXHJcbiAgICAgIC8vICAgICBocmVmOiBcImh0dHBzOi8vYmxvZy5pbXN5eS50b3AvcnNzLnhtbFwiLFxyXG4gICAgICAvLyAgIH0sXHJcbiAgICAgIC8vIF0sXHJcbiAgICAgIC8vIFx1OTg4NFx1OEY3RCBDRE5cclxuICAgICAgW1xyXG4gICAgICAgIFwibGlua1wiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNyb3Nzb3JpZ2luOiBcIlwiLFxyXG4gICAgICAgICAgcmVsOiBcInByZWNvbm5lY3RcIixcclxuICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9zMS5oZHNsYi5jb21cIixcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBbXHJcbiAgICAgICAgXCJsaW5rXCIsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY3Jvc3NvcmlnaW46IFwiXCIsXHJcbiAgICAgICAgICByZWw6IFwicHJlY29ubmVjdFwiLFxyXG4gICAgICAgICAgaHJlZjogXCJodHRwczovL21pcnJvcnMuc3VzdGVjaC5lZHUuY25cIixcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICAvLyBIYXJtb255T1MgZm9udFxyXG4gICAgICBbXHJcbiAgICAgICAgXCJsaW5rXCIsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY3Jvc3NvcmlnaW46IFwiYW5vbnltb3VzXCIsXHJcbiAgICAgICAgICByZWw6IFwic3R5bGVzaGVldFwiLFxyXG4gICAgICAgICAgaHJlZjogXCJodHRwczovL3MxLmhkc2xiLmNvbS9iZnMvc3RhdGljL2ppbmtlbGEvbG9uZy9mb250L3JlZ3VsYXIuY3NzXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgW1xyXG4gICAgICAgIFwibGlua1wiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNyb3Nzb3JpZ2luOiBcImFub255bW91c1wiLFxyXG4gICAgICAgICAgcmVsOiBcInN0eWxlc2hlZXRcIixcclxuICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9taXJyb3JzLnN1c3RlY2guZWR1LmNuL2NkbmpzL2FqYXgvbGlicy9seGd3LXdlbmthaS1zY3JlZW4td2ViZm9udC8xLjcuMC9zdHlsZS5jc3NcIixcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICAvLyBpY29uZm9udFxyXG4gICAgICBbXHJcbiAgICAgICAgXCJsaW5rXCIsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY3Jvc3NvcmlnaW46IFwiYW5vbnltb3VzXCIsXHJcbiAgICAgICAgICByZWw6IFwic3R5bGVzaGVldFwiLFxyXG4gICAgICAgICAgaHJlZjogXCJodHRwczovL2NkbjIuY29kZXNpZ24ucXEuY29tL2ljb25zL2c1WnBFZ3gzejRWTzZqMi9sYXRlc3QvaWNvbmZvbnQuY3NzXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgLy8gRW1iZWQgY29kZVxyXG4gICAgICBbXCJsaW5rXCIsIHsgcmVsOiBcInByZWNvbm5lY3RcIiwgaHJlZjogXCJodHRwczovL3VzZS5zZXZlbmNkbi5jb21cIiB9XSxcclxuICAgICAgW1wibGlua1wiLCB7IHJlbDogXCJwcmVjb25uZWN0XCIsIGhyZWY6IFwiaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbVwiLCBjcm9zc29yaWdpbjogXCJcIiB9XSxcclxuICAgICAgW1xyXG4gICAgICAgIFwibGlua1wiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNyb3Nzb3JpZ2luOiBcImFub255bW91c1wiLFxyXG4gICAgICAgICAgaHJlZjogXCJodHRwczovL3VzZS5zZXZlbmNkbi5jb20vY3NzMj9mYW1pbHk9RmlyYStDb2RlOndnaHRAMzAwLi43MDAmZGlzcGxheT1zd2FwXCIsXHJcbiAgICAgICAgICByZWw6IFwic3R5bGVzaGVldFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIC8vIFx1OTg4NFx1OEY3RCBEb2NTZWFyY2hcclxuICAgICAgW1xyXG4gICAgICAgIFwibGlua1wiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9YNUVCRVpCNTNJLWRzbi5hbGdvbGlhLm5ldFwiLFxyXG4gICAgICAgICAgcmVsOiBcInByZWNvbm5lY3RcIixcclxuICAgICAgICAgIGNyb3Nzb3JpZ2luOiBcIlwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAgLy8gXHU1QkZDXHU4MjJBXHU2ODBGXHU4M0RDXHU1MzU1XHJcbiAgbmF2OiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU2NTg3XHU1RTkzXCIsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NjU4N1x1N0FFMFx1NTIxN1x1ODg2OFwiLCBsaW5rOiBcIi9wYWdlcy9hcmNoaXZlc1wiLCBpY29uOiBcImFydGljbGVcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTUxNjhcdTkwRThcdTUyMDZcdTdDN0JcIiwgbGluazogXCIvcGFnZXMvY2F0ZWdvcmllc1wiLCBpY29uOiBcImZvbGRlclwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NTE2OFx1OTBFOFx1NjgwN1x1N0I3RVwiLCBsaW5rOiBcIi9wYWdlcy90YWdzXCIsIGljb246IFwiaGFzaHRhZ1wiIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NEUxM1x1NjgwRlwiLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJcdTYyODBcdTY3MkZcdTUyMDZcdTRFQUJcIiwgbGluazogXCIvcGFnZXMvY2F0ZWdvcmllcy9cdTYyODBcdTY3MkZcdTUyMDZcdTRFQUJcIiwgaWNvbjogXCJ0ZWNobmljYWxcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTYyMTFcdTc2ODRcdTk4NzlcdTc2RUVcIiwgbGluazogXCIvcGFnZXMvcHJvamVjdFwiLCBpY29uOiBcImNvZGVcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTY1NDhcdTczODdcdTVERTVcdTUxNzdcIiwgbGluazogXCIvcGFnZXMvdG9vbHNcIiwgaWNvbjogXCJ0b29sc1wiIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NTNDQlx1OTRGRVwiLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJcdTUzQ0JcdTk0RkVcdTlDN0NcdTU4NThcIiwgbGluazogXCIvcGFnZXMvZnJpZW5kc1wiLCBpY29uOiBcImZpc2hcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTUzQ0JcdTYwQzVcdTk0RkVcdTYzQTVcIiwgbGluazogXCIvcGFnZXMvbGlua1wiLCBpY29uOiBcInBlb3BsZVwiIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NjIxMVx1NzY4NFwiLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJcdTc1NDVcdTYyNDBcdTZCMzJcdThBMDBcIiwgbGluazogXCIvcGFnZXMvbWVzc2FnZVwiLCBpY29uOiBcImNoYXRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTgxRjRcdThDMjJcdTU0MERcdTUzNTVcIiwgbGluazogXCIvcGFnZXMvdGhhbmtzXCIsIGljb246IFwicmV3YXJkXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU1MTczXHU0RThFXHU2NzJDXHU3QUQ5XCIsIGxpbms6IFwiL3BhZ2VzL2Fib3V0XCIsIGljb246IFwiY29udGFjdHNcIiB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIC8vIFx1NUJGQ1x1ODIyQVx1NjgwRlx1ODNEQ1x1NTM1NSAtIFx1NURFNlx1NEZBN1xyXG4gIG5hdk1vcmU6IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogXCJcdTUzNUFcdTVCQTJcIixcclxuICAgICAgbGlzdDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGljb246IFwiL2ltYWdlcy9sb2dvL2xvZ28ud2VicFwiLFxyXG4gICAgICAgICAgbmFtZTogXCJcdTRFM0JcdTdBRDlcIixcclxuICAgICAgICAgIHVybDogXCIvXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpY29uOiBcIi9pbWFnZXMvbG9nby9sb2dvLndlYnBcIixcclxuICAgICAgICAgIG5hbWU6IFwiXHU1MzVBXHU1QkEyXHU5NTVDXHU1MENGXHU3QUQ5XCIsXHJcbiAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9ibG9nLWJhY2t1cC5pbXN5eS50b3AvXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIG5hbWU6IFwiXHU2NzBEXHU1MkExXCIsXHJcbiAgICAvLyAgIGxpc3Q6IFtcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICBpY29uOiBcImh0dHBzOi8vcGljLmVmZWZlZS5jbi91cGxvYWRzLzIwMjQvMDQvMDgvNjYxMzQ2NTM1ODA3Ny5wbmdcIixcclxuICAgIC8vICAgICAgIG5hbWU6IFwiXHU4RDc3XHU1OUNCXHU5ODc1XCIsXHJcbiAgICAvLyAgICAgICB1cmw6IFwiaHR0cHM6Ly9uYXYuaW1zeXkudG9wL1wiLFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgaWNvbjogXCJodHRwczovL3BpYy5lZmVmZWUuY24vdXBsb2Fkcy8yMDI0LzA0LzA4LzY2MTM0NmQ0MThhZDcucG5nXCIsXHJcbiAgICAvLyAgICAgICBuYW1lOiBcIlx1NEVDQVx1NjVFNVx1NzBFRFx1Njk5Q1wiLFxyXG4gICAgLy8gICAgICAgdXJsOiBcImh0dHBzOi8vaG90Lmltc3l5LnRvcC9cIixcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgIGljb246IFwiaHR0cHM6Ly9waWMuZWZlZmVlLmNuL3VwbG9hZHMvMjAyNC8wNC8wOC82NjEzNDcyMjU4NmZhLnBuZ1wiLFxyXG4gICAgLy8gICAgICAgbmFtZTogXCJcdTdBRDlcdTcwQjlcdTc2RDFcdTZENEJcIixcclxuICAgIC8vICAgICAgIHVybDogXCJodHRwczovL3N0YXR1cy5pbXN5eS50b3AvXCIsXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgXSxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIG5hbWU6IFwiXHU5ODc5XHU3NkVFXCIsXHJcbiAgICAvLyAgIGxpc3Q6IFtcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICBpY29uOiBcIi9pbWFnZXMvbG9nby9sb2dvLndlYnBcIixcclxuICAgIC8vICAgICAgIG5hbWU6IFwiQ3VydmVcIixcclxuICAgIC8vICAgICAgIHVybDogXCJodHRwczovL2dpdGh1Yi5jb20vaW1zeXkvdml0ZXByZXNzLXRoZW1lLWN1cnZlXCIsXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICBpY29uOiBcImh0dHBzOi8vcGljLmVmZWZlZS5jbi91cGxvYWRzLzIwMjQvMDQvMDcvNjYxMjRmNWZjNjNjOC5wbmdcIixcclxuICAgIC8vICAgICAgIG5hbWU6IFwiU1BsYXllclwiLFxyXG4gICAgLy8gICAgICAgdXJsOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9pbXN5eS9TUGxheWVyXCIsXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICBpY29uOiBcImh0dHBzOi8vcGljLmVmZWZlZS5jbi91cGxvYWRzLzIwMjQvMDQvMDgvNjYxMzQ2NTM1ODA3Ny5wbmdcIixcclxuICAgIC8vICAgICAgIG5hbWU6IFwiU25hdmlnYXRpb25cIixcclxuICAgIC8vICAgICAgIHVybDogXCJodHRwczovL2dpdGh1Yi5jb20vaW1zeXkvU1BsYXllclwiLFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgaWNvbjogXCIvaW1hZ2VzL2xvZ28vbG9nby53ZWJwXCIsXHJcbiAgICAvLyAgICAgICBuYW1lOiBcIkhvbWVcIixcclxuICAgIC8vICAgICAgIHVybDogXCJodHRwczovL2dpdGh1Yi5jb20vaW1zeXkvaG9tZVwiLFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgaWNvbjogXCJodHRwczovL3BpYy5lZmVmZWUuY24vdXBsb2Fkcy8yMDI0LzA0LzA4LzY2MTM0NmQ0MThhZDcucG5nXCIsXHJcbiAgICAvLyAgICAgICBuYW1lOiBcIkRhaWx5SG90QXBpXCIsXHJcbiAgICAvLyAgICAgICB1cmw6IFwiaHR0cHM6Ly9naXRodWIuY29tL2ltc3l5L0RhaWx5SG90QXBpXCIsXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICBpY29uOiBcImh0dHBzOi8vcGljLmVmZWZlZS5jbi91cGxvYWRzLzIwMjQvMDQvMDgvNjYxMzQ3MjI1ODZmYS5wbmdcIixcclxuICAgIC8vICAgICAgIG5hbWU6IFwic2l0ZS1zdGF0dXNcIixcclxuICAgIC8vICAgICAgIHVybDogXCJodHRwczovL2dpdGh1Yi5jb20vaW1zeXkvc2l0ZS1zdGF0dXNcIixcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICBdLFxyXG4gICAgLy8gfSxcclxuICBdLFxyXG4gIC8vIFx1NUMwMVx1OTc2Mlx1OTE0RFx1N0Y2RVxyXG4gIGNvdmVyOiB7XHJcbiAgICAvLyBcdTY2MkZcdTU0MjZcdTVGMDBcdTU0MkZcdTUzQ0NcdTY4MEZcdTVFMDNcdTVDNDBcclxuICAgIHR3b0NvbHVtbnM6IGZhbHNlLFxyXG4gICAgLy8gXHU2NjJGXHU1NDI2XHU1RjAwXHU1NDJGXHU1QzAxXHU5NzYyXHU2NjNFXHU3OTNBXHJcbiAgICBzaG93Q292ZXI6IHtcclxuICAgICAgLy8gXHU2NjJGXHU1NDI2XHU1RjAwXHU1NDJGXHU1QzAxXHU5NzYyXHU2NjNFXHU3OTNBIFx1NjU4N1x1N0FFMFx1NEUwRFx1OEJCRVx1N0Y2RWNvdmVyXHU1QzAxXHU5NzYyXHU0RjFBXHU2NjNFXHU3OTNBXHU1RjAyXHU1RTM4XHVGRjBDXHU1M0VGXHU0RUU1XHU4QkJFXHU3RjZFXHU0RTBCXHU2NUI5XHU5RUQ4XHU4QkE0XHU1QzAxXHU5NzYyXHJcbiAgICAgIGVuYWJsZTogdHJ1ZSxcclxuICAgICAgLy8gXHU1QzAxXHU5NzYyXHU1RTAzXHU1QzQwXHU2NUI5XHU1RjBGOiBsZWZ0IHwgcmlnaHQgfCBib3RoXHJcbiAgICAgIGNvdmVyTGF5b3V0OiAnYm90aCcsXHJcbiAgICAgIC8vIFx1OUVEOFx1OEJBNFx1NUMwMVx1OTc2MihcdTk2OEZcdTY3M0FcdTVDNTVcdTc5M0EpXHJcbiAgICAgIGRlZmF1bHRDb3ZlcjogW1xyXG4gICAgICAgICdodHRwczovL2V4YW1wbGUuY29tLzEuYXZpZicsXHJcbiAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20vMi5hdmlmJyxcclxuICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbS8zLmF2aWYnXHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9LFxyXG4gIC8vIFx1OTg3NVx1ODExQVx1NEZFMVx1NjA2RlxyXG4gIGZvb3Rlcjoge1xyXG4gICAgLy8gXHU3OTNFXHU0RUE0XHU5NEZFXHU2M0E1XHVGRjA4XHU4QkY3XHU3ODZFXHU0RkREXHU0RTNBXHU1MDc2XHU2NTcwXHU0RTJBXHVGRjA5XHJcbiAgICBzb2NpYWw6IFtcclxuICAgICAgLy8ge1xyXG4gICAgICAvLyAgIGljb246IFwiZW1haWxcIixcclxuICAgICAgLy8gICBsaW5rOiBcIm1haWx0bzpvbmVAaW1zeXkudG9wXCIsXHJcbiAgICAgIC8vIH0sXHJcbiAgICAgIC8vIHtcclxuICAgICAgLy8gICBpY29uOiBcImdpdGh1YlwiLFxyXG4gICAgICAvLyAgIGxpbms6IFwiaHR0cHM6Ly93d3cuZ2l0aHViLmNvbS9pbXN5eS9cIixcclxuICAgICAgLy8gfSxcclxuICAgICAgLy8ge1xyXG4gICAgICAvLyAgIGljb246IFwidGVsZWdyYW1cIixcclxuICAgICAgLy8gICBsaW5rOiBcImh0dHBzOi8vdC5tZS9ib3R0b21fdXNlclwiLFxyXG4gICAgICAvLyB9LFxyXG4gICAgICAvLyB7XHJcbiAgICAgIC8vICAgaWNvbjogXCJiaWxpYmlsaVwiLFxyXG4gICAgICAvLyAgIGxpbms6IFwiaHR0cHM6Ly9zcGFjZS5iaWxpYmlsaS5jb20vOTg1NDQxNDJcIixcclxuICAgICAgLy8gfSxcclxuICAgICAgLy8ge1xyXG4gICAgICAvLyAgIGljb246IFwicXFcIixcclxuICAgICAgLy8gICBsaW5rOiBcImh0dHBzOi8vcmVzLmFiZWltLmNuL2FwaS9xcS8/cXE9MjU5MjUyNDIxN1wiLFxyXG4gICAgICAvLyB9LFxyXG4gICAgICAvLyB7XHJcbiAgICAgIC8vICAgaWNvbjogXCJ0d2l0dGVyLXhcIixcclxuICAgICAgLy8gICBsaW5rOiBcImh0dHBzOi8vdHdpdHRlci5jb20vaWltbXN5eVwiLFxyXG4gICAgICAvLyB9LFxyXG4gICAgXSxcclxuICAgIC8vIHNpdGVtYXBcclxuICAgIHNpdGVtYXA6IFtcclxuICAgICAgLy8ge1xyXG4gICAgICAvLyAgIHRleHQ6IFwiXHU1MzVBXHU1QkEyXCIsXHJcbiAgICAgIC8vICAgaXRlbXM6IFtcclxuICAgICAgLy8gICAgIHsgdGV4dDogXCJcdThGRDFcdTY3MUZcdTY1ODdcdTdBRTBcIiwgbGluazogXCIvXCIgfSxcclxuICAgICAgLy8gICAgIHsgdGV4dDogXCJcdTUxNjhcdTkwRThcdTUyMDZcdTdDN0JcIiwgbGluazogXCIvcGFnZXMvY2F0ZWdvcmllc1wiIH0sXHJcbiAgICAgIC8vICAgICB7IHRleHQ6IFwiXHU1MTY4XHU5MEU4XHU2ODA3XHU3QjdFXCIsIGxpbms6IFwiL3BhZ2VzL3RhZ3NcIiB9LFxyXG4gICAgICAvLyAgICAgeyB0ZXh0OiBcIlx1NjU4N1x1N0FFMFx1NUY1Mlx1Njg2M1wiLCBsaW5rOiBcIi9wYWdlcy9hcmNoaXZlc1wiLCBuZXdUYWI6IHRydWUgfSxcclxuICAgICAgLy8gICBdLFxyXG4gICAgICAvLyB9LFxyXG4gICAgICAvLyB7XHJcbiAgICAgIC8vICAgdGV4dDogXCJcdTk4NzlcdTc2RUVcIixcclxuICAgICAgLy8gICBpdGVtczogW1xyXG4gICAgICAvLyAgICAgeyB0ZXh0OiBcIkhvbWVcIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vaW1zeXkvaG9tZS9cIiwgbmV3VGFiOiB0cnVlIH0sXHJcbiAgICAgIC8vICAgICB7IHRleHQ6IFwiU1BsYXllclwiLCBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9pbXN5eS9TUGxheWVyL1wiLCBuZXdUYWI6IHRydWUgfSxcclxuICAgICAgLy8gICAgIHsgdGV4dDogXCJEYWlseUhvdEFwaVwiLCBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9pbXN5eS9EYWlseUhvdEFwaS9cIiwgbmV3VGFiOiB0cnVlIH0sXHJcbiAgICAgIC8vICAgICB7IHRleHQ6IFwiU25hdmlnYXRpb25cIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vaW1zeXkvU25hdmlnYXRpb24vXCIsIG5ld1RhYjogdHJ1ZSB9LFxyXG4gICAgICAvLyAgIF0sXHJcbiAgICAgIC8vIH0sXHJcbiAgICAgIC8vIHtcclxuICAgICAgLy8gICB0ZXh0OiBcIlx1NEUxM1x1NjgwRlwiLFxyXG4gICAgICAvLyAgIGl0ZW1zOiBbXHJcbiAgICAgIC8vICAgICB7IHRleHQ6IFwiXHU2MjgwXHU2NzJGXHU1MjA2XHU0RUFCXCIsIGxpbms6IFwiL3BhZ2VzL2NhdGVnb3JpZXMvdGVjaG5vbG9neVwiIH0sXHJcbiAgICAgIC8vICAgICB7IHRleHQ6IFwiXHU2MjExXHU3Njg0XHU5ODc5XHU3NkVFXCIsIGxpbms6IFwiL3BhZ2VzL3Byb2plY3RcIiB9LFxyXG4gICAgICAvLyAgICAgeyB0ZXh0OiBcIlx1NjU0OFx1NzM4N1x1NURFNVx1NTE3N1wiLCBsaW5rOiBcIi9wYWdlcy90b29sc1wiIH0sXHJcbiAgICAgIC8vICAgXSxcclxuICAgICAgLy8gfSxcclxuICAgICAgLy8ge1xyXG4gICAgICAvLyAgIHRleHQ6IFwiXHU5ODc1XHU5NzYyXCIsXHJcbiAgICAgIC8vICAgaXRlbXM6IFtcclxuICAgICAgLy8gICAgIHsgdGV4dDogXCJcdTc1NDVcdTYyNDBcdTZCMzJcdThBMDBcIiwgbGluazogXCIvcGFnZXMvbWVzc2FnZVwiIH0sXHJcbiAgICAgIC8vICAgICB7IHRleHQ6IFwiXHU1MTczXHU0RThFXHU2NzJDXHU3QUQ5XCIsIGxpbms6IFwiL3BhZ2VzL2Fib3V0XCIgfSxcclxuICAgICAgLy8gICAgIHsgdGV4dDogXCJcdTk2OTBcdTc5QzFcdTY1M0ZcdTdCNTZcIiwgbGluazogXCIvcGFnZXMvcHJpdmFjeVwiIH0sXHJcbiAgICAgIC8vICAgICB7IHRleHQ6IFwiXHU3MjQ4XHU2NzQzXHU1MzRGXHU4QkFFXCIsIGxpbms6IFwiL3BhZ2VzL2NjXCIgfSxcclxuICAgICAgLy8gICBdLFxyXG4gICAgICAvLyB9LFxyXG4gICAgICAvLyB7XHJcbiAgICAgIC8vICAgdGV4dDogXCJcdTY3MERcdTUyQTFcIixcclxuICAgICAgLy8gICBpdGVtczogW1xyXG4gICAgICAvLyAgICAgeyB0ZXh0OiBcIlx1N0FEOVx1NzBCOVx1NzJCNlx1NjAwMVwiLCBsaW5rOiBcImh0dHBzOi8vc3RhdHVzLmltc3l5LnRvcC9cIiwgbmV3VGFiOiB0cnVlIH0sXHJcbiAgICAgIC8vICAgICB7IHRleHQ6IFwiXHU0RTAwXHU0RTJBXHU1QkZDXHU4MjJBXCIsIGxpbms6IFwiaHR0cHM6Ly9uYXYuaW1zeXkudG9wL1wiLCBuZXdUYWI6IHRydWUgfSxcclxuICAgICAgLy8gICAgIHsgdGV4dDogXCJcdTdBRDlcdTcwQjlcdThCQTJcdTk2MDVcIiwgbGluazogXCJodHRwczovL2Jsb2cuaW1zeXkudG9wL3Jzcy54bWxcIiwgbmV3VGFiOiB0cnVlIH0sXHJcbiAgICAgIC8vICAgICB7XHJcbiAgICAgIC8vICAgICAgIHRleHQ6IFwiXHU1M0NEXHU5OTg4XHU2Mjk1XHU4QkM5XCIsXHJcbiAgICAgIC8vICAgICAgIGxpbms6IFwiaHR0cHM6Ly9lcW54d2VpbWtyNS5mZWlzaHUuY24vc2hhcmUvYmFzZS9mb3JtL3NocmNuQ1hDUG14Q0tLSllJM1JLVWZlZkpyZVwiLFxyXG4gICAgICAvLyAgICAgICBuZXdUYWI6IHRydWUsXHJcbiAgICAgIC8vICAgICB9LFxyXG4gICAgICAvLyAgIF0sXHJcbiAgICAgIC8vIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAgLy8gXHU4QkM0XHU4QkJBXHJcbiAgY29tbWVudDoge1xyXG4gICAgZW5hYmxlOiB0cnVlLFxyXG4gICAgLy8gXHU4QkM0XHU4QkJBXHU3Q0ZCXHU3RURGXHU5MDA5XHU2MkU5XHJcbiAgICAvLyBhcnRhbGsgLyB0d2lrb29cclxuICAgIHR5cGU6IFwiYXJ0YWxrXCIsXHJcbiAgICAvLyBhcnRhbGtcclxuICAgIC8vIGh0dHBzOi8vYXJ0YWxrLmpzLm9yZy9cclxuICAgIGFydGFsazoge1xyXG4gICAgICBzaXRlOiBcIkFydGFsayBcdTc2ODRcdTUzNUFcdTVCQTJcIixcclxuICAgICAgc2VydmVyOiBcIlwiLFxyXG4gICAgfSxcclxuICAgIC8vIHR3aWtvb1xyXG4gICAgLy8gaHR0cHM6Ly90d2lrb28uanMub3JnL1xyXG4gICAgdHdpa29vOiB7XHJcbiAgICAgIC8vIFx1NUZDNVx1NTg2Qlx1RkYwQ1x1ODJFNVx1NEUwRFx1NjBGM1x1NEY3Rlx1NzUyOCBDRE5cdUZGMENcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjggcG5wbSBhZGQgdHdpa29vIFx1NUI4OVx1ODhDNVx1NUU3Nlx1NUYxNVx1NTE2NVxyXG4gICAgICBqczogXCJodHRwczovL21pcnJvcnMuc3VzdGVjaC5lZHUuY24vY2RuanMvYWpheC9saWJzL3R3aWtvby8xLjYuMzkvdHdpa29vLmFsbC5taW4uanNcIixcclxuICAgICAgZW52SWQ6IFwiXCIsXHJcbiAgICAgIC8vIFx1NzNBRlx1NTg4M1x1NTczMFx1NTdERlx1RkYwQ1x1OUVEOFx1OEJBNFx1NEUzQSBhcC1zaGFuZ2hhaVx1RkYwQ1x1ODE3RVx1OEJBRlx1NEU5MVx1NzNBRlx1NTg4M1x1NTg2QiBhcC1zaGFuZ2hhaSBcdTYyMTYgYXAtZ3Vhbmd6aG91XHVGRjFCVmVyY2VsIFx1NzNBRlx1NTg4M1x1NEUwRFx1NTg2QlxyXG4gICAgICByZWdpb246IFwiYXAtc2hhbmdoYWlcIixcclxuICAgICAgbGFuZzogXCJ6aC1DTlwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIC8vIFx1NEZBN1x1OEZCOVx1NjgwRlxyXG4gIGFzaWRlOiB7XHJcbiAgICAvLyBcdTdBRDlcdTcwQjlcdTdCODBcdTRFQ0JcclxuICAgIGhlbGxvOiB7XHJcbiAgICAgIGVuYWJsZTogdHJ1ZSxcclxuICAgICAgdGV4dDogXCJcdThGRDlcdTkxQ0NcdTY3MDlcdTUxNzNcdTRFOEU8c3Ryb25nPlx1NUYwMFx1NTNEMTwvc3Ryb25nPlx1NzZGOFx1NTE3M1x1NzY4NFx1OTVFRVx1OTg5OFx1NTQ4Q1x1NzcwQlx1NkNENVx1RkYwQ1x1NEU1Rlx1NEYxQVx1NjcwOVx1NEUwMFx1NEU5QjxzdHJvbmc+XHU1OTQ3XHU2MjgwXHU2REVCXHU1REU3PC9zdHJvbmc+XHU3Njg0XHU1MjA2XHU0RUFCXHVGRjBDXHU1MTc2XHU0RTJEXHU1OTI3XHU5MEU4XHU1MjA2XHU1MTg1XHU1QkI5XHU0RjFBXHU0RkE3XHU5MUNEXHU0RThFPHN0cm9uZz5cdTUyNERcdTdBRUZcdTVGMDBcdTUzRDE8L3N0cm9uZz5cdTMwMDJcdTVFMENcdTY3MUJcdTRGNjBcdTUzRUZcdTRFRTVcdTU3MjhcdThGRDlcdTkxQ0NcdTYyN0VcdTUyMzBcdTVCRjlcdTRGNjBcdTY3MDlcdTc1MjhcdTc2ODRcdTc3RTVcdThCQzZcdTU0OENcdTY1NTlcdTdBMEJcdTMwMDJcIixcclxuICAgIH0sXHJcbiAgICAvLyBcdTc2RUVcdTVGNTVcclxuICAgIHRvYzoge1xyXG4gICAgICBlbmFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgLy8gXHU2ODA3XHU3QjdFXHJcbiAgICB0YWdzOiB7XHJcbiAgICAgIGVuYWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICAvLyBcdTUwMTJcdThCQTFcdTY1RjZcclxuICAgIGNvdW50RG93bjoge1xyXG4gICAgICBlbmFibGU6IHRydWUsXHJcbiAgICAgIC8vIFx1NTAxMlx1OEJBMVx1NjVGNlx1NjVFNVx1NjcxRlxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbmFtZTogXCJcdTY2MjVcdTgyODJcIixcclxuICAgICAgICBkYXRlOiBcIjIwMjUtMDEtMjlcIixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvLyBcdTdBRDlcdTcwQjlcdTY1NzBcdTYzNkVcclxuICAgIHNpdGVEYXRhOiB7XHJcbiAgICAgIGVuYWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICAvLyBcdTUzQ0JcdTk0RkVcclxuICBmcmllbmRzOiB7XHJcbiAgICAvLyBcdTUzQ0JcdTk0RkVcdTY3MEJcdTUzQ0JcdTU3MDhcclxuICAgIGNpcmNsZU9mRnJpZW5kczogXCJcIixcclxuICAgIC8vIFx1NTJBOFx1NjAwMVx1NTNDQlx1OTRGRVxyXG4gICAgZHluYW1pY0xpbms6IHtcclxuICAgICAgc2VydmVyOiBcIlwiLFxyXG4gICAgICBhcHBfdG9rZW46IFwiXCIsXHJcbiAgICAgIHRhYmxlX2lkOiBcIlwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIC8vIFx1OTdGM1x1NEU1MFx1NjRBRFx1NjUzRVx1NTY2OFxyXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pbXN5eS9NZXRpbmctQVBJXHJcbiAgbXVzaWM6IHtcclxuICAgIGVuYWJsZTogZmFsc2UsXHJcbiAgICAvLyB1cmxcclxuICAgIHVybDogXCJodHRwczovL2FwaS1tZXRpbmcuZXhhbXBsZS5jb21cIixcclxuICAgIC8vIGlkXHJcbiAgICBpZDogOTM3OTgzMTcxNCxcclxuICAgIC8vIG5ldGVhc2UgLyB0ZW5jZW50IC8ga3Vnb3VcclxuICAgIHNlcnZlcjogXCJuZXRlYXNlXCIsXHJcbiAgICAvLyBwbGF5bGlzdCAvIGFsYnVtIC8gc29uZ1xyXG4gICAgdHlwZTogXCJwbGF5bGlzdFwiLFxyXG4gIH0sXHJcbiAgLy8gXHU2NDFDXHU3RDIyXHJcbiAgLy8gaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vXHJcbiAgc2VhcmNoOiB7XHJcbiAgICBlbmFibGU6IGZhbHNlLFxyXG4gICAgYXBwSWQ6IFwiXCIsXHJcbiAgICBhcGlLZXk6IFwiXCIsXHJcbiAgfSxcclxuICAvLyBcdTYyNTNcdThENEZcclxuICByZXdhcmREYXRhOiB7XHJcbiAgICBlbmFibGU6IHRydWUsXHJcbiAgICAvLyBcdTVGQUVcdTRGRTFcdTRFOENcdTdFRjRcdTc4MDFcclxuICAgIC8vIHdlY2hhdDogXCJodHRwczovL3BpYy5lZmVmZWUuY24vdXBsb2Fkcy8yMDI0LzA0LzA3LzY2MTIxMDQ5ZDFlODAud2VicFwiLFxyXG4gICAgLy8gXHU2NTJGXHU0RUQ4XHU1QjlEXHU0RThDXHU3RUY0XHU3ODAxXHJcbiAgICAvLyBhbGlwYXk6IFwiaHR0cHM6Ly9waWMuZWZlZmVlLmNuL3VwbG9hZHMvMjAyNC8wNC8wNy82NjEyMDY2MzFkM2I1LndlYnBcIixcclxuICB9LFxyXG4gIC8vIFx1NTZGRVx1NzI0N1x1NzA2Rlx1N0JCMVxyXG4gIGZhbmN5Ym94OiB7XHJcbiAgICBlbmFibGU6IHRydWUsXHJcbiAgICBqczogXCJodHRwczovL21pcnJvcnMuc3VzdGVjaC5lZHUuY24vY2RuanMvYWpheC9saWJzL2ZhbmN5YXBwcy11aS81LjAuMzYvZmFuY3lib3gvZmFuY3lib3gudW1kLm1pbi5qc1wiLFxyXG4gICAgY3NzOiBcImh0dHBzOi8vbWlycm9ycy5zdXN0ZWNoLmVkdS5jbi9jZG5qcy9hamF4L2xpYnMvZmFuY3lhcHBzLXVpLzUuMC4zNi9mYW5jeWJveC9mYW5jeWJveC5taW4uY3NzXCIsXHJcbiAgfSxcclxuICAvLyBcdTU5MTZcdTk0RkVcdTRFMkRcdThGNkNcclxuICBqdW1wUmVkaXJlY3Q6IHtcclxuICAgIGVuYWJsZTogdHJ1ZSxcclxuICAgIC8vIFx1NjM5Mlx1OTY2NFx1N0M3Qlx1NTQwRFxyXG4gICAgZXhjbHVkZTogW1xyXG4gICAgICBcImNmLWZyaWVuZHMtbGlua1wiLFxyXG4gICAgICBcInVweXVuXCIsXHJcbiAgICAgIFwiaWNwXCIsXHJcbiAgICAgIFwiYXV0aG9yXCIsXHJcbiAgICAgIFwicnNzXCIsXHJcbiAgICAgIFwiY2NcIixcclxuICAgICAgXCJwb3dlclwiLFxyXG4gICAgICBcInNvY2lhbC1saW5rXCIsXHJcbiAgICAgIFwibGluay10ZXh0XCIsXHJcbiAgICAgIFwidHJhdmVsbGluZ3NcIixcclxuICAgICAgXCJwb3N0LWxpbmtcIixcclxuICAgICAgXCJyZXBvcnRcIixcclxuICAgICAgXCJtb3JlLWxpbmtcIixcclxuICAgICAgXCJza2lsbHMtaXRlbVwiLFxyXG4gICAgICBcInJpZ2h0LW1lbnUtbGlua1wiLFxyXG4gICAgICBcImxpbmstY2FyZFwiLFxyXG4gICAgXSxcclxuICB9LFxyXG4gIC8vIFx1N0FEOVx1NzBCOVx1N0VERlx1OEJBMVxyXG4gIHRvbmdqaToge1xyXG4gICAgXCI1MWxhXCI6IFwiXCIsXHJcbiAgfSxcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXGJsb2dcXFxcdml0ZXByZXNzLWxpdVxcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlXFxcXGJsb2dcXFxcdml0ZXByZXNzLWxpdVxcXFwudml0ZXByZXNzXFxcXGluaXQubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL2Jsb2cvdml0ZXByZXNzLWxpdS8udml0ZXByZXNzL2luaXQubWpzXCI7aW1wb3J0IHsgdGhlbWVDb25maWcgfSBmcm9tIFwiLi90aGVtZS9hc3NldHMvdGhlbWVDb25maWcubWpzXCI7XHJcbmltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbi8qKlxyXG4gKiBcdTgzQjdcdTUzRDZcdTVFNzZcdTU0MDhcdTVFNzZcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRUaGVtZUNvbmZpZyA9IGFzeW5jICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgLy8gXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHJcbiAgICBjb25zdCBjb25maWdQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi90aGVtZUNvbmZpZy5tanNcIik7XHJcbiAgICBpZiAoZXhpc3RzU3luYyhjb25maWdQYXRoKSkge1xyXG4gICAgICAvLyBcdTY1ODdcdTRFRjZcdTVCNThcdTU3MjhcdTY1RjZcdThGREJcdTg4NENcdTUyQThcdTYwMDFcdTVCRkNcdTUxNjVcclxuICAgICAgY29uc3QgdXNlckNvbmZpZyA9IGF3YWl0IGltcG9ydChcIi4uL3RoZW1lQ29uZmlnLm1qc1wiKTtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGhlbWVDb25maWcsIHVzZXJDb25maWc/LnRoZW1lQ29uZmlnIHx8IHt9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFx1NjU4N1x1NEVGNlx1NEUwRFx1NUI1OFx1NTcyOFx1NjVGNlx1OEZENFx1NTZERVx1OUVEOFx1OEJBNFx1OTE0RFx1N0Y2RVxyXG4gICAgICBjb25zb2xlLndhcm4oXCJVc2VyIGNvbmZpZ3VyYXRpb24gZmlsZSBub3QgZm91bmQsIHVzaW5nIGRlZmF1bHQgdGhlbWVDb25maWcuXCIpO1xyXG4gICAgICByZXR1cm4gdGhlbWVDb25maWc7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBsb2FkaW5nIHRoZSBjb25maWd1cmF0aW9uOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gdGhlbWVDb25maWc7XHJcbiAgfVxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcYmxvZ1xcXFx2aXRlcHJlc3MtbGl1XFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcYmxvZ1xcXFx2aXRlcHJlc3MtbGl1XFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcdXRpbHNcXFxcbWFya2Rvd25Db25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL2Jsb2cvdml0ZXByZXNzLWxpdS8udml0ZXByZXNzL3RoZW1lL3V0aWxzL21hcmtkb3duQ29uZmlnLm1qc1wiO2ltcG9ydCB7IHRhYnNNYXJrZG93blBsdWdpbiB9IGZyb20gXCJ2aXRlcHJlc3MtcGx1Z2luLXRhYnNcIjtcclxuaW1wb3J0IG1hcmtkb3duSXRBdHRycyBmcm9tIFwibWFya2Rvd24taXQtYXR0cnNcIjtcclxuaW1wb3J0IGNvbnRhaW5lciBmcm9tIFwibWFya2Rvd24taXQtY29udGFpbmVyXCI7XHJcblxyXG4vLyBtYXJrZG93bi1pdFxyXG5jb25zdCBtYXJrZG93bkNvbmZpZyA9IChtZCwgdGhlbWVDb25maWcpID0+IHtcclxuICAvLyBcdTYzRDJcdTRFRjZcclxuICBtZC51c2UobWFya2Rvd25JdEF0dHJzKTtcclxuICBtZC51c2UodGFic01hcmtkb3duUGx1Z2luKTtcclxuICAvLyB0aW1lbGluZVxyXG4gIG1kLnVzZShjb250YWluZXIsIFwidGltZWxpbmVcIiwge1xyXG4gICAgdmFsaWRhdGU6IChwYXJhbXMpID0+IHBhcmFtcy50cmltKCkubWF0Y2goL150aW1lbGluZVxccysoLiopJC8pLFxyXG4gICAgcmVuZGVyOiAodG9rZW5zLCBpZHgpID0+IHtcclxuICAgICAgY29uc3QgbSA9IHRva2Vuc1tpZHhdLmluZm8udHJpbSgpLm1hdGNoKC9edGltZWxpbmVcXHMrKC4qKSQvKTtcclxuICAgICAgaWYgKHRva2Vuc1tpZHhdLm5lc3RpbmcgPT09IDEpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJ0aW1lbGluZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGltZWxpbmUtdGl0bGVcIj4ke21kLnV0aWxzLmVzY2FwZUh0bWwobVsxXSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lbGluZS1jb250ZW50XCI+YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCI8L2Rpdj48L2Rpdj5cXG5cIjtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxuICAvLyByYWRpb1xyXG4gIG1kLnVzZShjb250YWluZXIsIFwicmFkaW9cIiwge1xyXG4gICAgcmVuZGVyOiAodG9rZW5zLCBpZHgsIF9vcHRpb25zLCBlbnYpID0+IHtcclxuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaWR4XTtcclxuICAgICAgY29uc3QgY2hlY2sgPSB0b2tlbi5pbmZvLnRyaW0oKS5zbGljZShcInJhZGlvXCIubGVuZ3RoKS50cmltKCk7XHJcbiAgICAgIGlmICh0b2tlbi5uZXN0aW5nID09PSAxKSB7XHJcbiAgICAgICAgY29uc3QgaXNDaGVja2VkID0gbWQucmVuZGVySW5saW5lKGNoZWNrLCB7XHJcbiAgICAgICAgICByZWZlcmVuY2VzOiBlbnYucmVmZXJlbmNlcyxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJyYWRpb1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvLXBvaW50ICR7aXNDaGVja2VkfVwiIC8+YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCI8L2Rpdj5cIjtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxuICAvLyBidXR0b25cclxuICBtZC51c2UoY29udGFpbmVyLCBcImJ1dHRvblwiLCB7XHJcbiAgICByZW5kZXI6ICh0b2tlbnMsIGlkeCwgX29wdGlvbnMpID0+IHtcclxuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaWR4XTtcclxuICAgICAgY29uc3QgY2hlY2sgPSB0b2tlbi5pbmZvLnRyaW0oKS5zbGljZShcImJ1dHRvblwiLmxlbmd0aCkudHJpbSgpO1xyXG4gICAgICBpZiAodG9rZW4ubmVzdGluZyA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiBgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiAke2NoZWNrfVwiPmA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiPC9idXR0b24+XCI7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgLy8gY2FyZFxyXG4gIG1kLnVzZShjb250YWluZXIsIFwiY2FyZFwiLCB7XHJcbiAgICByZW5kZXI6ICh0b2tlbnMsIGlkeCwgX29wdGlvbnMpID0+IHtcclxuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaWR4XTtcclxuICAgICAgaWYgKHRva2VuLm5lc3RpbmcgPT09IDEpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJjYXJkXCI+YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCI8L2Rpdj5cIjtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxuICAvLyBcdTg4NjhcdTY4M0NcclxuICBtZC5yZW5kZXJlci5ydWxlcy50YWJsZV9vcGVuID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwidGFibGUtY29udGFpbmVyXCI+PHRhYmxlPic7XHJcbiAgfTtcclxuICBtZC5yZW5kZXJlci5ydWxlcy50YWJsZV9jbG9zZSA9ICgpID0+IHtcclxuICAgIHJldHVybiBcIjwvdGFibGU+PC9kaXY+XCI7XHJcbiAgfTtcclxuICAvLyBcdTU2RkVcdTcyNDdcclxuICBtZC5yZW5kZXJlci5ydWxlcy5pbWFnZSA9ICh0b2tlbnMsIGlkeCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaWR4XTtcclxuICAgIGNvbnN0IHNyYyA9IHRva2VuLmF0dHJzW3Rva2VuLmF0dHJJbmRleChcInNyY1wiKV1bMV07XHJcbiAgICBjb25zdCBhbHQgPSB0b2tlbi5jb250ZW50O1xyXG4gICAgaWYgKCF0aGVtZUNvbmZpZy5mYW5jeWJveC5lbmFibGUpIHtcclxuICAgICAgcmV0dXJuIGA8aW1nIHNyYz1cIiR7c3JjfVwiIGFsdD1cIiR7YWx0fVwiIGxvYWRpbmc9XCJsYXp5XCI+YDtcclxuICAgIH1cclxuICAgIHJldHVybiBgPGEgY2xhc3M9XCJpbWctZmFuY3lib3hcIiBocmVmPVwiJHtzcmN9XCIgZGF0YS1mYW5jeWJveD1cImdhbGxlcnlcIiBkYXRhLWNhcHRpb249XCIke2FsdH1cIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJwb3N0LWltZ1wiIHNyYz1cIiR7c3JjfVwiIGFsdD1cIiR7YWx0fVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicG9zdC1pbWctdGlwXCI+JHthbHR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvYT5gO1xyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYXJrZG93bkNvbmZpZztcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtUyxTQUFTLG9CQUFvQjs7O0FDQXFCLFNBQVMsMkJBQTJCO0FBQ3pYLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsWUFBWTtBQUNyQixPQUFPLFVBQVU7QUFPVixJQUFNLGdCQUFnQixPQUFPLFFBQVFBLGlCQUFnQjtBQUUxRCxRQUFNLFdBQVdBLGFBQVk7QUFDN0IsUUFBTSxXQUFXLFNBQVM7QUFFMUIsUUFBTSxPQUFPLElBQUksS0FBSztBQUFBLElBQ3BCLE9BQU8sU0FBUztBQUFBLElBQ2hCLGFBQWEsU0FBUztBQUFBLElBQ3RCLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUNWLFdBQVcsU0FBUyxPQUFPO0FBQUEsSUFDM0IsU0FBUyxTQUFTLE9BQU87QUFBQSxJQUN6QixXQUFXLCtCQUE0QixTQUFTLE9BQU8sSUFBSTtBQUFBLElBQzNELFNBQVMsb0JBQUksS0FBSztBQUFBLEVBQ3BCLENBQUM7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QUE7QUFBQSxJQUViLE1BQU07QUFBQTtBQUFBLElBRU4sTUFBTTtBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUE7QUFBQSxJQUVOLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSUEsT0FBTztBQUFBO0FBQUEsRUFFUCxVQUFVO0FBQUE7QUFBQSxFQUVWLFFBQVE7QUFBQTtBQUFBO0FBQUEsSUFHTixRQUFRO0FBQUE7QUFBQSxNQUVOLENBQUMsUUFBUSxFQUFFLEtBQUssUUFBUSxNQUFNLGVBQWUsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVk5QztBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFFQTtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFFQTtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQTtBQUFBLE1BRUEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxjQUFjLE1BQU0sMkJBQTJC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YUFBWSxTQUFTO0FBQUEsUUFDbEMsU0FBUztBQUFBLFFBQ1QsV0FBVztBQUFBLFFBQ1gsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbInRoZW1lQ29uZmlnIiwgInRoZW1lQ29uZmlnIiwgInBvc3REYXRhIiwgInBhdGgiLCAicGF0aCIsICJ0aGVtZUNvbmZpZyIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInRoZW1lQ29uZmlnIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiXQp9Cg==
