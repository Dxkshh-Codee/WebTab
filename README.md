# 🕷️ WebTab

Your new tab page but it actually has personality.

I got tired of opening a new tab and just staring at a blank google page or some boring default thing so i made this. spider-verse inspired and way more fun to look at.

**live here → https://Dxkshh-Codee.github.io/WebTab/**



### what it does

Honestly just a bunch of small fun stuff i wanted to try:

1. A tiny spider just follows your cursor around. no real reason, it's just cute
2. Big glowy spider web in the background drawn on canvas, it sits there looking cool
3. Spider hanging off the search bar — click it and it does a little web splat thing
4. Another big spider hanging from the top left, just vibing and swinging
5. clock + greeting that actually changes if it's morning / afternoon / night (so it knows you're up at 3am)
6. search bar that just goes to google, nothing fancy
7. quick links to github, youtube, slack etc
8. little `spidey-sense` box in the corner — pulls NASA's picture of the day and a title. if nasa is down or my api key is being weird, it just falls back to a random quote so it never looks broken

9. has that halftone comic + glitch effect so it feels like a comic book

# stack

no react, no next, no 10 frameworks. just:

html / css / vanilla js + vite for bundling

i did it this way on purpose — wanted to actually *understand* fetch, canvas, and css animations instead of just installing a library for it.

## run it yourself


git clone https://github.com/Dxkshh-Codee/WebTab.git
cd WebTab
npm install


you'll need a NASA api key for the spidey-sense image to work (it's free, takes like 30 seconds):

1. go to https://api.nasa.gov and get a key
2. create a .env file in the root
3. add this:


VITE_NASA_API_KEY=your_key_here


then:


npm run dev     # local dev
npm run build   # production build
npm run preview # preview the build


if you don't add a key it still works, you'll just get the fallback quotes instead of the space pics.

## deploy

it's already set up for github pages.


npm run deploy


just make sure your vite.config.js has base: /WebTab/' and pages is set to deploy from gh-pages branch.

### project looks like


WebTab/
index.html      # layout
style.css       # all the comic styling + animations
src/main.js     # everything — clock, canvas, spiders, nasa fetch
public/         # icons / favicon
vite.config.js




if you like it, leave a star — keeps the spider alive 🕷️
