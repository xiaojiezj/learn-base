module.exports = {
  title: "学习笔记",
  description: "每天学一点，进步一小步",
  themeConfig: {
    navbar: true,
    sidebar: [
      {
        title: "html", // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: []
      },
      {
        title: "css", // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: []
      },
      {
        title: "js", // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: ["js-learn/手写js源码.md", "js-learn/对象循环遍历汇总.md"]
      },
      {
        title: "ts", // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: []
      }
    ]
  },
  port: 9000
};
