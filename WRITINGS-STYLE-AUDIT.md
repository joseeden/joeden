# Writings style audit

Rechecked on 2026-09-25 using the updated [writings-checker-if-ai](prompts/skills/writings-checker-if-ai/SKILL.md). This report supersedes the first audit.

All 71 Markdown and MDX files under `writings/` were reread against the stricter criteria. The collection has 63 prose articles, six Docusaurus samples, and two sketch captions. This report contains findings and proposed replacement prose; the articles have not been edited.

Skill SHA-256: `771FD468BAB970D40205C3933604E8891F7103BB1217E21C6A2268C71F24A8C5`.

| Verdict    | First audit | Strict recheck |
| ---------- | ----------- | -------------- |
| Revise     | 28          | 48             |
| Light edit | 24          | 13             |
| Keep       | 11          | 2              |
| Sample     | 6           | 6              |
| Caption    | 2           | 2              |
| Total      | 71          | 71             |

**Note**: These are editorial judgments about observable phrasing, not proof of AI authorship. The skill's “~90% human” target is a tone preference, not a measurable probability.

## What changed

The updated skill explicitly targets symmetrical sentence sequences, safe endings, and overly balanced contrasts. A specific anecdote or an honest criticism no longer earns the surrounding prose a pass. The suggested replacements were also reassessed for those patterns.

Nine previous Keep verdicts changed. Blind Willow, Sleeping Woman and How to Win Friends and Influence People now need substantial revision. A Heartbreaking Work of Staggering Genius, Fail Fast, Fail Often, The Marshmallow Test, The War of the Worlds, The Happiness Track, Day 1, and Killing a defunct process need local edits.

Only **Thinking like a Developer** and **Atomic Habits** retain Keep verdicts. The former uses procedural lists, while the latter is predominantly a short reading update and quotations. The samples and captions remain separately classified; they are not eight additional prose articles that passed.

## Main findings

- Repeated openings such as “Some,” “Maybe,” “Before,” and “You” often arrange thoughts into a predictable rhythm even when the individual sentences sound casual.
- Paired reversals such as “not my favorite / but memorable” repeatedly soften opinions. Several earlier passes relied too heavily on the presence of a mixed verdict.
- “Part of the charm,” “maybe that's the point,” and similar endings turn unresolved reactions into safe praise.
- Long personal accounts contain concrete events worth keeping, but some surrounding paragraphs use repeated lists and generalized explanations to direct the reader's reaction.
- Profanity and deliberate fragments do not make a passage less formulaic by themselves. Adding either mechanically would recreate the problem.

## How to use this report

**Revise** means a substantial passage or several recurring patterns need reworking. **Light edit** means bounded passages can change while most of the article stays. **Keep** means no revision is warranted under this style check. **Sample** and **Caption** identify material that cannot usefully be judged as a personal narrative.

Replacement text is a proposed draft, not a claim about what the author must have felt. It stays within the existing opinions and events rather than inventing anecdotes. Preserve frontmatter, titles, book numbers, images, links, and attributed quotations unless an entry explicitly identifies a change. Proposed passages appear as blockquotes for review; they would become ordinary prose if applied.

Useful procedural lists, book concepts presented as lists, and attributed quotations are assessed differently from manufactured narrative cadence. This audit does not verify quotations, book facts, technical advice, or external links.

## File-by-file findings and suggested revisions

### 01. [First Blog Post](writings/2017-05-28-first-blog-post.md)

**Sample.** Lorem ipsum and empty section scaffolding. This is placeholder content, not evidence of a synthetic personal voice. No rewrite proposed.

### 02. [Long Blog Post](writings/2017-05-29-long-blog-post.md)

**Sample.** Repeated lorem ipsum demonstrates post truncation. No personal narrative to assess. No rewrite proposed.

### 03. [Welcome](writings/2017-08-26-welcome/index.md)

**Sample.** Docusaurus setup instructions with sample authors and imagery. Its instructional voice is appropriate to its purpose. No rewrite proposed.

### 04. [MDX Blog Post](writings/2018-08-01-mdx-blog-post.mdx)

**Sample.** MDX and React demonstration. Preserve the code and admonition; no personal-voice rewrite proposed.

### 05. [Ready Player One](writings/2019-01-28-libro-ready-player-one/index.md)

**Revise.** The standalone “Work / Entertainment / Friendships” list builds toward “already practicing for it.” “One thought worth pondering” then announces the intended profundity. The review's complaint about the thin plot gets buried.

Replace the commentary after the image with:

> The main plot felt thin. You could probably squeeze it into one episode of a sci-fi series.
>
> I had more fun with the old games and movie references. The arcade stuff and RPGs did a lot of the work here, honestly.
>
> I'll watch the film too. There's already a queue of books and movies waiting, so we'll see when that happens.
>
> The OASIS is a little uncomfortable to think about when so much of my day already happens through a screen.

### 06. [Dance, Dance, Dance](writings/2019-01-30-libro-dance-dance-dance/index.md)

**Revise.** Casual wording does not undo the structure: disappearing relationships lead to “Things just happen,” then “One foot in front of the other,” and finally the title as a lesson. The earlier light edit left most of that machinery intact.

Replace the commentary after the image with:

> Dansu, dansu, dansu.
>
> Still trying to process this one. People disappear from his life, and I kept wanting an explanation that wasn't coming.
>
> I like the dreamlike feeling, but it's frustrating too. Half the time I don't know where Murakami is taking me.
>
> I took the dancing as a way of continuing through all that. Not sure I've worked out much else yet.

### 07. [The Wind-Up Bird Chronicle](writings/2019-02-05-libro-windup-bird-chronicle/index.md)

**Revise.** “Maybe they are / Maybe they aren't” is a balanced hedge. The maze metaphor and the lingering-afterward ending turn confusion into a safely positive verdict. Flag both, not just the last paragraph.

Replace the commentary after the image with:

> **Where the hell is this story actually going?**
>
> That was me around the middle. It starts out grounded enough, then the histories and dreams pile up until I'm no longer sure which bits are supposed to connect.
>
> I kept wondering whether some of these characters turn up in his other books. They felt like they had whole stories happening somewhere else.
>
> I still can't explain how all of this fits together. It's a lot.

### 08. [Norwegian Wood](writings/2019-02-08-libro-norwegian-wood/index.md)

**Revise.** “Some explanation / Some lesson” is followed by generic acceptance language. The final “I think / Or at least, I think” also manufactures a small, harmless uncertainty.

Replace the commentary after the image with:

> The loss and loneliness got to me more than the romance. I kept wanting a reason for what happened to these people, which probably wasn't helping.
>
> Sad read. I was still trying to understand parts of it when it ended.
>
> Apparently there's a Japanese film adaptation too. This is my third Murakami book, and I'm starting to recognize the way he writes.

### 09. [The Elephant Vanishes](writings/2019-02-11-libro-elephant-vanishes/index.md)

**Revise.** The life analogy is announced early, then restated through “You” and “The” lists. “Separate pieces / Part of the whole” is an especially tidy closing contrast.

Replace the commentary after the image with:

> Damn. Some of these stories didn't do much for me until I was nearly finished with the collection.
>
> I'd written off a few parts as irrelevant, then found myself thinking about them again later. Still don't know how to explain that properly.
>
> There's also dancing with dwarfs and someone banging on a window. You'll have to read it for that one.
>
> Took me a while to appreciate this book.

### 10. [Blind Willow, Sleeping Woman](writings/2019-02-13-libro-blind-willow-sleeping-woman/index.md)

**Revise. Previously Keep.** “Some stories left me thinking / Some left me confused / And some just ended” is the exact metronomic structure the updated skill targets. “But I guess that's part of the charm” resolves the confusion into automatic praise. The earlier pass was too lenient.

Replace the commentary after the image with:

> I kept getting used to a story and then it would end. A few left me confused enough that I wasn't even sure what reaction I was supposed to have.
>
> There's a lot of ordinary life in here, until something gets weird and I'm lost again. By the next story we're somewhere else entirely.
>
> **Ganbatte, Murakami-san!**

### 11. [A Wild Sheep Chase](writings/2019-02-18-libro-a-wild-sheep-chase/index.md)

**Revise.** The extended “book ends / wake up / details fade” sequence arranges the response into a miniature poem. “Part of the charm” supplies approval after the narrator has admitted not understanding it.

Replace the commentary after the image with:

> A nameless guy looking for something almost mythical, with strange people turning up along the way. I kept following because I wanted to know where it was going.
>
> Finishing it felt like waking up from a dream and trying to explain it to someone. I remembered the details, but putting them together was another matter.
>
> **What the hell was that all about?**

### 12. [Kafka on the Shore](writings/2019-02-22-libro-kafka-on-the-shore/index.md)

**Revise.** “Not because everything was explained, but because it wasn't” balances the frustration into praise. “Maybe that's the point” and “Some stories end / Some just stop” then package ambiguity as wisdom.

Replace the commentary after the image with:

> Damn. Such an inconclusive ending.
>
> I kept waiting for the strange events to connect. We get talking cats and dreams, and then suddenly I'm at the end wondering what I missed.
>
> **Whatever happened to Hoshino after the cat answered him?**
>
> That's the bit I'm stuck on. Did something change for him? I wanted more after that scene, and the ending annoyed me.

### 13. [After the Quake](writings/2019-02-23-libro-after-the-quake/index.md)

**Revise.** The cat joke has an individual voice. The later “real life” pivot, disconnected-life fragments, and ship metaphor are a separate motivational ending. “Frustrating / interesting” also softens the criticism automatically.

Keep the observations list and the paragraph beginning “There isn't always a captivating plot.” Replace from “And yes, that can be frustrating” through the end with:

> It is frustrating. I still want answers to some of those things.
>
> I've gone through enough Murakami for now, even with a few books left that I haven't downloaded or listened to. Time to read someone else.

### 14. [The Life-Changing Magic of Tidying Up](writings/2019-02-27-libro-llife-changing-magic-of-tidying-up/index.md)

**Revise.** The numbered notes have a purpose, but “drawers / shelves / storage boxes” and the isolated instructions add artificial beats. The ending gives the same keep/discard lesson several increasingly sentimental finishes.

Keep the introduction. Replace from “A few takeaways” through the end with:

> Notes I wanted to keep:
>
> - Gather things by category. Seeing all the books or clothes together makes the amount harder to ignore.
> - Decide what goes before buying storage for it. Another box can just hide the problem.
> - Set aside time for the sorting. Moving the same things around every day sounds exhausting.
> - Think about how you want to use the room before deciding where everything belongs.
> - Pay attention to why you're cleaning. A tidy room won't necessarily fix whatever else is bothering you.
>
> I could see some overlap with Lean thinking, especially the part about waste. The storage point was useful. Buying a box is an easier decision than sorting through what's going into it.
>
> Great read. I get the fuss around Kondo now.

### 15. [The Year of Magical Thinking](writings/2019-02-28-libro-year-of-magical-thinking/index.md)

**Revise.** “There really wasn't” is an honest disappointment. The following courage paragraph supplies consolation anyway, then “Cry / Accept / Move forward” presents grief as three clean steps.

Replace the commentary after the image with:

> Damn. Such a depressing read.
>
> I kept hoping there would be a silver lining on the last page. There wasn't, and I don't know why I expected one after everything I'd just read.
>
> I admire the courage it took to write this. Still a hard book to finish.

### 16. [A Heartbreaking Work of Staggering Genius](writings/2019-03-06-libro-a-heartbreaking-work-of-staggering-genius/index.md)

**Light edit. Previously Keep.** “Some people will love / Others will hate” is a stock balanced contrast. “Not my favorite / But definitely memorable” supplies another safe middle verdict. The detailed description of Eggers interrupting his own narrative is worth retaining.

Delete the two paragraphs beginning “Some people” and “Others.” Replace from “It can get messy” through the end with:

> The interruptions wore me out. There was plenty to think about, especially the grief and responsibility, but I didn't always enjoy getting through it.
>
> Not my favorite Eggers read. I still want to try more of his work.

### 17. [The Charisma Myth](writings/2019-03-07-libro-the-charisma-myth/index.md)

**Revise.** “The way” repeats three times, followed by paired “You don't” reassurance. “Fresh mind / Fresh perspective” is a manufactured reset. The opening also resembles Talk Like TED.

Replace the commentary after the image with:

> I liked the idea that charisma is something you can practice. Paying attention to how you listen seems more manageable than trying to become a different person.
>
> The emphasis on presence and warmth interested me. You don't have to be the loudest person there, which is a relief.
>
> If you like Dale Carnegie, this covers some familiar ground. I'm back to business and self-development books after a stretch of fiction.

### 18. [MDX Blog with Long Title](writings/2019-03-17-mdx-blog-with-long-title.mdx)

**Sample.** Another MDX demonstration. Its repeated wording is sample reuse, not a reason to rewrite it as a personal entry.

### 19. [Talk Like TED](writings/2019-03-18-libro-talk-like-ted/index.md)

**Revise.** The audience-category opener resembles The Charisma Myth. “The structure / The emotion / The stories” and a later command ladder lead into a balanced “isn't only about / it's about” ending. That makes the review sound like the presentation it is describing.

Replace the commentary after the image with:

> I liked seeing why some TED Talks are easier to follow than others. Delivery is only part of it; the structure and the stories do a lot of the work.
>
> The useful part was looking at why a talk connects with people instead of trying to copy the speaker.
>
> There's plenty here about making an idea understandable. I can see myself using that more than any particular speaking style.

### 20. [Another MDX Blog with Long Title](writings/2019-03-18-mdx-blog-another-blog-with-long-title.mdx)

**Sample.** Explicitly tests title truncation and MDX rendering. No personal-voice revision proposed.

### 21. [The Black Box of Thinking](writings/2019-03-31-libro-black-box-of-thinking/index.md)

**Revise.** The three takeaways are legitimate notes, but the iceberg/mountain image is inflated. “Go out / Test / Be wrong” leads to a certainty payoff that feels written for applause.

Keep the existing final Levenson quotation and attribution. Replace the commentary before it with:

> Three notes I managed to write down while listening:
>
> - My first explanation could be wrong, however convincing it sounds in my head.
> - Worrying about messing up can stop me from trying anything.
> - The finished result doesn't show all the attempts that failed.
>
> There were more ideas in the case studies. These are just the ones I got down halfway through. Haha.
>
> I liked the emphasis on testing an idea instead of arguing for it from an armchair. And I don't need to repeat every mistake myself to learn something from it.

### 22. [The Storyteller's Secret](writings/2019-04-04-libro-storyteller-secret/index.md)

**Revise.** Three “They remember” lines, three story-shape fragments, and three “Share” commands make the review read like a demonstration speech. The final pay-it-forward message adds another neat moral.

Keep the opening quotation, including its continuation after the image. Replace from “What I liked about this one” through the end with:

> The bit about giving people a reason to care made sense to me. I can explain something clearly and still lose the person listening.
>
> I liked the attention to the person telling the story, including what went wrong for them. That's probably worth including when I share something I've learned.
>
> **Inform. Illuminate. Inspire.** was a neat line, though the examples were more useful to think about.

### 23. [Fail Fast, Fail Often](writings/2019-04-05-libro-fail-fast-fail-often/index.md)

**Light edit. Previously Keep.** A mixed opinion does not exempt the “Try / Experiment / Be willing” command ladder. “Not bad / Not particularly memorable” and “good reminders hidden between the pages” cushion the dismissal.

Replace from “Try things” through “You learn more from actually doing the thing” with:

> I liked the push to try something before feeling ready. But the book kept wandering into other self-development advice when I wanted more about failure itself.

Replace from “So yeah” through the end with:

> I got a few useful ideas out of it. I also kept thinking they'd work better as separate blog posts.

### 24. [Option B](writings/2019-04-07-libro-option-b/index.md)

**Revise.** The grief fragments, “Sometimes support” contrast, and closing empty-space metaphor impose a smooth emotional arc. The relationship and financial notes can remain without the speech around them.

Replace from “The loss of a loved one” up to “Ayt” with:

> I kept thinking about the partner who's left behind, including the practical things they still have to deal with.
>
> The relationship advice gave me a few things to think about. Relying on each other is normal, but I can see the value in both people keeping their own skills and confidence. Helping doesn't always have to mean taking over.
>
> The insurance discussion was more practical than I expected from a book about grief. There are expenses to handle while the family is already dealing with the loss.
>
> I don't have a neat takeaway from all of that.

Keep the reading-target update after “Ayt.” Delete “Come rain or shine,” which adds a motivational flourish after the concrete update.

### 25. [Made to Stick](writings/2019-04-11-libro-made-to-stick/index.md)

**Revise.** The review repeats the quoted framework as a command ladder. “Conception to actual lift-off” turns the ending into promotional copy. The ironic admission that other books stuck more is its best individual detail.

Replace the commentary after the image with:

> A useful framework, although I can think of other books that stuck with me more than this one. Which is a little funny.
>
> I can see the value in checking whether an idea is concrete and believable before trying to explain it. There's more to presenting it than just understanding it myself.
>
> I'd probably return to the framework before rereading the whole book.

### 26. [Daring Greatly](writings/2019-05-05-libro-daring-greatly/index.md)

**Revise.** The “You might” ladder and “at least you were there” repeat the arena quotation as a speech. A quotation can stay polished; the commentary need not echo its rhythm.

Replace from “I think that quote” up to “As for the reading challenge” with:

> That quote says most of what I liked about the book. Trying something means risking embarrassment, and I liked that Brown spends time on how uncomfortable that is.
>
> I agree with the point about vulnerability. Knowing that doesn't suddenly make criticism easy to take.

Keep the reading update, joining “Still a long way to go” to its following sentence rather than giving the pair a closing-poem layout.

### 27. [The Smartest Kids in the World](writings/2019-05-09-libro-the-smartest-kids-in-the-world/index.md)

**Revise.** The paired teacher/parent questions and “Schools / Teachers / all matter” construct a speech. The three “Different” lines then lead into an audience-facing lesson. The home-learning claim is presented more absolutely than the surrounding personal reaction.

Keep the quotation, including the continuation below the image. Replace from “For educators and teachers” through the end with:

> I was interested in how differently these education systems challenge students, especially when the work gets difficult.
>
> It made me think about home too. How do parents handle a mistake or a question? That seems relevant long before the kid gets to school.
>
> I wouldn't use this as a complete guide to education. I liked getting a look at what students elsewhere are expected to do.

### 28. [The Time Machine](writings/2019-05-10-libro-the-time-machine/index.md)

**Revise.** Almost all the commentary becomes generic advice. The “A person / A situation / A failure” ladder and “Find them / Learn from them” ending contain little reading-specific response.

Replace the commentary after the image with:

> I took “observe and learn” from this one. An explanation can look convincing until another detail turns up and makes it harder to believe.
>
> I liked that uncertainty. I don't have much more in my notes than that, honestly.

### 29. [The Happiness Equation](writings/2019-05-20-libro-the-happiness-equation/index.md)

**Revise.** The life-stage ladder, retirement contrast, and final ikigai question create several successive epiphanies. “Giving yourself permission” adds coaching language.

Keep the quotation through “An **ikigai**.” Replace the commentary that follows with:

> A reason to get up in the morning. I like that better than having to settle on one purpose for the rest of my life.
>
> The retirement discussion interested me. We spend a lot of time thinking about when we can stop working. What would I actually want to do all day afterward?
>
> I liked that the answer could change. It might be work now and some other project later. I'm still thinking about that part.

### 30. [The Marshmallow Test](writings/2019-05-23-libro-marshmallow-test/index.md)

**Light edit. Previously Keep.** The two “How much” questions set up a polished overview. “There are definitely some useful insights / That said” is a stock praise-then-criticism transition. The actual frustration is stronger.

Replace the commentary after the image with:

> Interesting idea, but the psychobabble made this a struggle to finish.
>
> I wanted to know more about how self-control develops and how much it can change. At several points I was just thinking, okay, I get it. Can we move on?
>
> I'd still pick Charles Duhigg's *The Power of Habit* for this sort of read.

### 31. [The Little Prince](writings/2019-06-02-libro-the-little-prince/index.md)

**Revise.** “Such a simple story, yet” opens on a balanced contrast. The ending turns childhood into a clean “isn't about / maybe it's about” lesson.

Replace the commentary after the image with:

> I liked this one. It's simple enough to look like a children's book, but the adults worrying about numbers and responsibilities make a lot more sense to me now.
>
> The quote above is the part I'd keep in my notes. I don't think it needs much explaining.

### 32. [The War of the Worlds](writings/2019-06-07-libro-war-of-worlds/index.md)

**Light edit. Previously Keep.** “It's always interesting” substitutes a general reaction for a personal one. The ending stacks three reset metaphors: gears, rewiring, and rhythm. The film comparison itself can stay.

Replace “It's always interesting going back to the source material after already knowing the story through a movie” with:

> I knew the story through the movie, so I was curious about the book.

Replace the final two paragraphs with:

> Anyway, I finally got back to reading. This was a good one to return with.

### 33. [Thinking like a Developer](writings/2019-07-13-thinking-like-a-developer/index.md)

**Keep.** Rechecked the repeated “Implement reversing” steps and the three debugging stages. These name actual tasks in a procedure; they do not manufacture an emotional progression or a three-part insight. The prose also stops at the practical instructions. No voice rewrite proposed. This is not a validation of the technical claims or pseudocode.

### 34. [When Breath Becomes Air](writings/2019-08-26-libro-when-breath-becomes-air/index.md)

**Revise.** “From medicine / From being the physician” doubles the same contrast. “It's one thing / It's another” repeats it, and the final “Maybe / sometimes” sequence supplies a polished compassion lesson.

Replace the prose after the image and before the quoted reflection beginning “We might not always” with:

> The change from physician to patient was the part that got to me. He knows the medical side, and now he's the person those decisions are being made about.
>
> I kept thinking about that while reading. This was the thought I wanted to keep:

Keep that quoted reflection. Delete the commentary after it, which restates it in more general language.

### 35. [Bradbury Stories](writings/2019-10-09-libro-bradbury-tales/index.md)

**Revise.** “Fear / Memory / Curiosity” and “A place / A person / A small detail” are two successive fragment lists. “What if?” then cues an imagination lesson and a safe ending.

Replace the commentary after the image with:

> Bradbury moves from ordinary to weird so quickly. I'd get comfortable with one story and the next would feel completely different.
>
> I liked the mix of nostalgia and the eerie stuff. Even when the setting got strange, the people still had recognizable fears and regrets.
>
> A hundred stories is a lot to go through. Plenty of odd little details in here.

### 36. [We'll Always Have Paris](writings/2019-10-15-libro-well-always-have-paris/index.md)

**Revise.** The opening observation turns into “Watch / Notice / Write,” then a generalized instruction to start. The final slogan merely repeats the quote.

Replace the commentary after the image with:

> I liked the small encounters and bits of memory in these stories. Bradbury pays attention to things I might not even think of writing down.
>
> The quote above fits the collection. I can see the appeal of getting an idea down before overthinking it.

### 37. [How to Fight a Hydra](writings/2019-11-04-libro-how-to-fight-a-hydra/index.md)

**Revise.** “A risk / A problem / A decision” leads into “Take / Face / See.” The greatness claim and final audience question turn the review into a motivational pitch.

Replace the commentary after the image with:

> Short enough to finish in one sitting. It read more like a bedtime story about dealing with something difficult than a book of self-help advice.
>
> The Hydra metaphor is pretty obvious, but I didn't mind. I liked not having another pile of frameworks to work through.

### 38. [The Happiness Track](writings/2019-11-09-libro-the-happiness-track/index.md)

**Light edit. Previously Keep.** “Maybe useful for a first-time reader / For me, though” provides a balanced concession after a clear negative verdict. “Can't love every book” then makes the dismissal harmless. The weekend aside is personal and can stay.

Replace from “Maybe that's useful” up to “Anyway, still a good weekend” with:

> I'd already come across too much of this elsewhere. I wasn't getting much out of it by the end.

Keep the preceding criticism and final weekend sentence.

### 39. [The Buried Giant](writings/2019-11-12-libro-the-buried-giant/index.md)

**Revise.** “Maybe forgetting / Maybe remembering / Maybe both” is explicit symmetry. “Symbolism everywhere / Or maybe there isn't” followed by “interpret it as you will” sidesteps the specific confusion with a safe conclusion.

Keep the opening quotation. Replace the commentary after it with:

> I kept expecting a time loop. Right up to the end, I thought that was where this was going.
>
> The unreliable memories threw me. Were there secrets in the past, or had people convinced themselves of things that hadn't happened?
>
> I'm still not sure how to read it. I probably spent too long waiting for that time loop.

### 40. [Everything Is F*cked](writings/2019-11-16-libro-everything-is-fcked/index.md)

**Revise.** The “Why” list stages a psychology overview. “But maybe that fits the point” cancels the complaint about the ending and replaces it with a definition of hope. The first audit only caught the latter.

Keep the opening quotation. Replace the commentary after it with:

> Manson is good at making psychology readable. I liked the parts about emotions getting ahead of logic and people repeating mistakes they already understand.
>
> The hope discussion left me hanging, though. For a book with that subtitle, I wanted more by the end.
>
> I'd read his earlier book first. This felt like a follow-up, and I still wasn't satisfied with where it stopped.

Keep the existing earlier-book reference if retaining the original recommendation paragraph instead of the final replacement paragraph. Do not include both.

### 41. [How to Win Friends and Influence People](writings/2019-11-20-libro-how-to-win-friends-and-influence-people/index.md)

**Revise. Previously Keep.** “And that's where it gets interesting” stages a pivot already apparent from the sales criticism. The paired questions resolve intent into two neat alternatives. “Maybe not a perfect guide / But definitely” then softens the concern with automatic respectability.

Replace the commentary after the image with:

> Some of this made me uncomfortable. The advice about listening and taking an interest in people is useful, but so many examples seem aimed at getting someone to say yes.
>
> I kept wondering how much of that interest was real. If I'm listening just to work out how to get something from a person, that bothers me.
>
> I can see how much later writing on influence owes to Carnegie. I still don't agree with all of it.

### 42. [Atomic Habits](writings/2019-12-28-libro-atomic-habits/index.md)

**Keep.** Rechecked the habit-seed metaphor and the optimistic return-to-reading sentence. They are brief and do not build a staged epiphany. Most of the original prose records when the audiobook was finished and the missed target. The strongest aphorisms are presented as quotations, which this voice audit does not rewrite.

### 43. [The Laws of Human Nature](writings/2020-01-03-libro-the-laws-of-human-nature/index.md)

**Revise.** “Easy to analyze others / harder to notice yourself” is a generic balanced insight. The new-year book/chapter metaphor supplies another neat close. The earlier edit of just the last sentence did not go far enough.

Replace the commentary after the image with:

> Last read for 2019. I finished in the final week of December after nearly three months of picking it up and putting it down.
>
> It's long. Some of the observations about other people were uncomfortable when I started recognizing them in myself.
>
> I missed the reading target this year. At least I finally finished this one.

### 44. [The Unicorn Project](writings/2020-01-17-libro-unicorn-project/index.md)

**Revise.** The role-by-role list, “Processes clash / Priorities differ,” and puzzle metaphor all arrange the experience too neatly. “Different sides of the same machine” adds a final balanced flourish.

Replace the commentary after the image with:

> I started closer to Ops and later moved into installation and implementation. Seeing those different parts of the work made this book interesting to me.
>
> One team's improvement can give another team a problem. I liked getting the developer perspective on that, especially after coming from the other side.
>
> I'd point developers toward *The Unicorn Project* and network or systems engineers toward *The Phoenix Project*.
>
> Still want to get my hands on *The DevOps Handbook*.

### 45. [Power Moves from Davos](writings/2020-02-05-libro-powermoves/index.md)

**Revise.** “People don't fit neatly into one box” is followed by exactly balanced leadership examples. The “Sometimes” triad and audience question finish it like an engagement post.

Keep the leadership category labels above the image; they identify the subject rather than stage a revelation. Replace the commentary below the image with:

> I found the categories interesting, but I wouldn't know where to put someone who leads differently depending on what's happening.
>
> A team needing support is a different situation from a difficult decision that someone has to make. I'd rather think about that than settle on one label for a person.
>
> It would be good to work under someone who can make that adjustment.

### 46. [Sprint](writings/2020-02-06-libro-sprint/index.md)

**Light edit.** The Lean/Agile comparison is a useful opinion. “But that's not really a bad thing” preemptively balances the criticism, and “Less / More / Less / More” sounds like advertising.

Delete “But that's not really a bad thing.” Replace from “Less guessing” through the end with:

> I liked the push to find out whether the damn thing works. Much of it was familiar, but I could see the use of having it in one process.

### 47. [Big Things Have Small Beginnings](writings/2020-02-17-libro-big-things-have-small-beginnings/index.md)

**Revise.** The small/big contrast expands into “Learn / Build / Try / Fail / Adjust.” The final ambition question asks for a motivational response rather than recording a reading reaction.

Keep the quotation below the image. Replace the commentary after it with:

> The title gives most of the idea away. There's a lot here about the small decisions and work that happen before a result becomes noticeable.
>
> The ambition part interested me. Wanting something bigger is one thing; working out what to do with that frustration is harder.
>
> That's most of what I wrote down from this one.

### 48. [Game Changers](writings/2020-04-03-libro-gamechangers/index.md)

**Revise.** The health-command list builds toward “The body” as a staged reveal. “Doesn't begin with doing more / starts with taking better care” creates an overly balanced conclusion.

Keep “It's good to be back” and the quotation. Replace the subsequent commentary with:

> A lot of this was familiar advice about sleep, food, and exercise. Nothing especially surprising there.
>
> I hadn't expected it to keep returning to the body while talking about performance. I was expecting more about productivity and mindset.
>
> That was the part I found interesting, even if I'd heard much of the advice before.

### 49. [Programming is easy, ain't it?](writings/2020-06-06-programming-is-easy/index.md)

**Light edit.** The tutorial's explanations have a practical purpose, but the introduction invents the reader's thoughts. “Say it with me,” “easy peasy,” the languages-speak/think maxim, and the final syntax/keywords/general-ideas sequence manufacture reassurance.

Replace from “To start with” through “But is it really just that?” with the following, retaining the image after the first replacement paragraph:

> I think the basic instructions in programming are approachable. Figuring out what to do with them is where I get stuck.
>
> A few concepts helped me understand what I was looking at when I started. I'll go through them here.

Under “What's the word?”, replace from “But it's really not that difficult” through “easy peasy” with:

> It looks confusing at first. Learning a few pieces gives me somewhere to start, even when I still can't follow the whole thing.

Replace “So I guess you could say that programming languages speak differently, but many of them think in similar ways” with:

> That makes the next language a little less unfamiliar.

Replace “The syntax might change” through “the general ideas are often still there” with:

> I still have new syntax to learn, but at least I recognize some of the concepts.

Replace from “Because programming itself isn't really the scary part” through “the code starts making a lot more sense” with:

> I still spend a lot of time figuring out the steps before I can write the code.

Keep the code-related explanations, illustrations, links, and closing sign-off. Do not rewrite technical definitions to make them messier.

### 50. [Day 1: Where to start?](writings/2020-11-06-day-1-where-to-start/index.md)

**Light edit. Previously Keep.** The snowball and Everest metaphors inflate a concrete learning problem. The childhood/adulthood contrast overexplains it, while “put me on the right path” makes the plan sound settled. The specific course choices and uncertainty about posting are worth retaining.

In “You just cannot skip the process,” replace from “I was younger then” through the paragraph ending “snowball on a steep mountain” with:

> I used to jump into a problem because I wanted to see if I could make something work. I still do that. The trouble starts when it breaks and I can't explain what I put together.

Replace the Everest paragraph with:

> I need to spend more time on the basics, even when I'd rather get straight to the problem.

Replace from “To sum it all up” through “put me on the right path” with:

> Mostly, I want to stop dropping this after a week. A hundred days is already more consistency than I've managed on the earlier attempts.

Keep the course plan, platform worries, and final “Git.”

### 51. [Killing a defunct process](writings/2020-11-18-killing-a-defunct-process/index.md)

**Light edit. Previously Keep.** “Problem solved, right? / Not quite” is a scripted question-and-reversal. The conclusion restates the same already-dead revelation after the explanation has established it. The commands and output are specific and stay.

Replace from “Problem solved, right?” through “The process still appeared as” and its defunct marker with:

> That didn't remove it. It still showed up as `<defunct>`.

After the paragraph ending “acknowledge that it has already finished,” delete the repeated “So if you ever see” code example and the bold concluding maxim. Keep the earlier safety guidance and the references.

### 52. [The Never-Ending Work of Improvement](writings/2021-01-21-never-ending-improvement/index.md)

**Revise.** “You change / You replace / You move” and “You fix / You harden / You secure” turn the engineering process into a metronome. The half-stability/half-change ending is artificially symmetrical.

Replace the commentary after the image with:

> I want the systems I work with to stay reliable. I also enjoy finding things to change, which causes problems for that first wish.
>
> A new requirement can mean disturbing something that's already working. Sometimes the change breaks something else and I'm back to gathering facts and working through a fix.
>
> I like that work, frustrating as it can be. Seeing a rough proof of concept actually run in production feels good.
>
> There's plenty I still haven't figured out. I don't expect that to change soon.

### 53. [The 100: Days Later](writings/2021-02-15-the-100-days-later/index.md)

**Light edit.** The course history and unresolved Docker detour have substance. Four separate passages add manufactured rhythm: the opening reader assumptions, the “You” success triad, the “Maybe” doubt triad, and the “I'll probably” closing ladder. The previous suggestions missed two of those sequences.

Replace the first two paragraphs after the heading with:

> I finished the first round of **#100DaysOfCode**. Started on November 6, 2020, and somehow kept it going for all 100 days.

Later, shorten the repeated announcement from “I started the” through “I've completed the 100 days” to “Anyway, back to the coding.”

In “The uphill,” replace from “Of course, there's that nice spike” through “Then there's the other side of it” with:

> Finishing a lab felt good. Getting stuck on the next one could wipe that feeling out pretty quickly.

Keep the subsequent stuck-lab account. Replace from “Maybe I was wasting my time” through “every single time” with:

> I wondered whether this would help me at all. Work was already tiring me out, and some days I did very little in the labs. I kept going anyway, with the doubts still there.

Replace from “Again, I'm not expecting everything” up to the attributed Stephen King quotation with:

> I expect to get stuck again. There will also be evenings when I watch YouTube instead of reading the documentation.
>
> I've got the next set of topics now. Let's see how much I get through.

Keep the concrete plans and existing quotation.

### 54. [Bye, Disney](writings/2021-05-21-bye-disney/index.md)

**Light edit.** The farewell uses “One last” three times and “Different” three times. The smooth/rough-days contrast then leads to “close this chapter.” The team-specific thanks need less framing.

Replace from “And the day has come” through “One last look at Disneyland” with:

> Signing in for the last time. Weird to think I won't be opening these tickets tomorrow.
>
> One last look at Disneyland.

Keep the PH-team, US-team, and House of Mouse thanks. Replace from “Different teams” up to “Borrowing from” with:

> There were days I spent hours staring at logs and looking things up because I couldn't work out what I was missing. I learned a lot that way too.
>
> I'll miss the people I worked with here.

Keep the existing attributed quotation and sign-off. The quoted lyric is not rewritten or reproduced here.

### 55. [The Humans](writings/2021-05-30-libro-humans/index.md)

**Revise.** The opening takeaway already settles the meaning. Later, the three family-member introductions and five “We” lines stage the same realization again. “Being human isn't about” and “we still choose to care” make the premise sound like a prepared humanity speech.

Keep the title, author, quotation, image, section headings, and final book list. Replace the body of “My personal takeaway” with:

> A lot of what I liked here doesn't make logical sense from the alien's point of view. The peanut butter doesn't help. Lols.

Replace the body of “What does it actually mean to be human?” with:

> Looking at humans from outside makes the ordinary stuff seem ridiculous. The uncomfortable clothes and money worries are familiar enough. Having to explain them to an alien would be another problem.

Replace the prose under “The Premise,” up to the separator, with:

> Professor Andrew Martin figures out something in mathematics that humans apparently aren't supposed to know yet. An alien is sent to replace him and get rid of the evidence.
>
> He finds us repulsive at first. Then he has to live in Andrew's house with Isobel, their son Gulliver, and Newton the dog.
>
> That's where I got more interested. He starts discovering music and food, and getting attached to people he's supposed to be dealing with as part of a mission.
>
> I liked watching that assignment get harder for him.

### 56. [The Examination Day](writings/2021-06-04-the-examination-day/index.md)

**Light edit.** The cancelled attempt and refund delay give the post its voice. “Learn / Play / Break,” “Seriously / Break them,” and the four “Maybe” reasons repeat a coaching cadence throughout, not only at the end.

Replace from “Just like with any skill” through “try to fix them afterward” with:

> I found it easier to follow the operational side once I understood the basic architecture. Working through labs helped too.

Replace from “And besides simply following the labs” through “Google-Fu to good use” with:

> I also found it useful to change things in a lab and troubleshoot the result. Following the instructor's steps didn't always tell me whether I understood the setup.

Replace from “Don't just memorize which option is correct” through “really important” with:

> I read the explanations for the wrong answers too. When two options looked reasonable, that was often the part I needed most.

Replace the entire “FINAL THOUGHTS” section, preserving the closing notes link, with:

> Passing was a relief after the cancelled attempt and all the rescheduling.
>
> I still want more practice with Linux, Python, and automation. The exam gave me a reason to study, but there are things I haven't tried building yet.
>
> For now, I'm glad this one is done.

Keep the exam narrative and resources. These remain historical recommendations, not newly verified current guidance.

### 57. [The Obstacle Is the Way](writings/2021-09-21-libro-the-obstacle-is-the-way/index.md)

**Revise.** “Don't remove / work with,” “not a blessing / just a problem,” and “wish / act” accumulate tidy contrasts. “Maybe that's where progress starts” converts them into a life lesson.

Keep the takeaway list and reading-update lines. Replace from “What I liked most” up to “Anyway, good to be reading” with:

> I liked the idea of changing the approach when I can't get rid of the problem itself.
>
> I'm less interested in calling the problem a blessing. Some things are just a pain to deal with, and I'd rather work out what's possible from there.

The “two years” reading-history claim appears inconsistent with other dated entries. Confirm it separately rather than inventing a corrected timeline.

### 58. [The First 20 Hours](writings/2021-10-13-libro-the-first-20-hours/index.md)

**Revise.** “You don't / You don't / You just” sets up reassurance before the instruction ladder. “Simple in theory / effort in practice” is another symmetrical payoff. The previous patch would have left the first sequence untouched.

Replace the commentary after the image with:

> Done with another reread.
>
> I like how this narrows down the starting point. Pick what I actually want to learn and work on the important parts first. That's easier for me to get my head around than trying to master the whole subject.
>
> Still takes practice, obviously.
>
> Might go for *The Martian* next.

### 59. [Digital: Merc with a Mouth](writings/2021-11-15-art-deadpool/index.md)

**Caption.** A short identification of the Deadpool sketch. Too little prose for the skill's narrative criteria, and no reason to expand it.

### 60. [Digital: Omelette du fromage!](writings/2021-11-16-art-dexter/index.md)

**Caption.** A direct note introducing a Dexter sketch. Appropriate as written.

### 61. [Range](writings/2021-11-19-libro-range/index.md)

**Revise.** The driving metaphor, “Learn / Understand / Get good,” and “Learn / Unlearn / learn again” turn a reading response into career advice. The balanced generalist/specialist resolution is overworked.

Keep the quotation and final image. Replace the intervening commentary with:

> I used to think I'd have to pick between being a generalist and a specialist. *Range*, by David Epstein, made me less sure about that.
>
> I liked the idea that something I learned elsewhere could turn out to be useful years later. I still want enough depth in a technology to actually work with it, though.
>
> I'm not rushing to choose a label.

### 62. [The Dream Architects](writings/2021-11-20-libro-dream-architects/index.md)

**Revise.** “Not just being good / staying curious,” two “Being” lines, and “wrong doesn't mean failed” form a ready-made growth lesson. The unexpected Avatar aside is more distinctive.

Replace the commentary after the image with:

> I liked seeing how much the work changed as people found out an idea wasn't working. Games go through a lot of revisions, and that interested me more than a straightforward success story would have.
>
> Also, I somehow finished this appreciating the *Avatar* universe even more.
>
> **Oel ngati kameie.**

### 63. [The Hard Thing About Hard Things](writings/2021-12-05-libro-hard-thing-about-hard-things/index.md)

**Revise.** The book/me contrast, “outgrow / catch up,” staged takeaway questions, and four “By” lines all manufacture a lesson. The three-listen history is enough to carry the response.

Replace the commentary after the image with:

> Third time finishing this audiobook. The first was right out of college, then again about a year later. This time was just last week.
>
> Some of the stories made more sense now. I'd heard them before, but I've dealt with more uncertainty and bad decisions at work since those earlier listens.
>
> The question-asking part is what I wanted to keep. I won't always know what to ask, and I'm going to ask some obvious things before I get better at it.
>
> That still seems preferable to staying quiet because I don't want to sound stupid.

### 64. [Peak](writings/2022-01-25-libro-peak/index.md)

**Revise.** “Goldmine” and the growth-mindset summary lead into a practice-command ladder. The start/finish talent contrast gives it an advertising-style close.

Replace the commentary after the image with:

> The deliberate-practice discussion was useful. I liked the attention to the parts you're bad at instead of just spending more time doing the familiar stuff.
>
> Getting good enough to do the job and continuing to improve after that aren't quite the same thing. That's the part I'd want to come back to.
>
> Plenty in here to think about.

### 65. [Shoe Dog](writings/2022-05-24-libro-shoe-dog/index.md)

**Revise.** “Uncertainty / Bad decisions / Cash problems” and “The resources / The people / The mistakes” supply repeated beats before the brand-slogan ending. The reread dates and “Noice” sound more individual.

Keep the reread history through “Noice.” Replace the rest with:

> I still liked how uncertain the story felt, even knowing where Nike ends up. There are cash problems and decisions that could have gone badly, and the plans keep changing.
>
> It's easy to forget that while looking back at a company this big.
>
> Third listen, and I enjoyed it again.

### 66. [So Good They Can't Ignore You](writings/2024-03-03-libro-so-good-they-cant-ignore-you/index.md)

**Revise.** The book's two mindsets are meaningful concepts, but “Sometimes passion / Sometimes competence” duplicates the contrast as a slogan. “Practice it / Deliberately” and “But other people will” stage the ending as a reveal.

Replace the commentary after the image with:

> The argument against “follow your passion” interested me. At the start of a career, how am I supposed to know what work will be satisfying years later?
>
> Newport's craftsman mindset gave me something more useful to think about: what can I get good enough at to offer someone?
>
> I liked the emphasis on practice, including the parts I'm weak at. Exploring different interests still makes sense to me, but eventually I have to spend time getting better at something.
>
> I don't think I could have drawn a straight line to the work I'd want from the beginning.

### 67. [What I Talk About When I Talk About Running](writings/2024-03-04-libro-what-i-talk-about-when-i-talk-about-running/index.md)

**Revise.** The bold takeaway preannounces the lesson. “Writing / Learning / Work” generalizes it to everything, and “Keep moving / The distance adds up” gives it a polished close.

Keep the reading-log paragraphs. Replace from “The biggest takeaway for me” through the end with:

> I liked how much Murakami had to say about running. From the outside it looks repetitive, but doing it for years leaves him with a lot to think about.
>
> The ordinary routine interested me more than I expected. I can see why he kept writing about it.

### 68. [A Shift in Mindset](writings/2024-03-19-shift-in-mindset/index.md)

**Revise.** The course-deletion habit and delivery constraints are specific. Around them, “You might have,” “They give/show/introduce,” “I learned enough,” and “I'll” create repeated instruction ladders. The apple metaphor and learner-to-problem-solver ending tidy up what was supposed to be a messy account. The earlier ending-only edit missed that repetition.

Keep the practical examples, links, and the course-deletion account. Make these replacements:

1. Replace from “When I say **college-style learning**” through “moving on to the next lesson” with:

   > With a course, I know what lesson comes next and what I'm supposed to finish. I got used to having that outline.

2. Replace from “You might have help from a vendor” through “answered first” with:

   > There might be a vendor or another team helping. Then a requirement changes halfway through the sprint and I have to work out which problem matters first. Having more people involved doesn't make that decision obvious.

3. Replace from “Is technical debt bad?” through “It depends” with:

   > I don't have a blanket answer for whether that tradeoff is worth it.

4. Under “So, should I stop taking courses and just focus on projects?”, replace all the prose before the next heading with:

   > I'm still using courses for unfamiliar subjects. I need enough of the terminology to know what to search for.
   >
   > Sometimes I learn a tool and then discover it won't help with the problem I actually have. Annoying, but at least I know that now.

5. Replace from “Kind of like picking apples” through “my **Google-fu**” with:

   > By then I have notes and enough background to search for the specific problem. I'd rather try that than watch the entire section again.

6. Replace all prose under “Okay, I think I got it.” with:

   > I still have unfinished courses and questions I can't answer. For now, I'll look up what I need for the problem in front of me and write down what happens when I try it.
   >
   > Hopefully the notes are good enough that I won't have to work it all out again next time.

Delete the opening pull quote beginning “And that, I think,” since it previews the epiphany being removed. Keep the draft-date note.

### 69. [Standup Eight](writings/2024-03-25-standup-eight/index.md)

**Light edit.** The actual setbacks carry the story. “Both looked / Both showed,” the hard/uncomfortable/necessary change triad, and the regroup/refuel ending add artificial cadence. “The universe lends a hand” gives the outcome a safe explanation.

Replace “Both looked promising. Both showed interest” with:

> I thought I had a decent chance at either role.

Replace from “Change is hard” through “if you want to grow” with:

> I wanted the new role. Leaving those teammates was still hard.

Replace from “Sometimes you don't really get a choice” through “As many times as it takes” with:

> My wife is recovering, and so are my eyes. I'm on Day 3 at the new job and still distracted by everything at home.
>
> If the weather holds, I'll try running tomorrow. I haven't figured out much beyond that.

Delete the final “Sometimes, there's also everything happening in between.” The preceding thanks can end the post. Keep the numbered headings and the actual timeline; the week-by-week waiting has a concrete narrative purpose.

### 70. [Twinful, Twinless](writings/2025-07-28-twinful-twinless/index.md)

**Revise.** The memories and anger are specific; that does not exempt the prose around them. The body/mind explanation is therapeutic shorthand. In “Twinless,” the “Not,” “No more,” “Before,” and “Sometimes” sequences accumulate manufactured poetic emphasis. “Forty minutes / A lifetime / one hour too late” repeats a contrast the events already establish. The earlier audit was too permissive about this passage.

Keep the ashtray and college stories, the flight and hospital details, the uncertainty about memories, and the final anger. These are prose changes, not corrections to the events:

1. Delete from “There are moments when your body” through “surrendered to the truth.” Let the hands-over-face action end “The empty space.”

2. Replace from “It didn't matter” through “Sometimes that's enough” with:

   > They came and stayed with us through the Mass. I appreciated that.

3. Replace from “That's when something finally clicked” through “No more other day” with:

   > Watching the casket move toward that room was when I couldn't put it off anymore. We weren't going to have any of those conversations we'd left for later.

4. Replace from “For almost my entire life” through the standalone “Twinless” with:

   > I'd never lived without Karen somewhere in the world. I knew that, obviously, but I hadn't really imagined what it would be like if she wasn't.
   >
   > Then her casket disappeared into the room. I was still standing there.
   >
   > Twinless.

5. Replace from “I don't know if there's supposed to be some grand lesson” through “Sometimes it leaves a twin staring at the word **twin** and wondering whether he still gets to use it” with:

   > I don't have a lesson to pull out of this. I keep thinking about the empty chair and the fact that there won't be another new photograph of her.
   >
   > I hadn't even thought about what to call myself afterward.

6. Keep “Am I still a twin” and the following self-directed reaction. Replace from “People say someone lives on through memories” up to “For nearly four decades” with:

   > I remember the things we never talked about. We missed her by an hour, and I still don't know what to do with that.
   >
   > Every now and then, I look at the empty chair in the living room and expect Karen to be there.

Keep the final two paragraphs and sign-off. Do not add consolation or a recovery ending.

### 71. [Un café, por favor](writings/2026-09-11-un-cafe-por-favor/index.md)

**Revise.** The repeated song gives the story continuity, but the prose repeatedly turns it into a set piece. The “Some” board-message triad, “Across” ladder, distance ladder, “Maybe until” sequence, detachment explanation, and final “same song” recap all deserve attention. Profanity and jokes do not cancel those patterns. The earlier three local edits were insufficient.

Preserve the events, private references, coffee-board image, and the song's unspecified identity. Use these replacements:

1. Replace from “Some were messages for friends” through “two people somewhere in the world” with:

   > A few were clearly meant for someone specific. I couldn't make much sense of the inside jokes.

2. Replace from “Across a city?” through “Then I drank it myself” with:

   > Eleven time zones. The coffee would be cold long before it arrived.
   >
   > I laughed at that and drank it.

3. Replace from “But going home meant stopping” through “the song became loudest” with:

   > I didn't want to sit in a quiet room with the song in my head again.

4. Replace from “I think part of me believed” through “doesn't give a shit about geography” with:

   > I was still hoping another stretch of road would help. My legs were already complaining, and the song kept coming back.

5. Replace from “Maybe until midnight” through the “I don't know” before “Eventually, I turned around” with:

   > Probably for hours. I wasn't thinking very far ahead.

6. Replace from “There are things you can run from” through “I might never hear it again” with:

   > I'd left the room, got on a bus, and still couldn't get it out of my head. I was too tired to keep arguing with it.

7. In “Four Days Later,” delete from “For the first time, I understood” through “Maybe detachment wasn't deleting something from your head.” The comparison to music from another apartment already describes the change.

8. Replace from “And there it was again” through the end with:

   > I let it play and kept cycling. Still couldn't understand every word.

Also join the three “Something” paragraphs after “I ignored it” into “I picked something familiar instead.” Compress the earlier “Maybe because” explanation of obsession into:

> I didn't like calling it obsession. I was more attached to the song than I'd meant to get, and I didn't know what to call that.

The laundry joke and the cycling-lane interruption have specific comic payoffs. Their lists are not the same problem as the repeated philosophical ladders. Keep those jokes.

## Validation

The report includes one numbered entry for every Markdown and MDX article under `writings/`. Coverage, verdict totals, and relative link targets are checked against the filesystem. The samples and captions were read rather than silently excluded.

Only this report was changed for the recheck. Article files, translations, and the user's updated skill remain untouched. No site build is needed for an audit report in the repository root.
