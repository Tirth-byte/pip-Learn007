---
title: "Phase 1: Plan the Finance System"
phase: "01"
estimated_time: "1–1.5 hours"
prerequisites: "Starting Manual complete"
---

## 1. You Are Ready

You have studied the fundamentals of Python. You know how to run a program from the terminal. You know how to store data in variables, make decisions with conditionals, repeat work with loops, organize data with lists and dictionaries, and write functions. You know how to read a traceback, investigate a bug using evidence, and read documentation.

You are now transitioning from studying syntax to building a substantial software project. 

You are going to build **Terminal Ledger**: a terminal-based personal finance manager. It is a program designed to keep track of personal financial activity and make that information useful to the person running it.

However, before you write any application logic, you must answer a question that cannot be solved by programming syntax:

*What should this program actually do?*

As you learned in the Starting Manual, software is defined by its behavior, not by its file count. The goal of this first phase is to establish exactly what behavior your program must support, who it is for, and what your very first, thinnest implementation milestone will be. 

Phase 1 requires zero new Python concepts. You will not write the application logic today. Your task is to plan the work, so that when you do open a code editor, you know exactly what you are trying to achieve.

## 2. Behavior vs. Implementation

A common mistake when starting a project is opening an editor and immediately typing code before the intended behavior is clear. They ask, "Should I use a list or a dictionary?" before asking, "What does the user need to do?"

Implementation serves behavior. 

You are not being asked, *How should I code Terminal Ledger?* 
You are being asked, *What should Terminal Ledger actually do?*

Your goal is to define the product. If the program works perfectly, what happens? 

## 3. Discovering Behaviors

A software program solves a problem by performing behaviors. A behavior is a concrete action the program can perform. It is not a vague category like "handle finances." It is a specific event, usually described with an active verb.

Consider an unrelated piece of software: a terminal-based reading tracker. What behaviors does a reading tracker need?
- **Vague:** "Manage my books."
- **Behavior:** "Allow a user to record that they have started reading a new book."
- **Behavior:** "Allow a user to view a list of all books they have finished reading."

These are behaviors. They describe what happens from the user's perspective. They do not dictate how the code is written. 

Take a moment to imagine the personal finance manager you are about to build. What concrete actions should a user be able to perform? Write down 5 to 8 behaviors that Terminal Ledger should eventually support. 

Do not worry about how you will program them. Do not write pseudocode. Focus entirely on what the program must do to be useful.

## 4. Information Discovery

Once you know what a program must do, you can determine what information it needs to do it.

If a behavior occurred in real life, what information would you need to write it down? 

In our unrelated reading tracker example, if the behavior is "Record a new book," what facts matter? 
- The title of the book.
- The author.
- The date you started reading it.
- The total number of pages.

You must decide what information a useful financial transaction needs. There is no single correct answer provided for you. The fields you choose depend entirely on the behaviors you want to support. 

If one of your behaviors is "View a summary of spending grouped by the reason for the purchase," then your transaction information must include a way to capture that reason. 

Do not write code or create dictionaries for this yet. Simply list the pieces of information your program will likely need to collect when a user records a financial event. 

Understand that your first decision may change later. You may realize later that you need to track something you didn't anticipate today. That is normal engineering. You are making your best decision for right now based on the behaviors you listed.

## 5. Defining Observable Results

A behavior is only real if you can observe it succeeding. "It works" is not an observable result. You must define exactly how you will know a behavior has succeeded.

Returning to the reading tracker example:
*Behavior:* Add a book to the reading tracker.
*Weak result:* The program doesn't crash.
*Observable result:* The program prints a confirmation message, and the new book's title can be seen immediately when the user asks to view the current reading list.

If the book cannot be seen, the behavior is broken, even if the program didn't crash.

For every behavior you listed for Terminal Ledger, define the observable result. What exactly will you see on the screen that proves the behavior succeeded?

## 6. Reducing Scope

You have listed the behaviors your final program should support. Trying to build all of them at once makes the project harder to reason about and debug. 

You must separate your ideas into three categories:
1. **Important Now:** The absolute minimum behavior required to prove the core concept works.
2. **Useful Later:** Features that add value but are not required for the core concept to function.
3. **Deliberately Deferred:** Features you explicitly decide not to build right now, to keep the project manageable.

You need to guide your project toward a thin first version. The thin version should prove ONE meaningful behavioral path. It should not be the entire application.

For example, does every useful feature need to exist in the first version? No. You can deliberately defer certain behaviors. If you build a massive menu system before you can even record a single piece of information, you have built architecture without a foundation.

Identify at least three features or behaviors that you are explicitly choosing not to build right now. Give a one-line reason for each.

## 7. The First Implementation Milestone

By the end of this planning exercise, you must define your first implementation milestone. 

This milestone is exactly what you will build when you begin Phase 2. It must be:
- **Small:** It should focus on just one or two core behaviors from your "Important Now" list.
- **Observable:** You must be able to run the program and see the result with your own eyes.
- **Meaningful:** It should prove a core piece of the logic, not just print a welcome message.
- **In-Memory:** It must be entirely possible using the Python you already know. 

For this milestone, the program only needs to keep information during the current run. Preserving information between runs is deliberately outside this phase. 

Choose the smallest meaningful behavior you can build entirely in memory. This is your target.

## 8. Unknown Knowledge

While planning, you will inevitably realize there are things you do not know how to do. 

You might think, "I know I need to save my ledger so the data doesn't disappear when I close the terminal, but I have no idea how to do that in Python."

That is an excellent realization. It is perfectly okay to write down: "I don't know how to preserve data." 

Do not try to solve that problem right now. Do not go searching for advanced tutorials. Some unknowns will become relevant later, when the project gives you a concrete reason to learn them. For now, simply record the unknowns so you recognize them when the time comes.

## 9. The Problem Journal

Throughout this project, you will encounter bugs that resist a simple fix. You will experience moments where your code behaves in a way you did not expect, and you will have to pause to figure out why.

When this happens, you will use a **Problem Journal**. This is a lightweight engineering notebook for recording problems worth remembering. It is a tool to improve your own debugging process.

You do not need to record every typo, missing colon, or syntax error. Use the journal when a bug forces you to pause, investigate, and change your mental model of what the code is doing.

When you make a journal entry, use these exact six fields:
1. **Expectation:** The behavior you were trying to produce.
2. **Observation:** What actually happened (the exact error message or output).
3. **Cause:** What was really going on, once you verified it.
4. **Evidence used:** The prints, type checks, or experiments that proved the cause.
5. **Fix:** The single change that resolved it.
6. **Lesson for next time:** The check you will run first when you see this pattern again.

You do not need to write a Problem Journal entry during Phase 1 unless you encounter a meaningful reasoning problem while planning. 

## 10. The Escalation Model for Help

You will get stuck during this project. Getting stuck is a normal part of learning to build software. When you hit a wall, do not immediately ask for a complete solution. Use the following escalation path:

1. **Reason First:** Think about what you expect the program to do versus what it is actually doing.
2. **Inspect Evidence:** Run your code, read the traceback carefully, use `print()` to check values and types. 
3. **Consult Documentation:** Review the materials and documentation relevant to the current phase.
4. **Experiment:** Test your assumptions in a separate, small scratch file before changing your main project code.
5. **Ask for Direction:** If you are still stuck, ask for a directional hint. Describe your expectation and observation, and ask for a push in the right direction.
6. **Escalate:** Only when you are genuinely stuck after trying all of the above should you ask for a concrete pattern to study. It is preferable to study patterns in an unrelated domain rather than solving the project directly.

Asking for help is normal and expected, but immediately asking for finished code can skip much of the diagnosis and decision-making you are trying to practice.

## 11. The Terminal Ledger Project Launch Sheet

Your deliverable for Phase 1 is a short written document. You will adapt the Project Launch Sheet thinking you learned about in the Starting Manual to this specific project.

Create a document (e.g., on paper or in a markdown file) and fill out the following sections in your own words. Do not write code.

### Purpose
What problem should Terminal Ledger help solve?

### User
Who are you imagining using it?

### Core Behaviors
What should the program eventually be able to do? List 5 to 8 concrete actions.

### Information Needed
What information might those behaviors require? What facts must the program collect?

### Observable Results
How will you know each important behavior works? What will you see?

### First Milestone
What is the smallest meaningful behavior you will build first? Describe what the user will do and what the program will show.

### Known Tools
Which Python fundamentals do you already know that may help you build the first milestone?

### Unknowns
What do you suspect you will need to learn later to complete the core behaviors?

### Deliberately Deferred
What are you explicitly NOT building yet? List at least three features you are choosing to delay.

### Debugging Plan
When your first implementation fails, what evidence will you inspect?

### Help Plan
What will you try before asking for a direct solution?

## 12. Completion Gate

You have not planned every detail of the project, and you do not need to. You have simply planned enough to take the first concrete step.

Phase 1 is complete when your Project Launch Sheet contains answers for all the fields listed above. You do not need code, files, or perfect requirements. You need a clear, actionable plan for your first in-memory milestone.

When your Launch Sheet is complete, you are ready to begin implementation.

**Next:** Phase 2 — Transactions in Memory
