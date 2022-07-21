To find which Amazon service the IP belongs to

👉 [Go to the site](https://eugercek.github.io/aws-ip/)

Fore more information, look at the [official docs](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html)

# Design Suggestions

Feel free to open a PR for our eyes. I don't want icons etc in this version, this should be clean and simple. \\
But we can create another theme/scene and a theme switcher.

# Design Choices

## Memory

I don't see any lag on [x6 slowdown CPU](https://developer.chrome.com/docs/devtools/device-mode/#cpu).
Also IPv4 has 6000 items, building a balanced tree will take 12 * One search time. Most of the users will immediately paste the IP.
So having O(lg(n)) search isn't the best idea.

Open Issue/PR for suggestions.

## Network

Fetching 1 mb file from URl is not good idea but that'll make code more complex for little gain.

Why fetch from a URL:
- Always keep up to date
- No need to write webhook or cron + git push script
- No need to think how to compress/decompress json

Open Issue/PR for suggestions.