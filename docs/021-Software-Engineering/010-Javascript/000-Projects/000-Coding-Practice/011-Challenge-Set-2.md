---
title: "Challenge Set 2"
description: "Coding Challenges in Javascript"
tags: 
- Computer Science
- Application Development
- Software Development
- Javascript
sidebar_position: 11
last_update:
  date: 2/7/2021
---

## Practice 01 

Create a simple character counter for Tweets.

- Ask the user to type a Tweet
- Count the characters
- Show how many characters are left

Note that the maximum length for a Tweet is 280 characters.

**Test Data:**  

| Data Set   | Tweet Content                                                                                                                                                                                                                                                                                                  | Character Count | Remaining Characters  |
|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|-----------------------|
| **Data 1** | Just finished reading an amazing article on space exploration! Can't believe how far we've come. #science #NASA #space                                                                                                                                                                                         | 118             | 162                   |
| **Data 2** | Excited to attend the upcoming tech conference this weekend! Looking forward to insightful talks, hands-on workshops, and connecting with fellow enthusiasts. So much innovation packed into a few days—can’t wait! #TechConference #Innovation #Networking                                                    | 251             | 29                    |
| **Data 3** | This is a test Tweet designed specifically to exceed the maximum character limit of 280 characters. It contains a bunch of filler text to make sure we go well beyond the standard length allowed. Keep typing, keep typing, adding more words just to hit that threshold. This sentence should do the trick!  | 301             | **-21**               |

<details>
  <summary> **Solution** </summary>

Code:

```js 
var tweet = prompt("Compose a tweet: ");

var tweetCount = tweet.length 

alert("You have written "
      + tweetCount 
      + " characters. You have "
      + (280 - tweetCount) 
      + " characters remaining."
)
```

</details>


