---
slug: a-shift-in-mindset
title: "A Shift in Mindset"
tags: [Personal, Devnotes, 100daysofcode]
date: 2024-03-19
hide_table_of_contents: true
---

# A Shift in Thinking

> Draft from November 2021. 
>
> "And that, I think, is the real shift in thinking:
> When you shift from being a learner to a problem-solver.*

![alt text](image.png)

I realized that once you've finished a course, learned the basics, and started working on actual projects, you rarely go back and re-watch an entire section of the course just because it happens to be related to whatever issue you're troubleshooting.

Instead, you usually do one of two things.

You either:

a. Go through your own notes or documentation to see if you've encountered the problem before, assuming you trust your documentation enough, or 

b. Take the much easier and quicker route and Google it, search Stack Overflow, or look for a similar use case on YouTube.

So I think structured courses are really useful during the **discovery stage**.

They introduce you to the technology, explain the terminology, show you how things are connected, and give you some idea of what you're actually dealing with.

But once you're trying to use that technology to solve your own problems, things become different.

At that point, instinct usually kicks in.

You Google the error and hope somebody has already asked the exact same question on Stack Overflow.

Or maybe someone uploaded a 12-minute YouTube video three years ago that somehow solves your exact problem.

Another thing I've noticed is that courses can become outdated pretty quickly, especially when technologies move at a really, really fast pace.

AWS Cloud computing examples come to mind (you can skip the list below if you don't care about the details):

1. One day, EC2 limits are described in terms of a fixed number of instances per region.
2. Later, the limits are based on the number of vCPUs you're allowed to run.
3. One day, ZooKeeper is an important piece of the architecture you're studying.
4. Later, newer versions of the technology start moving away from it entirely.

Sometimes the change is significant.

Sometimes it's just a button that moved somewhere else in the UI.

But when you add all those small changes together with everything else you're already trying to learn, they start becoming pretty significant.

One day, you might have several weeks to play around with this fascinating new technology you've just discovered.

Then tomorrow, someone tells you that you have two weeks to understand it and come up with a bare-minimum usable solution.

So yeah.

Things change pretty quickly.

I guess my point is that it took me almost four years, and honestly I'm still working on it, to shift away from the structured, college-style way of learning and adapt more to how knowledge is acquired in the actual industry.

When I say **college-style learning**, I mean the kind where you have a clear outline of what you're supposed to follow.

You start with the baby steps.

Maybe you fire up your first terminal.

Then you learn the commands.

Then the concepts get progressively harder.

Eventually, you reach the more complicated parts.

You usually know what you're trying to learn, what the problem is, and what you're expected to accomplish before moving on to the next lesson.

The actual industry doesn't always work like that.

Sometimes you're simply given a list of requirements.

And that's it.

Nobody gives you a neat list of all the technologies you need to learn beforehand.

It's up to you to figure out what tools you need.

Sometimes you aren't even given a clearly defined technical problem.

You have to figure out what questions need to be asked first.

Then you start searching for the answers.

I guess this falls under what people call **ill-defined problems**, where there isn't always one perfect or unique solution.

During my time at my previous job and now in my current one, I've learned a lot about how solutions are actually pieced together.

You might have help from a vendor.

You might have external professional services working with you.

You might have documentation, architects, engineers, and other teams involved.

But eventually you realize that solving problems isn't always as straightforward as it looks from the outside.

Some tasks suddenly become more important than others.

Something from the business side might come up halfway through the sprint.

A requirement changes.

A deadline moves.

A dependency suddenly appears.

And now you have to rethink which of the ten questions sitting in front of you actually needs to be answered first.

So the industry's way of learning can get pretty messy.

You search for whatever you need at that moment.

You try it immediately in your test environment.

If it works, great.

Maybe you start incorporating it piece by piece into your code or configuration.

Then you test it again.

Check the logs.

Run your unit tests.

Run OAT or whatever other validation process you have.

If everything looks good and nothing starts screaming in the logs, maybe it eventually finds its way into production.

Oh, and here's the fun part:

You need to have all of this done in four sprints or less.

No pressure.

Now, situations like this *can* introduce what we call **technical debt**.

This usually happens when you choose a quicker or easier solution today, knowing that you'll probably have to revisit or improve it later.

Is technical debt bad?

Yes.

No.

I don't know.

I guess the real answer is: **It depends**.

Sometimes you simply can't make something perfect.

Your solution might depend on a platform managed by another team.

A new version might change how your code behaves.

Another system could be updated.

Requirements could change again.

There will always be factors outside your control.

And sometimes getting a working solution out there lets you learn something that you would've never discovered by spending another month trying to make everything perfect.

The faster something fails in a controlled environment, the faster you can understand why it failed and improve it.

So in a strange way, we're constantly trying to find ways to break things safely so we can figure out how to make them better.


## Wait. Where was I?

Oh, right.

A shift in thinking.

I guess I've spent all this time trying to explain how structured learning differs from learning when you're already trying to solve a real problem.

## So, should I stop taking courses and just focus on projects?

No.

If something is completely new to you, you still need some sort of foundation.

And that's what courses are really good at.

They give you the basic tools that you *might* need later.

They show you what's possible.

They introduce you to the terminology.

They give you enough knowledge to at least know what to search for when everything eventually breaks.

Then, somewhere along the way, you start using those tools to answer your own questions.

Sometimes you'll keep using them.

Sometimes you'll realize that the tool you learned isn't actually the best one for the problem sitting in front of you.

So you drop it and learn another one.

And that's fine.

## I am still confused

Well, you're not alone.

I still haven't figured all of this out either.

I still have a ridiculous number of courses sitting on my laptop that I haven't finished yet.

And since time is a limited commodity, I've slowly developed my own strategy for learning things and actually applying them.

If my goal is to take a certification exam, I usually go through the course, do the labs, write down notes, and then prepare using practice exams.

Once I pass the exam?

I delete the course.

Yep.

No hesitation.

At that point, I know I'm probably not going to sit down and re-watch the whole thing again.

If I eventually need to use the technology for a project and I run into an issue, chances are I'll just search for the exact problem anyway.

And honestly, I like it better that way.

Instead of going back through hours of videos, I can search for exactly what I need.

Kind of like picking apples.

You grab the ones you need and leave the rest of the tree alone.

The important part is that during the discovery and review stage, I used the course to build some sort of foundation.

I learned enough to know the terminology.

I learned enough to understand the basic concepts.

And hopefully, I learned enough to recognize what I don't know.

Then comes the application stage.

That's when I start relying more on my own tools.

My notes.

Documentation.

Experiments.

And, of course, my **Google-fu**.

Currently, I'm preparing to take the RHCSA next year.

So by then, I'm expecting most of the RHEL-related courses sitting on my hard drive to be completely gone.

By deleting them, I'm also forcing myself to think on my own instead of constantly going back and copying the exact steps an instructor followed.

If I want to remember how I did a lab, I check my notes.

If it's not in my notes, there's a good chance it's somewhere in the official documentation.

And if it's not there?

Well.

Google probably knows somebody who knows.

## Okay, I think I got it.

If you did, then you're probably already one step ahead of me.

Again, I don't have all the answers.

Half the time, I don't even know what the right questions are yet.

But I expect to figure out more as I keep going.

I'll do more labs.

I'll break more code.

I'll tail more logs.

I'll try solutions that don't work.

I'll eventually find ones that do.

Then I'll document what happened so maybe I don't have to suffer through the exact same problem twice.

And somewhere along that process, something changes.

You stop just asking: **"What should I learn next?"**

And you start asking: **"What do I need to solve this?"**

That, I think, is the real shift in thinking.

When you shift from being a **learner** to being a **problem-solver**.

And maybe, after you've solved enough problems, you eventually move into another kind of learning altogether:

Passing what you've learned on to someone else.
