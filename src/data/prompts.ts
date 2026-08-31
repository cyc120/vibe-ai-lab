export type PromptQuestion = {
  title: string
  task: string
  answers: readonly [string, string]
  correct: 0 | 1
  lesson: string
}

export const promptQuestions: readonly PromptQuestion[] = [
  {
    title: 'MISSION 01 / MAKE A SITE',
    task: '让 AI 帮你做一个个人网站。',
    answers: [
      '帮我做一个网站。',
      '帮我创建一个面向大学生的作品集网站。暗色科技风，包含个人简介、项目经历和联系方式；移动端适配，并告诉我如何本地运行。',
    ],
    correct: 1,
    lesson: '好的 Prompt 不一定更长，但目标、上下文和约束都更明确。',
  },
  {
    title: 'MISSION 02 / DEBUG IT',
    task: '一个登录按钮点击后没有反应。',
    answers: [
      '检查登录按钮为什么没反应。',
      '这是 React + TypeScript 项目。登录按钮的 onClick 没有触发，请先定位原因，再给出最小修改方案和验证步骤。',
    ],
    correct: 1,
    lesson: '给 AI 足够的运行环境和预期结果，它才能更快进入正确的问题空间。',
  },
  {
    title: 'MISSION 03 / SEND AN AGENT',
    task: '让 Agent 整理本周 AI 新闻。',
    answers: [
      '找一下 AI 新闻。',
      '搜索本周 5 条重要 AI 新闻，优先官方来源。按“发生了什么 / 为什么值得关注 / 原始链接”输出，并去除重复报道。',
    ],
    correct: 1,
    lesson: '目标、信息源、输出格式和判断标准，会让 Agent 的行动更可靠。',
  },
]
