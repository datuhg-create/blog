# AI Agent 实战入门

所谓 AI Agent，就是让 AI 能"自己做事"，不只是回答问题 🤖

## 核心组件

```
用户输入 → 大模型 → 规划 → 工具调用 → 执行 → 反馈 → 大模型 → 输出
```

## 简单实现

```python
# 伪代码：LangChain Agent
from langchain.agents import load_tools, initialize_agent
from langchain.llms import OpenAI

llm = OpenAI(temperature=0)
tools = load_tools(["serpapi", "python_repl"])

agent = initialize_agent(tools, llm, agent_type="zero-shot-react-description")

# 让 Agent 自己调用工具完成任务
result = agent.run("帮我查一下今天北京的天气，并转换成摄氏度")
```

## Agent 关键能力

1. **规划 (Planning)**：把大问题拆成小步骤
2. **工具调用 (Tool Use)**：调用搜索引擎、计算器、API 等
3. **记忆 (Memory)**：记住之前的对话上下文
4. **反思 (Reflection)**：执行完后检查结果

## 主流框架

- **LangChain** - 最火，文档全
- **AutoGPT** - 全自动执行
- **BabyAGI** - 简洁，适合学习
- **LlamaIndex** - 知识库 + Agent

## 应用场景

- 私人助理
- 自动化工作流
- 代码审查助手
- 数据分析

> 门槛不高，建议从 LangChain 文档入门 🚀